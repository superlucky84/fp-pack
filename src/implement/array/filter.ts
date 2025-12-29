import curry from '../composition/curry';

/**
 * filter - 조건 필터링
 */
function filter<T>(predicate: (value: T) => boolean, arr: T[]): T[] {
  return arr.filter(predicate);
}

export default curry(filter);
