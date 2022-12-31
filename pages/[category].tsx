import { ReactElement, useContext, useEffect, useState } from 'react';
import { NextRouter } from "next/router";
import { useQuery } from 'react-query';

import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";

// import Link from 'components/Link';
// import paths from 'paths';

import AppContext from "AppContext";
import DefaultLayout from 'layout/DefaultLayout';

import WootItemCell from 'components/WootItemCell';
import WootItemFilterView from 'components/WootItemFilterView';

import { syncWootItems, loadWootItems } from 'io/queries';

import { getScrollbarWidth } from 'util/shortcuts';

const INITIAL_ROW_COUNT = 32;

function WootItemListPage() {
  const context = useContext(AppContext);
  const updateContext = context?.update;

  const [cellWidth, setCellWidth] = useState<number>(0);
  const [columnCount, setColumnCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(INITIAL_ROW_COUNT);
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(0);
  const [viewSize, setViewSize] = useState<Size|undefined>(undefined);


  const syncResult = useQuery(['syncWootItems', {
    url: 'http://localhost:8000/woot-items/'
  }], syncWootItems, {
    // useErrorBoundary: true,
  });

  // TODO: Derive this from the current search params
  const filterParams:Object = {
    title: /samsung/ig,
    // list_price_max: { "$gt": 100 },
  };
  const orderingParams:Object = {
    $orderBy: {
      title: 1 // Sort ascending or -1 for descending
    }
  };


  const loadResult = useQuery(['loadWootItems', {
    isSyncing: syncResult.isLoading,
    filterParams,
    orderingParams,
  }], loadWootItems);

  const isReady = !(syncResult.isLoading || loadResult.isLoading);
  const wootItems = loadResult.data;

  useEffect(() => {
    setScrollbarWidth(getScrollbarWidth());

    updateContext({
      loadProgress: isReady ? null : undefined,
    });
  }, [isReady, updateContext]);

  // ---------------------------------------------------------------------------
  /**
   * Callback invoked whenever the grid dimensions update.
   * Cell size and row/col count are determined with respect to grid width
   * such that cells are always square.
   * @type {(function(*): void)|*}
   */
  useEffect(() => {
    if (!viewSize) {
      return;
    }

    let gridWidth = viewSize.width - scrollbarWidth;

    let colCount;
    if (gridWidth > 1920) {
      colCount = 8;
    } else if (gridWidth > 1600) {
      colCount = 7;
    } else if (gridWidth > 1280) {
      colCount = 6;
    } else if (gridWidth > 1024) {
      colCount = 5;
    } else if (gridWidth > 768) {
      colCount = 4;
    } else if (gridWidth > 414) {
      colCount = 3;
    } else {
      colCount = 2;
    }

    setCellWidth(gridWidth / colCount);
    setColumnCount(colCount);
  }, [scrollbarWidth, viewSize]);


  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!(isReady && columnCount && wootItems)) {
      return setRowCount(INITIAL_ROW_COUNT);
    }

    setRowCount(Math.ceil(wootItems.length / columnCount));
  }, [columnCount, isReady, wootItems]);

  // ---------------------------------------------------------------------------
  if (loadResult.isError) {
    return "Error retrieving data";
  }

  return (
    <AutoSizer onResize={setViewSize}>
      {({ height, width }) => {
        if (!(columnCount && cellWidth)) {
          return null;
        }

        return (
          <FixedSizeGrid
            columnCount={columnCount}
            columnWidth={cellWidth}
            height={height}
            itemData={{
              columnCount,
              rowCount,
              items: isReady ? wootItems : null,
              // onCellClick,
              // onCellDidMount: handleCellDidMount,
              // onCellWillUnmount: handleCellWillUnmount,
            }}
            rowCount={rowCount}
            rowHeight={cellWidth + 64}
            width={width}
          >
            {WootItemCell}
          </FixedSizeGrid>
        );
      }}
    </AutoSizer>
  );
}

WootItemListPage.getLayout = (page:ReactElement, router:NextRouter) => {
  const category = router.query.category as string || 'clearance';
  const pageTitle = `${process.env.NEXT_PUBLIC_APP_TITLE} | ${category}`;

  return (
    <DefaultLayout
      maxContainerWidth={false}
      layout="absolute"
      pageTitle={pageTitle}
      toolbarItems={(
        <WootItemFilterView
          baseParams={{ category }}
        />
      )}
    >
      {page}
    </DefaultLayout>
  );
};



export default WootItemListPage;
