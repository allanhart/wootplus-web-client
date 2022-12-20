class DataManager {
  private static _instance: DataManager;

  static getInstance(): DataManager {
    if (!DataManager._instance) {
      DataManager._instance = new DataManager();
    }
    return DataManager._instance;
  }

  sync = ({ onComplete }: { onComplete: Function }) => {
    console.log('syncing');

    setTimeout(() => {
      if (onComplete) {
        onComplete(true);
      }
    }, 2000);
  }
}

export default DataManager;
