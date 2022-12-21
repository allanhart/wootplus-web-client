import { WootItem } from 'types';

import { QueryFunctionContext } from 'react-query';

import DataManager from "./DataManager";

/**
 * Type the payload passed from our React component into our API function.
 * We want to pass an object containing the `accountName` property.
 * The first element (`string`) is the key of the query (needed by react-query).*
 * @param params QueryFunctionContext
 */
export const syncWootItems = (
  params: QueryFunctionContext<[string, { url: string }]>
): Promise<boolean|Error> => {
  // We can destructure `param.queryKey`:
  //  - first item is the query key.
  //  - second item is the object containing properties passed from the React component.
  const [, { url }] = params.queryKey;

  return new Promise((resolve, reject) => {
    // Update the internal database with the retrieved items
    const dataManager = DataManager.getInstance();
    dataManager.fetchWootItems(url).then((wootItems) => {
      dataManager.saveWootItems(wootItems)
        .then(resolve).catch(reject);
    });
  });
}


/**
 *
 * @param params QueryFunctionContext
 */
export const loadWootItems = (
  params: QueryFunctionContext<[string, { isSyncing: boolean }]>
): Promise<WootItem[]> => {
  const [, { isSyncing }] = params.queryKey;

  return new Promise((resolve, reject) => {
    if (isSyncing) {
      return resolve([]);
    }

    DataManager.getInstance().loadWootItems()
      .then(resolve).catch(reject);
  });
}
