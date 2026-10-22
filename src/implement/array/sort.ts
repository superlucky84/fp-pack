import curry from '../composition/curry';

type Sort = {
  <T>(...args: [compare: (a: T, b: T) => number]): (arr: readonly T[]) => T[];
  <T>(...args: [compare: (a: T, b: T) => number, arr: readonly T[]]): T[];
};

/**
 * sort - 비교 함수로 정렬 (불변)
 */
function sort<T>(compare: (a: T, b: T) => number, arr: readonly T[]): T[] {
  return [...arr].sort(compare);
}

const curriedSort = curry(sort) as Sort;
export default curriedSort;
