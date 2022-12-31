import { WootItem } from 'types';


class DataManager {
  private static instance: DataManager;
  private db:any;

  /**
   * The DataManager's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   * @private
   */
  private constructor() {
    const fdb = new window.ForerunnerDB();
    this.db = fdb.db('wootplus');
  }


  public static getInstance():DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }

    return DataManager.instance;
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

    const responseData = await response.json();
    return responseData.items;
  }

  public saveWootItems(wootItems:WootItem[]):boolean {
    const itemCollection = this.db.collection("woot-items", {
      primaryKey: 'uuid',
    });

    itemCollection.insert(wootItems, () => {
      itemCollection.save((saveError:Error) => {
        if (saveError) {
          return false;
        }
      });
    });

    return true;
  }

  public loadWootItems(filterParams:Object, orderingParams:Object) {
    console.log('load woot items', filterParams, orderingParams);

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
