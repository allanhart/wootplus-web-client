import { Tag, WootItem } from 'types';
import { apiUrl } from "util/shortcuts";


class DataManager {
  private static instance: DataManager;
  private db:any;

  public static getInstance():DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }

    return DataManager.instance;
  }

  /**
   * The DataManager's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   * @private
   */
  private constructor() {
    const fdb = new window.ForerunnerDB();
    this.db = fdb.db('wootplus');
  }

  public async fetchTags():Promise<Tag[]> {
    const requestUrl = apiUrl('/tags/');

    let response;
    try {
      response = await fetch(requestUrl, { method: 'GET' });
    } catch (err) {
      throw new Error(`Unable to fetch data at URL: ${requestUrl}`);
    }

    if (!response.ok) {
      throw new Error(`Invalid response from URL: ${requestUrl}`);
    }

    return await response.json();
  }

  public async fetchWootItems(url:string):Promise<WootItem[]> {
    let response;
    try {
      response = await fetch(url, { method: 'GET' });
    } catch (err) {
      throw new Error(`Unable to fetch data at URL: ${url}`);
    }

    if (!response.ok) {
      throw new Error(`Invalid response from URL: ${url}`);
    }

    return await response.json();
  }

  public saveWootItems(wootItems:WootItem[]):Promise<boolean> {
    return new Promise((resolve, reject) => {
      const itemCollection = this.db.collection("woot-items", {
        primaryKey: 'uuid',
      });

      itemCollection.insert(wootItems, () => {
        itemCollection.save((saveError:Error) => {
          if (saveError) {
            reject(false);
          } else {
            resolve(true);
          }
        });
      });
    });
  }

  public loadWootItems(filterParams:Object, orderingParams:Object) {
    return new Promise<WootItem[]>((resolve, reject) => {
      const itemCollection = this.db.collection("woot-items", {
        primaryKey: 'uuid',
      });

      itemCollection.load((err:Error) => {
        if (err) {
          return reject(err);
        }

        const loadedItems = itemCollection.find(filterParams, orderingParams);
        resolve(loadedItems);
      });
    });
  }
}

export default DataManager;
