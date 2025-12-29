import curry from '../composition/curry';

/**
 * partition - 조건에 따라 분리
 */
function partition<T>(predicate: (value: T) => boolean, arr: T[]): [T[], T[]] {
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

export default curry(partition);
