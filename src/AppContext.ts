import React from 'react';

export interface AppContextInterface extends Record<string, any> {
  loadProgress: number|undefined|null,
  update: Function,
}

const AppContext = React.createContext<AppContextInterface>({
  loadProgress: null,
  update: () => {},
});

export default AppContext;
