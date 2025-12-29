import curry from '../composition/curry';

/**
 * flatMap - map 후 flatten
 */
function flatMap<T, R>(fn: (value: T) => R[], arr: T[]): R[] {
  return arr.flatMap(fn);
}

export default curry(flatMap);
