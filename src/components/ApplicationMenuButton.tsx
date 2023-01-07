import { ReactElement, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router'

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Drawer from '@mui/material/Drawer';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import Link from 'components/Link';

import paths from 'paths';
import AppContext from "AppContext";


function ApplicationMenuButton(): ReactElement {
  const router = useRouter();
  const { query } = router;
  console.log(query);

  const context = useContext(AppContext);
  const { tags } = context;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const navMenu = useMemo(() => {
    if (!tags) {
      return null;
    }

    const navLinkArrangement = tags.map((tag) => {
      return {
        label: tag.name,
        path: `${paths.index}?category=${encodeURIComponent(tag.name)}`
      }
    });

    navLinkArrangement.unshift({
      label: 'Home',
      path: paths.index,
    });

    return (
      <MenuList disablePadding>
        {navLinkArrangement.map((linkInfo) => {
          const { label, path } = linkInfo;

          return (
            <MenuItem
              component={Link}
              href={path}
              key={label}
              onClick={() => setDrawerOpen(false)}
              selected={query.category === label}
              sx={{ width: 220, py: 2 }}
            >
              <ListItemText primary={label} />
            </MenuItem>
          );
        })}
      </MenuList>
    );
  }, [query, tags]);


  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => setDrawerOpen(!drawerOpen)}
        sx={{ borderRadius: 2 }}
      >
        <Avatar src="/woot-icon.png" variant="rounded" />
      </IconButton>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            paddingTop: { xs: 7, sm: 8 },
          },
        }}
      >
        {navMenu}
      </Drawer>
    </>
  );
}

export default ApplicationMenuButton;
