import curry from '../composition/curry';

type Predicate<T> = (value: T) => boolean;
// One overload family serves type guards and plain predicates. Separate guard
// overloads were tried first and, when rejected, left inline generic callbacks
// such as tap(...) typed as unknown.
type Passed<T, P> = P extends (value: any) => value is infer S ? S : T;

type When = {
  <T, P extends Predicate<T> = Predicate<T>>(predicate: P & Predicate<T>): <R>(fn: (value: Passed<T, P>) => R) => (value: T) => T | R;
  <T, P extends Predicate<T> = Predicate<T>>(predicate: P & Predicate<T>, fn: (value: Passed<T, P>) => NoInfer<T>): (value: T) => T;
  <T, P extends Predicate<T> = Predicate<T>, R = unknown>(predicate: P & Predicate<T>, fn: (value: Passed<T, P>) => R): (value: T) => T | R;
  <T, P extends Predicate<T> = Predicate<T>>(predicate: P & Predicate<T>, fn: (value: Passed<T, P>) => NoInfer<T>, value: T): T;
  <T, P extends Predicate<T> = Predicate<T>, R = unknown>(predicate: P & Predicate<T>, fn: (value: Passed<T, P>) => R, value: T): T | R;
  // Explicit <T, R> type arguments from earlier versions.
  <T, R>(predicate: (value: T) => boolean): (fn: (value: T) => R) => (value: T) => T | R;
  <T, R>(predicate: (value: T) => boolean, fn: (value: T) => R): (value: T) => T | R;
  <T, R>(predicate: (value: T) => boolean, fn: (value: T) => R, value: T): T | R;
};

/**
 * when - 조건이 true일 때만 적용
 */
function when<T>(predicate: (value: T) => boolean, fn: (value: T) => T, value: T): T {
  return predicate(value) ? fn(value) : value;
}

const curriedWhen = curry(when) as When;
export default curriedWhen;
