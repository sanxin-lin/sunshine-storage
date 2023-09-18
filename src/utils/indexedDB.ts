import { _window } from './global';
import type { IIndexedDBContext } from '../types';

export const getIndexedDB = () => {
  if (_window.indexedDB) {
    return _window.indexedDB;
  }

  if (_window.webkitIndexedDB) {
    return _window.webkitIndexedDB;
  }

  if (_window.mozIndexedDB) {
    return _window.mozIndexedDB;
  }

  if (_window.OIndexedDB) {
    return _window.OIndexedDB;
  }

  if (_window.msIndexedDB) {
    return _window.msIndexedDB;
  }

  return null;
};

export const _indexedDB = getIndexedDB()!;

export const isSupportIndexedDB = () => {
  return Boolean(_indexedDB && _indexedDB.open);
};

export const createIndexedDBContext = (db: IDBDatabase): IIndexedDBContext => ({
  db,
});
