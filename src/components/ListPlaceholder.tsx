import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Skeleton from '@mui/material/Skeleton';
import Box from "@mui/material/Box";

function ListPlaceholder() {
  let listItems = [];

  for (let i=0; i < 24; ++i) {
    listItems.push(
      <ListItem key={i} divider sx={{ py: 2 }}>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <Box flex={1} display="flex" flexDirection="column" gap={1}>
          <Skeleton variant="rounded" height={15} />
          <Skeleton variant="rounded" height={15} width="50%" />
        </Box>
      </ListItem>
    );
  }

  return (
    <List disablePadding>
      {listItems}
    </List>
  );
}

export default ListPlaceholder;