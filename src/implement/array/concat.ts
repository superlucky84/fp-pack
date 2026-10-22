import curry from '../composition/curry';

type Concat = {
  <T>(...args: [other: readonly T[]]): (arr: readonly T[]) => T[];
  <T>(...args: [other: readonly T[], arr: readonly T[]]): T[];
};

/**
 * concat - 두 배열 연결
 */
function concat<T>(other: readonly T[], arr: readonly T[]): T[] {
  return [...arr, ...other];
}

const curriedConcat = curry(concat) as Concat;
export default curriedConcat;
