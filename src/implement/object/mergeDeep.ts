import curry from '../composition/curry';

/**
 * mergeDeep - 깊은 객체 병합
 */
function mergeDeep<T, U>(obj1: T, obj2: U): T & U {
  const isPlainObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

  const mergeObjects = (left: Record<string, unknown>, right: Record<string, unknown>) => {
    const result: Record<string, unknown> = { ...left };

    for (const [key, value] of Object.entries(right)) {
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
    ...(obj2 as object),
  } as T & U;
}

export default curry(mergeDeep);
