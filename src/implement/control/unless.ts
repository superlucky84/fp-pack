import curry from '../composition/curry';

type Predicate<T> = (value: T) => boolean;
// One overload family serves type guards and plain predicates. Separate guard
// overloads were tried first and, when rejected, left callbacks typed as never
// (false side) or inline generic callbacks such as tap(...) typed as unknown.
type Rest<T, S> = [Exclude<T, S>] extends [never] ? T : Exclude<T, S>;
type Failed<T, P> = P extends (value: any) => value is infer S ? Rest<T, S> : T;

type Unless = {
  <T, P extends Predicate<T> = Predicate<T>>(predicate: P & Predicate<T>): <R>(fn: (value: Failed<T, P>) => R) => (value: T) => T | R;
  <T, P extends Predicate<T> = Predicate<T>>(predicate: P & Predicate<T>, fn: (value: Failed<T, P>) => NoInfer<T>): (value: T) => T;
  <T, P extends Predicate<T> = Predicate<T>, R = unknown>(predicate: P & Predicate<T>, fn: (value: Failed<T, P>) => R): (value: T) => T | R;
  <T, P extends Predicate<T> = Predicate<T>>(predicate: P & Predicate<T>, fn: (value: Failed<T, P>) => NoInfer<T>, value: T): T;
  <T, P extends Predicate<T> = Predicate<T>, R = unknown>(predicate: P & Predicate<T>, fn: (value: Failed<T, P>) => R, value: T): T | R;
  // Explicit <T, R> type arguments from earlier versions.
  <T, R>(predicate: (value: T) => boolean): (fn: (value: T) => R) => (value: T) => T | R;
  <T, R>(predicate: (value: T) => boolean, fn: (value: T) => R): (value: T) => T | R;
  <T, R>(predicate: (value: T) => boolean, fn: (value: T) => R, value: T): T | R;
};

/**
 * unless - 조건이 false일 때만 적용
 */
function unless<T>(predicate: (value: T) => boolean, fn: (value: T) => T, value: T): T {
  return predicate(value) ? value : fn(value);
}

const curriedUnless = curry(unless) as Unless;
export default curriedUnless;
