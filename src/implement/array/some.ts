import curry from '../composition/curry';

/**
 * some - 조건 검사 (하나라도 만족)
 */
function some<T>(predicate: (value: T) => boolean, arr: T[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) return true;
  }
  return false;
}

export default curry(some);
