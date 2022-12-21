import { WootItem } from 'types';
import ForerunnerDB from 'forerunnerdb';

class DataManager {
  private static instance: DataManager;
  private db:any;

  private constructor() {
    // The DataManager's constructor should always be private to prevent direct
    // construction calls with the `new` operator.
    const fdb = new ForerunnerDB();
    this.db = fdb.db('wootplus');
  }


  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }

    return DataManager.instance;
  }

  public fetchWootItems(url:string) {
    return new Promise<WootItem[]>((resolve, reject) => {
      fetch(url, { method: 'GET' }).then((response) => {
        if (!response.ok) {
          return reject(new Error(`Unable to fetch data at URL: ${url}`));
        }

        // Update the internal database with the retrieved items
        response.json().then((responseData) => {
          resolve(responseData.items);
        }).catch(reject);
      });
    });
  }

  public saveWootItems(wootItems:WootItem[]) {
    return new Promise<boolean>((resolve, reject) => {
      const itemCollection = this.db.collection("woot-items", {
        primaryKey: 'uuid',
      });

      itemCollection.insert(wootItems, () => {
        itemCollection.save((saveError:Error) => {
          if (saveError) {
            return reject(saveError);
          }

          resolve(true);
        });
      });
    });
  }

  public loadWootItems() {
    return new Promise<WootItem[]>((resolve, reject) => {
      const itemCollection = this.db.collection("woot-items", {
        primaryKey: 'uuid',
      });

      itemCollection.load((err:Error) => {
        if (err) {
          return reject(err);
        }

        // TODO: apply filtration parameters to query
        const loadedItems = itemCollection.find();
        resolve(loadedItems);
      });
    });
  }
}

export default DataManager;
