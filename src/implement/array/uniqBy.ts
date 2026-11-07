import curry from '../composition/curry';

type UniqBy = {
  <T>(...args: [fn: (value: T) => any]): (arr: readonly T[]) => T[];
  <T>(...args: [fn: (value: T) => any, arr: readonly T[]]): T[];
};

/**
 * uniqBy - 기준 함수로 중복 제거
 */
function uniqBy<T>(fn: (value: T) => any, arr: readonly T[]): T[] {
  const seen = new Set<any>();
  const result: T[] = [];
  for (const item of arr) {
    const key = fn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

const curriedUniqBy = curry(uniqBy) as UniqBy;
export default curriedUniqBy;
