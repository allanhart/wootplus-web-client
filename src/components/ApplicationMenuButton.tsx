import { ReactElement, useCallback, useState } from 'react';

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Drawer from '@mui/material/Drawer';

import CategoryMenu from "./CategoryMenu";

function ApplicationMenuButton(): ReactElement {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCategoryMenuItemClick = useCallback(() => {
    setDrawerOpen(false);
  }, []);

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
        keepMounted
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            paddingTop: { xs: 7, sm: 8 },
            paddingBottom: 6,
          },
        }}
      >
        {<CategoryMenu onTreeItemClick={handleCategoryMenuItemClick} />}
      </Drawer>
    </>
  );
}

export default ApplicationMenuButton;
