import curry from '../composition/curry';

/**
 * every - 조건 검사 (모두 만족)
 */
function every<T>(predicate: (value: T) => boolean, arr: T[]): boolean {
  return arr.every(predicate);
}

export default curry(every);
