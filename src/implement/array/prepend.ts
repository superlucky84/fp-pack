import curry from '../composition/curry';

type Prepend = {
  <T>(...args: [value: T]): (arr: readonly T[]) => T[];
  <T>(...args: [value: T, arr: readonly T[]]): T[];
};

/**
 * prepend - 배열 앞에 값 추가
 */
function prepend<T>(value: T, arr: readonly T[]): T[] {
  return [value, ...arr];
}

const curriedPrepend = curry(prepend) as Prepend;
export default curriedPrepend;
