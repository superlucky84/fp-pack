import curry from '../composition/curry';

type SortBy = {
  <T>(...args: [fn: (value: T) => any]): (arr: readonly T[]) => T[];
  <T>(...args: [fn: (value: T) => any, arr: readonly T[]]): T[];
};

/**
 * sortBy - 기준 함수로 정렬
 */
function sortBy<T>(fn: (value: T) => any, arr: readonly T[]): T[] {
  return [...arr].sort((a, b) => {
    const aKey = fn(a);
    const bKey = fn(b);
    if (aKey < bKey) return -1;
    if (aKey > bKey) return 1;
    return 0;
  });
}

const curriedSortBy = curry(sortBy) as SortBy;
export default curriedSortBy;
