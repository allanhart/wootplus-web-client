import { ReactElement, useCallback, useContext, useState } from 'react';

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Drawer from '@mui/material/Drawer';
import Portal from '@mui/base/Portal';

import CategoryMenu from "./CategoryMenu";
import AppContext from 'AppContext';

const COMMON_DRAWER_PROPS = {
  PaperProps: {
    sx: {
      paddingTop: { xs: 7, sm: 8 },
      paddingBottom: 6,
    },
  }
};

function ApplicationMenuButton(): ReactElement {
  const context = useContext(AppContext);
  const { isLargeUp } = context;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCategoryMenuItemClick = useCallback(() => {
    setDrawerOpen(false);
  }, []);


  const categoryMenu = <CategoryMenu onTreeItemClick={handleCategoryMenuItemClick} />;

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => setDrawerOpen(!drawerOpen)}
        sx={{ borderRadius: 2 }}
      >
        <Avatar src="/woot-icon.png" variant="rounded" />
      </IconButton>

      {isLargeUp ? (
        <Portal>
          <Drawer variant="permanent" {...COMMON_DRAWER_PROPS}>
            {categoryMenu}
          </Drawer>
        </Portal>
      ) : (
        <Drawer
          keepMounted
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          {...COMMON_DRAWER_PROPS}
        >
          {categoryMenu}
        </Drawer>
      )}
    </>
  );
}

export default ApplicationMenuButton;
