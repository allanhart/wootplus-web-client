import { ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { NextRouter, useRouter } from "next/router";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import { useQuery } from 'react-query';

import AppContext from "AppContext";
import GridLayout from 'layout/GridLayout';

import WootItemCell from 'components/WootItemCell';
import WootItemFilterView from 'components/WootItemFilterView';

import { syncWootItems, loadWootItems } from 'io/queries';

import { getScrollbarWidth, apiUrl } from 'util/shortcuts';

const INITIAL_ROW_COUNT = 32;

function WootItemListPage() {
  const { query } = useRouter();
  const category = query.category as string;

  const context = useContext(AppContext);
  const updateContext = context?.update;

  const [cellWidth, setCellWidth] = useState<number>(0);
  const [columnCount, setColumnCount] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(INITIAL_ROW_COUNT);
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(0);
  const [viewSize, setViewSize] = useState<Size|undefined>(undefined);

  const syncResult = useQuery(['syncWootItems', {
    url: apiUrl(`/feed-items/`),
  }], syncWootItems, {
    // useErrorBoundary: true,
  });

  const loadResult = useQuery(['loadWootItems', {
    query
  }], loadWootItems, {
    enabled: syncResult.status === 'success',
  });

  // ---------------------------------------------------------------------------
  const syncStatus = syncResult.status;

  const isReady = loadResult.status === 'success';
  const wootItems = loadResult.data;
  const wootItemRefetch = loadResult.refetch;


  useEffect(() => {
    if (syncStatus !== 'success') {
      return;
    }

    wootItemRefetch();
  }, [query, syncStatus, wootItemRefetch]);

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
    } else if (gridWidth > 600) {
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
  const toolbar = useMemo(() => {
    console.log(category);

    return (
      <Toolbar
        variant="dense"
        sx={{
          backgroundColor: 'grey.100',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        All Items
      </Toolbar>
    );
  }, [category]);

  if (loadResult.isError) {
    return "Error retrieving data";
  }

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">
      {toolbar}
      <Box flex={1}>
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
      </Box>
    </Box>
  );
}

WootItemListPage.getLayout = (page:ReactElement, router:NextRouter) => {
  const category = router.query.category as string;
  let pageTitle = `${process.env.NEXT_PUBLIC_APP_TITLE}`;
  if (category) {
    pageTitle = `${pageTitle} | ${category}`;
  }

  return (
    <GridLayout
      pageTitle={pageTitle}
      toolbarItems={(
        <WootItemFilterView />
      )}
    >
      {page}
    </GridLayout>
  );
};

export default WootItemListPage;
