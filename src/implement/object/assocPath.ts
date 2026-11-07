import curry from '../composition/curry';
import type { PathKey } from './pathKey';
import type { SetPath } from './path.types';

const isIndexKey = (key: PathKey): key is number | `${number}` => {
  if (typeof key === 'number') {
    return Number.isInteger(key);
  }
  if (typeof key === 'string') {
    return /^-?\d+$/.test(key);
  }
  return false;
};

const normalizeIndex = (key: number | `${number}`, length: number) => {
  const raw = typeof key === 'number' ? key : Number(key);
  if (Number.isNaN(raw)) {
    return -1;
  }
  if (raw < 0) {
    return Math.max(length + raw, 0);
  }
  return raw;
};

const isObjectLike = (value: unknown): value is Record<PropertyKey, unknown> =>
  value !== null && typeof value === 'object';

type AssocPath = {
  <const P extends readonly PathKey[]>(pathArray: P): <V>(value: V) => <T>(obj: T) => SetPath<T, P, V>;
  <const P extends readonly PathKey[], V>(pathArray: P, value: V): <T>(obj: T) => SetPath<T, P, V>;
  <T, const P extends readonly PathKey[], V>(pathArray: P, value: V, obj: T): SetPath<T, P, V>;
};

/**
 * assocPath - 경로 기반 값 설정 (불변)
 */
function assocPath<T = unknown>(pathArray: PathKey[], value: unknown, obj: unknown): T {
  if (pathArray.length === 0) {
    return value as T;
  }

  const [key, ...rest] = pathArray;
  const useArray = isIndexKey(key);
  const base = Array.isArray(obj) ? obj.slice() : isObjectLike(obj) ? { ...(obj as object) } : useArray ? [] : {};

  if (Array.isArray(base) && isIndexKey(key)) {
    const index = normalizeIndex(key, base.length);
    const current = (base as unknown[])[index];
    const nextValue = rest.length === 0 ? value : assocPath(rest, value, current);
    (base as unknown[])[index] = nextValue;
    return base as T;
  }

  const current = isObjectLike(base) ? (base as Record<PropertyKey, unknown>)[key] : undefined;
  const nextValue = rest.length === 0 ? value : assocPath(rest, value, current);
  (base as Record<PropertyKey, unknown>)[key] = nextValue;
  return base as T;
}

const curriedAssocPath = curry(assocPath) as AssocPath;
export default curriedAssocPath;
export type { PathKey };
