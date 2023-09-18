import { type IDBOptions } from '../../types';
export declare class IndexedDB {
    private name;
    private version;
    private db;
    private store;
    private readyPromise;
    private readyPromiseResolve;
    private readyPromiseReject;
    length: number;
    constructor(options: Pick<IDBOptions, 'store' | 'version' | 'name'>);
    private init;
    get storeName(): string;
    get storeParams(): IDBObjectStoreParameters | undefined;
    private ready;
    private createStore;
    private getTransaction;
    private getObjectStore;
    setItem(key: string, value: any): Promise<void>;
    getItem(primaryKey: string): Promise<any>;
    removeItem(primaryKey: string): Promise<void>;
    private updateLength;
    clear(): Promise<void>;
    key(index: number): Promise<unknown>;
}
export default IndexedDB;
