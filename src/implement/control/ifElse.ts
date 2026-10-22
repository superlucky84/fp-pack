import curry from '../composition/curry';

type IfElse = {
  <T, S extends T>(
    predicate: (value: T) => value is S
  ): <RTrue>(
    onTrue: (value: S) => RTrue
  ) => <RFalse>(onFalse: (value: Exclude<T, S>) => RFalse) => (value: T) => RTrue | RFalse;
  <T, S extends T, RTrue>(
    predicate: (value: T) => value is S,
    onTrue: (value: S) => RTrue
  ): <RFalse>(onFalse: (value: Exclude<T, S>) => RFalse) => (value: T) => RTrue | RFalse;
  <T, S extends T, RTrue, RFalse>(
    predicate: (value: T) => value is S,
    onTrue: (value: S) => RTrue,
    onFalse: (value: Exclude<T, S>) => RFalse
  ): (value: T) => RTrue | RFalse;
  <T, S extends T, RTrue, RFalse>(
    predicate: (value: T) => value is S,
    onTrue: (value: S) => RTrue,
    onFalse: (value: Exclude<T, S>) => RFalse,
    value: T
  ): RTrue | RFalse;
  <T>(
    predicate: (value: T) => boolean
  ): <RTrue>(onTrue: (value: T) => RTrue) => <RFalse>(onFalse: (value: T) => RFalse) => (value: T) => RTrue | RFalse;
  <T, RTrue>(
    predicate: (value: T) => boolean,
    onTrue: (value: T) => RTrue
  ): <RFalse>(onFalse: (value: T) => RFalse) => (value: T) => RTrue | RFalse;
  <T, RTrue, RFalse>(
    predicate: (value: T) => boolean,
    onTrue: (value: T) => RTrue,
    onFalse: (value: T) => RFalse
  ): (value: T) => RTrue | RFalse;
  <T, RTrue, RFalse>(
    predicate: (value: T) => boolean,
    onTrue: (value: T) => RTrue,
    onFalse: (value: T) => RFalse,
    value: T
  ): RTrue | RFalse;
  <T, RTrue, RFalse>(
    predicate: (value: T) => boolean
  ): (onTrue: (value: T) => RTrue) => (onFalse: (value: T) => RFalse) => (value: T) => RTrue | RFalse;
  <T, RTrue, RFalse>(
    predicate: (value: T) => boolean,
    onTrue: (value: T) => RTrue
  ): (onFalse: (value: T) => RFalse) => (value: T) => RTrue | RFalse;
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
