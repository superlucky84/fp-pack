import curry from '../composition/curry';

type Map = {
  <T, R>(...args: [fn: (value: T) => R]): (arr: readonly T[]) => R[];
  <T, R>(...args: [fn: (value: T) => R, arr: readonly T[]]): R[];
};

/**
 * map - 요소 변환
 */
function map<T, R>(fn: (value: T) => R, arr: readonly T[]): R[] {
  return arr.map(fn);
}

const curriedMap = curry(map) as Map;
export default curriedMap;
