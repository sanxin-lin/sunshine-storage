import { Serializer } from '../types';
export declare const StorageSerializers: Record<'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date', Serializer<any>>;
export declare function guessSerializerType<T extends string | number | boolean | object | null>(rawInit: T): "boolean" | "object" | "number" | "any" | "string" | "map" | "set" | "date";
export interface IValue {
    value: string;
    type: 'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date';
}
