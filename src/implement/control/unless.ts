import curry from '../composition/curry';

/**
 * unless - 조건이 false일 때만 적용
 */
function unless<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T {
  return (value: T) => (predicate(value) ? value : fn(value));
}

export default curry(unless);
