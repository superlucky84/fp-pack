import curry from '../composition/curry';

type DropWhile = {
  <T>(...args: [predicate: (value: T) => boolean]): (arr: readonly T[]) => T[];
  <T>(...args: [predicate: (value: T) => boolean, arr: readonly T[]]): T[];
};

/**
 * dropWhile - 조건이 유지되는 동안 앞에서 제외
 */
function dropWhile<T>(predicate: (value: T) => boolean, arr: readonly T[]): T[] {
  const result: T[] = [];
  let dropping = true;
  for (const item of arr) {
    if (dropping && !predicate(item)) {
      dropping = false;
    }
    if (!dropping) {
      result.push(item);
    }
  }
  return result;
}

const curriedDropWhile = curry(dropWhile) as DropWhile;
export default curriedDropWhile;
