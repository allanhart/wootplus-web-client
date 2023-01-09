import clsx from 'clsx';
import {
  MouseEventHandler,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import TreeView, { TreeViewProps } from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Link from "./Link";

import paths from "paths";
import AppContext from 'AppContext';

import classes from './CategoryMenu.module.scss';

import type { Tag } from 'types';

type CategoryMenuProps = TreeViewProps & {
  onTreeItemClick: MouseEventHandler,
};

const ALL_ITEMS_TAG:Tag = {
  id: 0,
  name: 'All Items',
  children: [],
};

function renderTreeItem(tag:Tag, namePrefix:string|null, depth:number, onTreeItemClick:MouseEventHandler) {
  let fullTagName = tag.name;
  if (namePrefix) {
    fullTagName = `${namePrefix}::${fullTagName}`;
  }

  let href;
  if (tag.id === ALL_ITEMS_TAG.id) {
    href = paths.index;
  } else {
    href = `${paths.index}?category=${encodeURIComponent(fullTagName)}`;
  }

  return (
    <TreeItem
      key={tag.id}
      label={(
        <Link
          className={clsx(classes.link, classes[`d${depth}Link`])}
          color="textPrimary"
          href={href}
          onClick={onTreeItemClick}
          underline="hover"
        >
          {tag.name}
        </Link>
      )}
      nodeId={`${tag.id}`}
    >
      {tag.children.map((childTag) => renderTreeItem(childTag, fullTagName,depth + 1, onTreeItemClick))}
    </TreeItem>
  );
}


const CategoryMenu: React.FC<CategoryMenuProps> = ({ onTreeItemClick }) => {
  const context = useContext(AppContext);
  const { tags } = context;

  const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>([]);

  useEffect(() => {
    setExpandedNodeIds(tags.map(tag => `${tag.id}`));
  }, [tags]);

  const handleNodeToggle = useCallback((_: SyntheticEvent, nodeIds: string[]) => {
    setExpandedNodeIds(nodeIds);
  }, [onTreeItemClick]);


  const treeItems = useMemo(() => {
    const items = tags.map(
      (tag) => renderTreeItem(tag, null,1, onTreeItemClick)
    );

    items.unshift(renderTreeItem(ALL_ITEMS_TAG, null,1, onTreeItemClick));

    return items;
  }, [tags]);
  
  return (
    <TreeView
      className={classes.treeView}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expandedNodeIds}
      onNodeToggle={handleNodeToggle}
    >
      {treeItems}
    </TreeView>
  );
};

export default CategoryMenu;