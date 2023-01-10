import { WootItem } from 'types';
import { ReactElement, useEffect, useState } from 'react';

import { GridChildComponentProps } from "react-window";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { toCurrency } from 'util/transformers';

// -----------------------------------------------------------------------------
function WootItemPlaceholder():ReactElement {
  return (
    <>
      <Skeleton
        variant="rectangular"
        sx={{
          width: '100%',
          height: 'auto',
          aspectRatio: '1',
        }}
      />

      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="50%" />
    </>
  );
}

// -----------------------------------------------------------------------------
function WootItemView({ wootItem }: { wootItem: WootItem }):ReactElement {
  const { min_price, photo_url, title, url } = wootItem;

  let image = null;
  if (photo_url) {
    image = (
      <ButtonBase
        href={url}
        rel="noreferrer"
        target="_blank"
        sx={{
          aspectRatio: '1',
          height: 'auto',
          width: '100%',
        }}
      >
        <Box
          component="img"
          src={photo_url}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
          }}
        />
      </ButtonBase>
    )
  }

  return (
    <>
      {image}

      <Box height={56} py={0.5} px={1}>
        <Typography variant="body2" noWrap>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {toCurrency(min_price)}
        </Typography>
      </Box>
    </>
  );
}

// -----------------------------------------------------------------------------
const WootItemCell: React.FC<GridChildComponentProps> = (
  { data, columnIndex, rowIndex, style }
) => {
  const { columnCount, items } = data;

  const [wootItem, setWootItem] = useState<WootItem|undefined|null>(undefined);

  useEffect(() => {
    let _wootItem = undefined;

    if (items) {
      const cellIndex = (rowIndex * columnCount) + columnIndex;
      _wootItem = cellIndex < items.length ? items[cellIndex] : null;
    }

    setWootItem(_wootItem);
  }, [columnIndex, columnCount, items, rowIndex]);


  let cellContent = null;
  switch (wootItem) {
    case null:
      cellContent = null;
      break;
    case undefined:
      cellContent = <WootItemPlaceholder />;
      break;
    default:
      cellContent = <WootItemView wootItem={wootItem} />;
  }

  return (
    <div style={{ ...style, padding: 8 }}>
      {cellContent}
    </div>
  );
};

export default WootItemCell;