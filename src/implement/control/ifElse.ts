import curry from '../composition/curry';

/**
 * ifElse - 조건에 따라 다른 함수 실행
 */
function ifElse<T, RTrue, RFalse>(
  predicate: (value: T) => boolean,
  onTrue: (value: T) => RTrue,
  onFalse: (value: T) => RFalse
): (value: T) => RTrue | RFalse {
  return (value: T) => (predicate(value) ? onTrue(value) : onFalse(value));
}

export default curry(ifElse);
