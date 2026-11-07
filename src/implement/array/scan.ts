import curry from '../composition/curry';

type Scan = {
  <T, R>(...args: [fn: (acc: R, value: T) => R]): (initial: R) => (arr: readonly T[]) => R[];
  <T, R>(...args: [fn: (acc: R, value: T) => R, initial: R]): (arr: readonly T[]) => R[];
  <T, R>(...args: [fn: (acc: R, value: T) => R, initial: R, arr: readonly T[]]): R[];
};

/**
 * scan - 누적 중간값을 배열로 반환
 */
function scan<T, R>(fn: (acc: R, value: T) => R, initial: R, arr: readonly T[]): R[] {
  const result: R[] = [];
  let acc = initial;
  for (const item of arr) {
    acc = fn(acc, item);
    result.push(acc);
  }
  return result;
}

const curriedScan = curry(scan) as Scan;
export default curriedScan;
