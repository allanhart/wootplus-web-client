import { MouseEventHandler, useContext } from 'react';

type CategoryMenuProps = MenuListProps & {
  onMenuItemClick: MouseEventHandler,
};


import MenuList, { MenuListProps } from '@mui/material/MenuList';
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Link from "./Link";

import { useRouter } from "next/router";
import paths from "paths";
import AppContext from 'AppContext';

const CategoryMenu: React.FC<CategoryMenuProps> = ({ onMenuItemClick }) => {
  const router = useRouter();
  const { query } = router;

  const context = useContext(AppContext);
  const { tags } = context;

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
            onClick={onMenuItemClick}
            selected={query.category === label}
            sx={{ width: 220, py: 2 }}
          >
            <ListItemText primary={label} />
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default CategoryMenu;