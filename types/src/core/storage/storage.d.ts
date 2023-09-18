import { IStorageOptions } from '../../types';
export declare class StorageClass {
    private suffix;
    private prefix;
    private storage;
    length: number;
    constructor(options?: IStorageOptions);
    private ready;
    getItem(key: string): Promise<unknown>;
    setItem(key: string, value: any): Promise<void>;
    removeItem(key: string, isFullKey?: boolean): Promise<void>;
    clear(): Promise<void>;
    key(index: number): Promise<unknown>;
    private updateLength;
}
