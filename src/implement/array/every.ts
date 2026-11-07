import curry from '../composition/curry';

type Every = {
  <T, S extends T>(predicate: (value: T) => value is S): (arr: readonly T[]) => arr is readonly S[];
  <T, S extends T>(predicate: (value: T) => value is S, arr: readonly T[]): arr is readonly S[];
  <T>(predicate: (value: T) => boolean): (arr: readonly T[]) => boolean;
  <T>(predicate: (value: T) => boolean, arr: readonly T[]): boolean;
};

/**
 * every - 조건 검사 (모두 만족)
 */
function every<T>(predicate: (value: T) => boolean, arr: readonly T[]): boolean {
  return arr.every(predicate);
}

const curriedEvery = curry(every) as Every;
export default curriedEvery;
