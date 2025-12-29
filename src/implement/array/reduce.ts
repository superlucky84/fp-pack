import curry from '../composition/curry';

/**
 * reduce - 누적 연산
 */
function reduce<T, R>(
  fn: (acc: R, value: T) => R,
  initial: R,
  arr: T[]
): R {
  return arr.reduce(fn, initial);
}

export default curry(reduce);
