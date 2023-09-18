import { IOptions } from '../types';
import { IndexedDB } from './indexedDB';
import { StorageClass } from './storage';
declare const core: {
    createInstance: (options: IOptions) => IndexedDB | StorageClass;
};
export default core;
