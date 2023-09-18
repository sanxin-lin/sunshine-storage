export declare const enum TransactionMode {
    ReadOnly = "readonly",
    ReadWrite = "readwrite"
}
export interface IIndexedDBOptions {
    dbName: string;
    dbVersion: number;
    storeName: string;
}
export interface IIndexedDBContext {
    db: IDBDatabase;
}
export type IndexedDBContextMap = Record<string, IIndexedDBContext>;
export interface IStoreParameter {
    name: string;
    params?: IDBObjectStoreParameters;
}
export interface IDBOptions {
    name: string;
    version?: number;
    store: IStoreParameter;
}
