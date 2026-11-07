import curry from '../composition/curry';

type FlatMap = {
  <T, R>(...args: [fn: (value: T) => readonly R[]]): (arr: readonly T[]) => R[];
  <T, R>(...args: [fn: (value: T) => readonly R[], arr: readonly T[]]): R[];
};

/**
 * flatMap - map 후 flatten
 */
function flatMap<T, R>(fn: (value: T) => readonly R[], arr: readonly T[]): R[] {
  return arr.flatMap(fn);
}

const curriedFlatMap = curry(flatMap) as FlatMap;
export default curriedFlatMap;
