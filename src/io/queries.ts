import { WootItem } from 'types';

import ForerunnerDB from 'forerunnerdb';

import { QueryFunctionContext } from 'react-query';


const fdb = new ForerunnerDB();
const db = fdb.db('wootplus');
const itemCollection = db.collection("woot-items", {
  primaryKey: 'uuid',
});

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
    fetch(url, { method: 'GET' }).then((response) => {
      if (!response.ok) {
        return reject(new Error(`Unable to fetch user-account: error ${response.status}`));
      }

      // Update the internal database with the retrieved items
      response.json().then((responseData) => {
        itemCollection.insert(responseData.items, () => {
          itemCollection.save((saveError:Error) => {
            if (saveError) {
              return reject(saveError);
            }

            resolve(true);
          });
        });
      });
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

    console.log('loading items');
    itemCollection.load((err:Error) => {
      if (err) {
        return reject(err);
      }

      const loadedItems = itemCollection.find();
      resolve(loadedItems);
    });
  });
}
