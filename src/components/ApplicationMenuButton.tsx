import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router'

import Button from "@mui/material/Button";
import Drawer from '@mui/material/Drawer';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

import Link from 'components/Link';

import AppLogo from 'media/woot-logo.svg';

import paths from 'paths';


export default function ApplicationMenuButton(): ReactElement {
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navLinkArrangement] = useState([
    {
      icon: <HomeIcon />,
      label: 'Home',
      path: paths.index,
    },
    {
      icon: <InfoIcon />,
      label: 'About',
      path: paths.about,
    },
  ]);

  const handleMenuItemClick = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <AppLogo height={40} />
      </Button>

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
            const { icon, label, path } = linkInfo;

            return (
              <MenuItem
                component={Link}
                href={path}
                key={label}
                onClick={handleMenuItemClick}
                selected={path === router.pathname}
                sx={{ width: 220, py: 2 }}
              >
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
              </MenuItem>
            );
          })}
        </MenuList>
      </Drawer>
    </>
  );
}
