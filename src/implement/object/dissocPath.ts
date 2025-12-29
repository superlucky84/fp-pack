import curry from '../composition/curry';

type PathKey = string | number | symbol;

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
    return length + raw;
  }
  return raw;
};

const isObjectLike = (value: unknown): value is Record<PropertyKey, unknown> =>
  value !== null && typeof value === 'object';

/**
 * dissocPath - 경로 기반 값 제거 (불변)
 */
function dissocPath<T = unknown>(pathArray: PathKey[], obj: T): T {
  if (pathArray.length === 0) {
    return obj;
  }

  if (!isObjectLike(obj)) {
    return obj;
  }

  const [key, ...rest] = pathArray;

  if (Array.isArray(obj) && isIndexKey(key)) {
    const index = normalizeIndex(key, obj.length);
    if (index < 0 || index >= obj.length) {
      return obj;
    }

    const result = obj.slice();
    if (rest.length === 0) {
      result.splice(index, 1);
      return result as unknown as T;
    }

    const nextValue = dissocPath(rest, result[index]);
    result[index] = nextValue;
    return result as unknown as T;
  }

  if (!Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj;
  }

  if (rest.length === 0) {
    const { [key]: _removed, ...restObj } = obj as Record<PropertyKey, unknown>;
    return restObj as T;
  }

  const result = { ...(obj as object) } as Record<PropertyKey, unknown>;
  result[key] = dissocPath(rest, result[key]);
  return result as T;
}

export default curry(dissocPath);
