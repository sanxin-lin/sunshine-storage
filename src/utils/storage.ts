import { isSet, isMap, isDate, isBoolean, isString, isNaN, isNull, isObject } from 'lodash';
import { Serializer } from '../types';

export const StorageSerializers: Record<
  'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date',
  Serializer<any>
> = {
  boolean: {
    read: (v: any) => v === 'true',
    write: (v: any) => String(v),
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v),
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from((v as Map<any, any>).entries())),
  },
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from(v as Set<any>)),
  },
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => v.toISOString(),
  },
};

export function guessSerializerType<T extends string | number | boolean | object | null>(
  rawInit: T,
) {
  return isNull(rawInit)
    ? 'any'
    : isSet(rawInit)
    ? 'set'
    : isMap(rawInit)
    ? 'map'
    : isDate(rawInit)
    ? 'date'
    : isBoolean(rawInit)
    ? 'boolean'
    : isString(rawInit)
    ? 'string'
    : isObject(rawInit)
    ? 'object'
    : !isNaN(rawInit)
    ? 'number'
    : 'any';
}

export interface IValue {
  value: string;
  type: 'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date';
}
