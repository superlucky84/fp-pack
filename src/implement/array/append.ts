import curry from '../composition/curry';

type Append = {
  <T>(...args: [value: T]): (arr: readonly T[]) => T[];
  <T>(...args: [value: T, arr: readonly T[]]): T[];
};

/**
 * append - 배열 끝에 값 추가
 */
function append<T>(value: T, arr: readonly T[]): T[] {
  return [...arr, value];
}

const curriedAppend = curry(append) as Append;
export default curriedAppend;
