/**
 * unless - 조건이 false일 때만 적용
 */
function unless<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T {
  // TODO: implement
  return (value: T) => value;
}

export default unless;
