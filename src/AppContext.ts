import { Tag } from 'types';

import React from 'react';

export interface AppContextInterface extends Record<string, any> {
  isLargeUp: boolean,
  loadProgress: number|undefined|null,
  tags: Tag[],
  update: Function,
}


export default React.createContext<AppContextInterface>({
  isLargeUp: false,
  loadProgress: null,
  tags: [],
  update: () => {},
});
