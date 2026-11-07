import curry from '../composition/curry';

// A rejected guard overload still fixes an unannotated callback's parameter type,
// so a plain boolean predicate must leave the false side T rather than never.
type Rest<T, S> = [Exclude<T, S>] extends [never] ? T : Exclude<T, S>;

type Widen<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T;

type Unless = {
  <T, S extends T>(predicate: (value: T) => value is S): <R>(fn: (value: Rest<T, S>) => R) => (value: T) => T | R;
  <T, S extends T, R>(predicate: (value: T) => value is S, fn: (value: Rest<T, S>) => R): (value: T) => T | R;
  <T, S extends T, R>(predicate: (value: T) => value is S, fn: (value: Rest<T, S>) => R, value: T): T | R;
  <T>(predicate: (value: Widen<T>) => boolean): <R>(fn: (value: Widen<T>) => R) => (value: Widen<T>) => Widen<T> | R;
  <T>(predicate: (value: Widen<T>) => boolean, fn: (value: Widen<T>) => NoInfer<Widen<T>>): (value: Widen<T>) => Widen<T>;
  <T, R>(predicate: (value: Widen<T>) => boolean, fn: (value: Widen<T>) => R): (value: Widen<T>) => Widen<T> | R;
  <T>(predicate: (value: Widen<T>) => boolean, fn: (value: Widen<T>) => NoInfer<Widen<T>>, value: Widen<T>): Widen<T>;
  <T, R>(predicate: (value: Widen<T>) => boolean, fn: (value: Widen<T>) => R, value: Widen<T>): Widen<T> | R;
};

/**
 * unless - 조건이 false일 때만 적용
 */
function unless<T>(predicate: (value: T) => boolean, fn: (value: T) => T, value: T): T {
  return predicate(value) ? value : fn(value);
}

const curriedUnless = curry(unless) as Unless;
export default curriedUnless;
