import curry from '../composition/curry';

type Predicate<T> = (value: T) => boolean;
// One overload family serves type guards and plain predicates. Separate guard
// overloads were tried first and, when rejected, left callbacks typed as never
// (false side) or inline generic callbacks such as tap(...) typed as unknown.
type Rest<T, S> = [Exclude<T, S>] extends [never] ? T : Exclude<T, S>;
type Passed<T, P> = P extends (value: any) => value is infer S ? S : T;
type Failed<T, P> = P extends (value: any) => value is infer S ? Rest<T, S> : T;

type IfElse = {
  <T, P extends Predicate<T> = Predicate<T>>(
    predicate: P & Predicate<T>
  ): <RTrue>(
    onTrue: (value: Passed<T, P>) => RTrue
  ) => <RFalse>(onFalse: (value: Failed<T, P>) => RFalse) => (value: T) => RTrue | RFalse;
  <T, P extends Predicate<T> = Predicate<T>, RTrue = unknown>(
    predicate: P & Predicate<T>,
    onTrue: (value: Passed<T, P>) => RTrue
  ): <RFalse>(onFalse: (value: Failed<T, P>) => RFalse) => (value: T) => RTrue | RFalse;
  <T, P extends Predicate<T> = Predicate<T>, RTrue = unknown, RFalse = unknown>(
    predicate: P & Predicate<T>,
    onTrue: (value: Passed<T, P>) => RTrue,
    onFalse: (value: Failed<T, P>) => RFalse
  ): (value: T) => RTrue | RFalse;
  <T, P extends Predicate<T> = Predicate<T>, RTrue = unknown, RFalse = unknown>(
    predicate: P & Predicate<T>,
    onTrue: (value: Passed<T, P>) => RTrue,
    onFalse: (value: Failed<T, P>) => RFalse,
    value: T
  ): RTrue | RFalse;
  // Explicit <T, RTrue, RFalse> type arguments from earlier versions.
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
