import React from 'react';

export interface AppContextInterface extends Record<string, any> {
  loadProgress: number|undefined|null,
  update: Function|null,
}

const AppContext = React.createContext<AppContextInterface | null>(null);

export default AppContext;


// export default React.createContext({
//   loadProgress: null,
//   update: null,
// });
