import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router'

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Drawer from '@mui/material/Drawer';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import HomeIcon from '@mui/icons-material/Home';
// import InfoIcon from '@mui/icons-material/Info';

import Link from 'components/Link';

import paths from 'paths';


export default function ApplicationMenuButton(): ReactElement {
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navLinkArrangement] = useState([
    {
      label: 'Home',
      path: paths.index,
    },
    {
      label: 'Clearance',
      path: `${paths.index}?category=Clearance`,
    },
    {
      label: 'Electronics',
      path: `${paths.index}?category=Electronics`,
    },
  ]);

  const handleMenuItemClick = () => {
    setDrawerOpen(false);
  };

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
        <MenuList disablePadding>
          {navLinkArrangement.map((linkInfo) => {
            const { label, path } = linkInfo;

            return (
              <MenuItem
                component={Link}
                href={path}
                key={label}
                onClick={handleMenuItemClick}
                selected={path === router.pathname}
                sx={{ width: 220, py: 2 }}
              >
                <ListItemText primary={label} />
              </MenuItem>
            );
          })}
        </MenuList>
      </Drawer>
    </>
  );
}
