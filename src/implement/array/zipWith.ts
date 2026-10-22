import curry from '../composition/curry';

type ZipWith = {
  <A, B, R>(...args: [fn: (a: A, b: B) => R]): (other: readonly B[]) => (arr: readonly A[]) => R[];
  <A, B, R>(...args: [fn: (a: A, b: B) => R, other: readonly B[]]): (arr: readonly A[]) => R[];
  <A, B, R>(...args: [fn: (a: A, b: B) => R, other: readonly B[], arr: readonly A[]]): R[];
};

/**
 * zipWith - 두 배열을 함수로 결합
 */
function zipWith<A, B, R>(fn: (a: A, b: B) => R, other: readonly B[], arr: readonly A[]): R[] {
  const length = Math.min(arr.length, other.length);
  const result: R[] = [];
  for (let i = 0; i < length; i += 1) {
    result.push(fn(arr[i], other[i]));
  }
  return result;
}

const curriedZipWith = curry(zipWith) as ZipWith;
export default curriedZipWith;
