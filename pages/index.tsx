import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

// import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

// import Link from 'components/Link';
// import paths from 'paths';

import AppContext from "AppContext";

import DataManager from "io/DataManager";
import { getWootItems } from 'io/queries';

export default function Home() {
  const context = useContext(AppContext);
  const updateContext = context?.update;

  const [ready, setReady] = useState(false);

  const {
    // isLoading,
    // error,
    // data
  } = useQuery(['getWootItems', {
   url: 'http://localhost:8000/woot-items/'
  }], getWootItems);

  useEffect(() => {
    DataManager.getInstance().sync({
      onComplete: () => {
        // setReady(true);
      }
    });
  }, []);


  useEffect(() => {
    // updateContext({ loadProgress: ready ? null : undefined });
  }, [ready, updateContext]);

  let listItems = [];

  if (ready) {

    listItems.push([
      <ListItem key={0}>
        <ListItemText primary="Item title" />
      </ListItem>
    ]);
  } else {
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
  }

  return (
    <List disablePadding>
      {/*{listItems}*/}
    </List>
  );
}
