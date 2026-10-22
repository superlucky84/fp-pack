import type { PathKey } from './pathKey';

type At<T, K extends PathKey> = T extends null | undefined
  ? undefined
  : T extends readonly (infer U)[]
    ? K extends keyof T
      ? K extends number | `${number}`
        ? number extends T['length']
          ? T[K] | undefined
          : T[K]
        : T[K]
      : K extends number | `${number}`
        ? U | undefined
        : undefined
    : K extends keyof T
      ? T[K]
      : undefined;

export type PathValue<T, P extends readonly PathKey[], D extends unknown[] = []> = D['length'] extends 8
  ? unknown
  : number extends P['length']
    ? unknown
    : P extends readonly [infer K extends PathKey, ...infer Rest extends PathKey[]]
      ? PathValue<At<T, K>, Rest, [...D, 0]>
      : T;

type SetKey<T, K extends PathKey, V> = T extends readonly (infer U)[]
  ? K extends number | `${number}`
    ? Array<U | V>
    : Omit<T, K> & Record<K, V>
  : T extends object
    ? Omit<T, K> & Record<K, V>
    : K extends number | `${number}`
      ? V[]
      : Record<K, V>;

export type SetPath<T, P extends readonly PathKey[], V, D extends unknown[] = []> = D['length'] extends 8
  ? unknown
  : number extends P['length']
    ? unknown
    : P extends readonly [infer K extends PathKey, ...infer Rest extends PathKey[]]
      ? SetKey<T, K, SetPath<At<T, K>, Rest, V, [...D, 0]>>
      : V;
