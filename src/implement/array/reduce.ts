import curry from '../composition/curry';

type Reduce = {
  <T, R>(...args: [fn: (acc: R, value: T) => R]): (initial: R) => (arr: readonly T[]) => R;
  <T, R>(...args: [fn: (acc: R, value: T) => R, initial: R]): (arr: readonly T[]) => R;
  <T, R>(...args: [fn: (acc: R, value: T) => R, initial: R, arr: readonly T[]]): R;
};

/**
 * reduce - 누적 연산
 */
function reduce<T, R>(
  fn: (acc: R, value: T) => R,
  initial: R,
  arr: readonly T[]
): R {
  return arr.reduce(fn, initial);
}

const curriedReduce = curry(reduce) as Reduce;
export default curriedReduce;
