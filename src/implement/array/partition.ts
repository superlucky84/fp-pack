import curry from '../composition/curry';

type Partition = {
  <T, S extends T>(predicate: (value: T) => value is S): (arr: readonly T[]) => [S[], Exclude<T, S>[]];
  <T, S extends T>(predicate: (value: T) => value is S, arr: readonly T[]): [S[], Exclude<T, S>[]];
  <T>(...args: [predicate: (value: T) => boolean]): (arr: readonly T[]) => [T[], T[]];
  <T>(...args: [predicate: (value: T) => boolean, arr: readonly T[]]): [T[], T[]];
};

/**
 * partition - 조건에 따라 분리
 */
function partition<T>(predicate: (value: T) => boolean, arr: readonly T[]): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];

  for (const item of arr) {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }

  return [truthy, falsy];
}

const curriedPartition = curry(partition) as Partition;
export default curriedPartition;
