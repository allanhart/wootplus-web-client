import React from 'react';

import { WootItem } from 'types';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

function WootItemList({ items }: { items: WootItem[] }) {
  return (
    <List disablePadding>
      {items.map((wootItem) => (
        <ListItem key={wootItem.uuid} disableGutters>
          <ListItemButton
            href={wootItem.url}
            rel="noopener"
            target="_blank"
          >
            <ListItemAvatar>
              {/*<Avatar src={wootItem.photo_url}/>*/}
              <Avatar>W</Avatar>
            </ListItemAvatar>

            <ListItemText primary={wootItem.title} />

          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default React.memo(WootItemList);