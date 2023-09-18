import { log, warning } from '../../utils';
import { type IStoreParameter, type IDBOptions, TransactionMode } from '../../types';

export class IndexedDB {
  private name: string = '';
  private version: number;
  private db!: IDBDatabase;
  private store: IStoreParameter;

  private readyPromise!: Promise<void>;
  private readyPromiseResolve!: () => void;
  private readyPromiseReject!: (error: DOMException | null) => void;

  public length = 0;

  constructor(options: Pick<IDBOptions, 'store' | 'version' | 'name'>) {
    const { name, version = 1, store } = options;
    this.name = name;
    this.version = version;
    this.store = store;
    this.init();
  }

  private init() {
    const request = indexedDB.open(this.name, this.version);
    this.readyPromise = new Promise((resolve, reject) => {
      this.readyPromiseResolve = resolve;
      this.readyPromiseReject = reject;
    });

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      log('onupgradeneeded');
      this.db = (event.target as IDBOpenDBRequest).result;
      this.createStore();
    };

    request.onsuccess = (event: Event) => {
      log('onsuccess');
      this.db = (event.target as IDBOpenDBRequest).result;
      this.readyPromiseResolve();
    };

    request.onerror = (event: Event) => {
      this.readyPromiseReject((event.target as IDBOpenDBRequest).error);
      warning((event.target as IDBOpenDBRequest).error as unknown as string);
    };
  }

  get storeName() {
    return this.store.name;
  }
  get storeParams() {
    return this.store.params;
  }

  private ready() {
    if (!this.readyPromise) return Promise.reject();

    return this.readyPromise;
  }

  private createStore() {
    const { objectStoreNames } = this.db;
    if (!objectStoreNames.contains(this.store.name)) {
      this.db.createObjectStore(this.storeName, this.storeParams);
    }
  }

  private getTransaction(transactionMode?: TransactionMode) {
    return this.db.transaction(this.storeName, transactionMode);
  }

  private getObjectStore(transactionMode?: TransactionMode) {
    const transaction = this.getTransaction(transactionMode);
    const objectStore = transaction.objectStore(this.storeName);

    return objectStore;
  }

  setItem(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ready()
        .then(() => {
          const transaction = this.getTransaction(TransactionMode.ReadWrite);
          const objectStore = transaction.objectStore(this.storeName);
          // objectStore.add(item);
          objectStore.put(value, key);

          transaction.oncomplete = () => {
            this.updateLength().finally(() => resolve());
          };

          transaction.onerror = (event: Event) => {
            reject((event.target as IDBTransaction).error);
          };
        })
        .catch(reject);
    });
  }

  // 主键取数据
  getItem(primaryKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ready()
        .then(() => {
          const objectStore = this.getObjectStore(TransactionMode.ReadOnly);
          const request = objectStore.get(primaryKey);

          request.onsuccess = (event: Event) => {
            const { result } = event.target as IDBRequest;
            this.updateLength().finally(() => resolve(result));
          };

          request.onerror = (event: Event) => {
            const { error } = event.target as IDBRequest;
            reject(error);
          };
        })
        .catch(reject);
    });
  }

  removeItem(primaryKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ready()
        .then(() => {
          const transaction = this.getTransaction(TransactionMode.ReadWrite);
          const objectStore = this.getObjectStore(TransactionMode.ReadWrite);
          objectStore.delete(primaryKey);

          transaction.oncomplete = () => {
            this.updateLength().finally(() => resolve());
          };

          transaction.onerror = (event: Event) => {
            const { error } = event.target as IDBRequest;
            reject(error);
          };
        })
        .then(reject);
    });
  }

  private updateLength() {
    return new Promise((resolve, reject) => {
      this.ready()
        .then(() => {
          const objectStore = this.getObjectStore(TransactionMode.ReadOnly);
          const request = objectStore.count();

          request.onsuccess = (event: Event) => {
            const { result } = event.target as IDBRequest;
            this.length = result ? result : 0;
            resolve(result);
          };

          request.onerror = (event: Event) => {
            const { error } = event.target as IDBRequest;
            reject(error);
          };
        })
        .catch(reject);
    });
  }

  clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ready()
        .then(() => {
          const transaction = this.getTransaction(TransactionMode.ReadWrite);
          const objectStore = this.getObjectStore(TransactionMode.ReadWrite);
          objectStore.clear();

          transaction.oncomplete = () => {
            this.updateLength().finally(() => resolve());
          };

          transaction.onerror = (event: Event) => {
            const { error } = event.target as IDBRequest;
            reject(error);
          };
        })
        .catch(reject);
    });
  }

  key(index: number) {
    return new Promise((resolve, reject) => {
      this.ready()
        .then(() => {
          const objectStore = this.getObjectStore(TransactionMode.ReadOnly);
          const request = objectStore.getAllKeys();

          request.onsuccess = (event: Event) => {
            const { result } = event.target as IDBRequest;
            resolve(result ? result[index] : result);
          };

          request.onerror = (event: Event) => {
            const { error } = event.target as IDBRequest;
            reject(error);
          };
        })
        .catch(reject);
    });
  }
}
export default IndexedDB;

// const request = () => {
//   return new Promise(resolve => {
//     // 模拟请求后得到db对象
//     setTimeout(() => {
//       resolve({
//         get: key => key,
//       });
//     }, 300);
//   });
// };

// class Base {
//   private db;

//   init() {
//     return request().then(res => {
//       this.db = res;
//     });
//   }

//   getItem() {
//     return this.db.get('info');
//   }
// }

// const fn = async () => {
//   const base = new Base();
//   await base.init();
//   base.getItem();
// };
