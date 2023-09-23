export interface IGlobal extends Window {
  webkitIndexedDB?: IDBFactory;
  mozIndexedDB?: IDBFactory;
  OIndexedDB?: IDBFactory;
  msIndexedDB?: IDBFactory;
}

export interface IOptions {
  name: string;
  suffix?: string;
  prefix?: string;
  storage?: Storage;
  foceStorage?: boolean;
}
