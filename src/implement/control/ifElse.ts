import curry from '../composition/curry';

type NoInfer<T> = [T][T extends any ? 0 : never];

type IfElse = {
  <T, RTrue, RFalse>(
    ...args: [predicate: (value: T) => boolean]
  ): (onTrue: (value: T) => RTrue) => (onFalse: (value: T) => RFalse) => (value: T) => RTrue | RFalse;
  <T, RTrue, RFalse>(
    ...args: [predicate: (value: T) => boolean, onTrue: (value: T) => RTrue]
  ): (onFalse: (value: T) => RFalse) => (value: T) => RTrue | RFalse;
  <T, RTrue, RFalse>(
    ...args: [predicate: (value: T) => boolean, onTrue: (value: T) => RTrue, onFalse: (value: T) => RFalse]
  ): (value: T) => RTrue | RFalse;
  <T, RTrue, RFalse>(
    ...args: [
      predicate: (value: T) => boolean,
      onTrue: (value: T) => RTrue,
      onFalse: (value: T) => RFalse,
      value: T
    ]
  ): RTrue | RFalse;
  <T, RTrue, RFalse>(
    ...args: [predicate: (value: NoInfer<T>) => boolean, onTrue: (value: T) => RTrue]
  ): (onFalse: (value: T) => RFalse) => (value: T) => RTrue | RFalse;
  <T, RTrue, RFalse>(
    ...args: [
      predicate: (value: NoInfer<T>) => boolean,
      onTrue: (value: T) => RTrue,
      onFalse: (value: T) => RFalse
    ]
  ): (value: T) => RTrue | RFalse;
  <T, RTrue, RFalse>(
    ...args: [
      predicate: (value: NoInfer<T>) => boolean,
      onTrue: (value: T) => RTrue,
      onFalse: (value: T) => RFalse,
      value: T
    ]
  ): RTrue | RFalse;
};

/**
 * ifElse - 조건에 따라 다른 함수 실행
 */
function ifElse<T, RTrue, RFalse>(
  predicate: (value: T) => boolean,
  onTrue: (value: T) => RTrue,
  onFalse: (value: T) => RFalse,
  value: T
): RTrue | RFalse {
  return predicate(value) ? onTrue(value) : onFalse(value);
}

const curriedIfElse = curry(ifElse) as IfElse;
export default curriedIfElse;
