import { guessSerializerType, IValue, StorageSerializers } from '../../utils/storage';
import { IStorageOptions } from '../../types';
import { _window } from 'src/utils';

export class StorageClass {
  private suffix: string;
  private prefix: string;
  private storage: Storage;
  length = 0;

  constructor(options: IStorageOptions = {}) {
    const { prefix = '', suffix = '', storage = _window.localStorage } = options;
    this.prefix = prefix;
    this.suffix = suffix;
    this.storage = storage;
  }

  private ready() {
    return Promise.resolve();
  }

  getItem(key: string) {
    return new Promise(resolve => {
      this.ready().then(() => {
        const { prefix, suffix, storage } = this;
        const _key = `${prefix}${key}${suffix}`;
        const v = storage.getItem(_key);
        let _v;
        try {
          _v = JSON.parse(v as string);
          const { type, value } = _v as IValue;
          if (StorageSerializers[type]) {
            const { read } = StorageSerializers[type];
            _v = read(value);
          } else {
            _v = value;
          }
        } catch (e) {
          _v = v;
        }
        resolve(_v);
      });
    });
  }

  setItem(key: string, value: any) {
    return this.ready().then(() => {
      const { prefix, suffix, storage } = this;
      const _key = `${prefix}${key}${suffix}`;
      const type = guessSerializerType(value);
      const { write } = StorageSerializers[type];
      let _value;
      try {
        _value = write(value);
      } catch (e) {
        _value = value;
      }
      storage.setItem(
        _key,
        JSON.stringify({
          type,
          value: _value,
        }),
      );
      this.updateLength();
    });
  }

  removeItem(key: string, isFullKey = false) {
    return this.ready().then(() => {
      const { prefix, suffix, storage } = this;
      const _key = isFullKey ? key : `${prefix}${key}${suffix}`;
      storage.removeItem(_key);
      this.updateLength();
    });
  }

  clear() {
    return this.ready().then(() => {
      const { prefix, suffix, storage } = this;
      const keys = Object.keys(storage);
      keys.forEach(key => {
        const regex = new RegExp(`^${prefix}.*${suffix}$`);
        const isMatch = regex.test(key);
        if (isMatch) {
          this.removeItem(key, true);
        }
      });
      this.updateLength();
    });
  }

  key(index: number) {
    return new Promise(resolve => {
      this.ready().then(() => {
        const { storage } = this;
        const keys = Object.keys(storage);
        resolve(keys[index]);
      });
    });
  }

  private updateLength() {
    const { storage } = this;
    this.length = Object.keys(storage).length;
  }
}
