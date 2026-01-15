import curry from '../composition/curry';

type Filter = {
  <T, S extends T>(...args: [predicate: (value: T) => value is S]): (arr: T[]) => S[];
  <T, S extends T>(...args: [predicate: (value: T) => value is S, arr: T[]]): S[];
  <T>(...args: [predicate: (value: T) => boolean]): (arr: T[]) => T[];
  <T>(...args: [predicate: (value: T) => boolean, arr: T[]]): T[];
};

/**
 * filter - 조건 필터링
 */
function filter<T>(predicate: (value: T) => boolean, arr: T[]): T[] {
  return arr.filter(predicate);
}

const curriedFilter = curry(filter) as Filter;
export default curriedFilter;
