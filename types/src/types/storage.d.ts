export interface IStorageOptions {
    prefix?: string;
    suffix?: string;
    storage?: Storage;
}
export interface Serializer<T> {
    read(raw: string): T;
    write(value: T): string;
}
