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
      const saveResult = dataManager.saveWootItems(wootItems);
      if (saveResult) {
        resolve(saveResult);
      } else {
        reject(saveResult);
      }
    }).catch(reject);
  });
}


/**
 *
 * @param params QueryFunctionContext
 */
export const loadWootItems = (
  params: QueryFunctionContext<[string, {
    query:Object,
    isSyncing: boolean,
  }]>
): Promise<WootItem[]> => {
  const [, { isSyncing, query }] = params.queryKey;

  return new Promise((resolve, reject) => {
    if (isSyncing) {
      return resolve([]);
    }


    const filterParams:Object = {
      // title: /samsung/ig,
      // list_price_max: { "$gt": 100 },
    };

    const titleFieldValue = query.title as string;
    if (titleFieldValue) {
      filterParams.title = new RegExp(titleFieldValue, 'ig');
    }

    const orderingParams:Object = {
      $orderBy: {
        title: 1 // Sort ascending or -1 for descending
      }
    };

    DataManager.getInstance().loadWootItems(filterParams, orderingParams)
      .then((wootItems) => {
        resolve(wootItems);
      }).catch(reject);
  });
}
