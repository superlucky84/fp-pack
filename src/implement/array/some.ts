import curry from '../composition/curry';

type Some = {
  <T, S extends T>(...args: [predicate: (value: T) => value is S]): (arr: T[]) => boolean;
  <T, S extends T>(...args: [predicate: (value: T) => value is S, arr: T[]]): boolean;
  <T>(...args: [predicate: (value: T) => boolean]): (arr: T[]) => boolean;
  <T>(...args: [predicate: (value: T) => boolean, arr: T[]]): boolean;
};

/**
 * some - 조건 검사 (하나라도 만족)
 */
function some<T>(predicate: (value: T) => boolean, arr: T[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) return true;
  }
  return false;
}

const curriedSome = curry(some) as Some;
export default curriedSome;
