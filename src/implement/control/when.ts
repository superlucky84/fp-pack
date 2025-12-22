/**
 * when - 조건이 true일 때만 적용
 */
function when<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T {
  return (value: T) => (predicate(value) ? fn(value) : value);
}

export default when;
