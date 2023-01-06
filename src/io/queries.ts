import { ParsedUrlQuery } from 'querystring';
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
      dataManager.saveWootItems(wootItems).then(resolve).catch(reject);
    }).catch(reject);
  });
}


/**
 *
 * @param params QueryFunctionContext
 */
export const loadWootItems = (
  params: QueryFunctionContext<[string, {
    query:ParsedUrlQuery,
  }]>
): Promise<WootItem[]> => {
  const [, { query }] = params.queryKey;

  return new Promise((resolve, reject) => {
    const filterParams:Record<string, Object> = {
      // list_price_max: { "$gt": 100 },
    };

    if (query.title) {
      filterParams.title = new RegExp(query.title as string, 'ig');
    }
    if (query.category) {
      filterParams.site = new RegExp(query.category as string, 'ig');
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
