import curry from '../composition/curry';
import type { DeepMergeResult } from './merge.types';

type MergeDeep = {
  <T>(...args: [obj1: T]): <U>(obj2: U) => DeepMergeResult<T, U>;
  <T, U>(...args: [obj1: T, obj2: U]): DeepMergeResult<T, U>;
};

/**
 * mergeDeep - 깊은 객체 병합
 */
function mergeDeep<T, U>(obj1: T, obj2: U): T & U {
  const isPlainObject = (value: unknown): value is Record<PropertyKey, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

  const mergeObjects = (left: Record<PropertyKey, unknown>, right: Record<PropertyKey, unknown>) => {
    const result: Record<PropertyKey, unknown> = { ...left };

    for (const key of Reflect.ownKeys(right)) {
      if (!Object.prototype.propertyIsEnumerable.call(right, key)) continue;
      const value = right[key];
      const existing = result[key];
      if (isPlainObject(existing) && isPlainObject(value)) {
        result[key] = mergeObjects(existing, value);
      } else {
        result[key] = value;
      }
    }

    return result;
  };

  if (isPlainObject(obj1) && isPlainObject(obj2)) {
    return mergeObjects(obj1, obj2) as T & U;
  }

  return {
    ...(obj1 as object),
    ...(obj2 as object)
  } as T & U;
}

const curriedMergeDeep = curry(mergeDeep) as MergeDeep;
export default curriedMergeDeep;
