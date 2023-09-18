import type { IIndexedDBContext } from '../types';
export declare const getIndexedDB: () => IDBFactory | null;
export declare const _indexedDB: IDBFactory;
export declare const isSupportIndexedDB: () => boolean;
export declare const createIndexedDBContext: (db: IDBDatabase) => IIndexedDBContext;
