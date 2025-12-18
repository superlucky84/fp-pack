/**
 * when - 조건이 true일 때만 적용
 */
function when<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T {
  // TODO: implement
  return (value: T) => value;
}

export default when;
