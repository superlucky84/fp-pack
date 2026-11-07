import curry from '../composition/curry';

type TakeWhile = {
  <T>(...args: [predicate: (value: T) => boolean]): (arr: readonly T[]) => T[];
  <T>(...args: [predicate: (value: T) => boolean, arr: readonly T[]]): T[];
};

/**
 * takeWhile - 조건이 유지되는 동안 앞에서 가져오기
 */
function takeWhile<T>(predicate: (value: T) => boolean, arr: readonly T[]): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (!predicate(item)) {
      break;
    }
    result.push(item);
  }
  return result;
}

const curriedTakeWhile = curry(takeWhile) as TakeWhile;
export default curriedTakeWhile;
