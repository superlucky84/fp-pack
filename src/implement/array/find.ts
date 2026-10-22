import curry from '../composition/curry';

type Find = {
  <T, S extends T>(predicate: (value: T) => value is S): (arr: readonly T[]) => S | undefined;
  <T, S extends T>(predicate: (value: T) => value is S, arr: readonly T[]): S | undefined;
  <T>(...args: [predicate: (value: T) => boolean]): (arr: readonly T[]) => T | undefined;
  <T>(...args: [predicate: (value: T) => boolean, arr: readonly T[]]): T | undefined;
};

/**
 * find - 조건 만족 첫 요소
 */
function find<T>(predicate: (value: T) => boolean, arr: readonly T[]): T | undefined {
  return arr.find(predicate);
}

const curriedFind = curry(find) as Find;
export default curriedFind;
