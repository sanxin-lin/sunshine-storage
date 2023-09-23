import { isSupportIndexedDB } from '../utils';
import { IOptions } from '../types';
import { IndexedDB } from './indexedDB';
import { StorageClass } from './storage';

const createInstance = (options: IOptions) => {
  const { name, foceStorage } = options;

  if (isSupportIndexedDB() && name && !foceStorage) {
    return new IndexedDB({ name, version: 1, store: { name: 'sunshine_indexeddb_store' } });
  }

  const { storage, prefix, suffix } = options;
  return new StorageClass({
    storage,
    prefix,
    suffix,
  });
};

const core = {
  createInstance,
};

export default core;

// export * from './indexedDB';
// export * from './localStorage';
