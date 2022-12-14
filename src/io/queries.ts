import { ParsedUrlQuery } from 'querystring';
import { Tag, WootItem } from 'types';

import { QueryFunctionContext } from 'react-query';


import DataManager from "./DataManager";

export const fetchTags = (): Promise<Tag[]> => {
  return new Promise((resolve, reject) => {
    // Update the internal database with the retrieved items
    const dataManager = DataManager.getInstance();
    dataManager.fetchTags().then(resolve).catch(reject);
  });
}


/**
 * Type the payload passed from our React component into our API function.
 * We want to pass an object containing the `accountName` property.
 * The first element (`string`) is the key of the query (needed by react-query).*
 * @param params QueryFunctionContext
 */
export const syncWootItems = (
  params: QueryFunctionContext<[string, { url: string }]>
): Promise<boolean> => {
  // We can destructure `param.queryKey`:
  //  - first item is the query key.
  //  - second item is the object containing properties passed from the React component.
  const [, { url }] = params.queryKey;

  return new Promise((resolve, reject) => {
    // TODO: Use timestamp to determine if a sync is required
    // return resolve(true);

    // Fetch an updated list of feed items and store them locally
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
      // id: '037434de-c94f-40d8-9806-0adbeb72351a',
    };

    if (query.title) {
      filterParams.title = new RegExp(query.title as string, 'i');
    }

    if (query.category) {
      const categoryPattern = `${query.category as string}`;
      filterParams.categories = new RegExp(categoryPattern, 'i');
    }

    const optionsParams:Object = {
      $orderBy: {
        discount: -1 // Sort ascending or -1 for descending
      }
    };

    DataManager.getInstance().loadWootItems(filterParams, optionsParams)
      .then(resolve).catch(reject);
  });
}
