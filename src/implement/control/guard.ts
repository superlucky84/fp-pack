import curry from '../composition/curry';

/**
 * guard - 조건 불만족 시 early return
 */
function guard<T, U extends T>(
  predicate: (value: T) => boolean,
  defaultValue: U,
  value: T
): T {
  return predicate(value) ? value : defaultValue;
}

export default curry(guard);
