/**
 * ifElse - 조건에 따라 다른 함수 실행
 */
function ifElse<T, R>(
  predicate: (value: T) => boolean,
  onTrue: (value: T) => R,
  onFalse: (value: T) => R
): (value: T) => R {
  // TODO: implement
  return (value: T) => onTrue(value);
}

export default ifElse;
