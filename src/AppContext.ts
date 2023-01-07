import { Tag } from 'types';

import React from 'react';

export interface AppContextInterface extends Record<string, any> {
  loadProgress: number|undefined|null,
  tags: Tag[]|Error|undefined,
  update: Function,
}

const AppContext = React.createContext<AppContextInterface>({
  loadProgress: null,
  tags: undefined,
  update: () => {},
});

export default AppContext;
