import curry from '../composition/curry';

type NoInfer<T> = [T][T extends any ? 0 : never];
type Widen<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T;

type Unless = {
  <T>(...args: [predicate: (value: Widen<T>) => boolean]): (
    fn: (value: Widen<T>) => Widen<T>
  ) => (value: Widen<T>) => Widen<T>;
  <T, R>(...args: [predicate: (value: Widen<T>) => boolean]): (
    fn: (value: Widen<T>) => R
  ) => (value: Widen<T>) => Widen<T> | R;
  <T>(
    ...args: [predicate: (value: Widen<T>) => boolean, fn: (value: Widen<T>) => Widen<T>]
  ): (value: Widen<T>) => Widen<T>;
  <T, R>(
    ...args: [predicate: (value: Widen<T>) => boolean, fn: (value: Widen<T>) => R]
  ): (value: Widen<T>) => Widen<T> | R;
  <T>(
    ...args: [predicate: (value: Widen<T>) => boolean, fn: (value: Widen<T>) => Widen<T>, value: Widen<T>]
  ): Widen<T>;
  <T, R>(
    ...args: [predicate: (value: Widen<T>) => boolean, fn: (value: Widen<T>) => R, value: Widen<T>]
  ): Widen<T> | R;
  <T>(
    ...args: [predicate: (value: NoInfer<Widen<T>>) => boolean, fn: (value: Widen<T>) => Widen<T>]
  ): (value: Widen<T>) => Widen<T>;
  <T, R>(
    ...args: [predicate: (value: NoInfer<Widen<T>>) => boolean, fn: (value: Widen<T>) => R]
  ): (value: Widen<T>) => Widen<T> | R;
  <T>(
    ...args: [
      predicate: (value: NoInfer<Widen<T>>) => boolean,
      fn: (value: Widen<T>) => Widen<T>,
      value: Widen<T>
    ]
  ): Widen<T>;
  <T, R>(
    ...args: [
      predicate: (value: NoInfer<Widen<T>>) => boolean,
      fn: (value: Widen<T>) => R,
      value: Widen<T>
    ]
  ): Widen<T> | R;
};

/**
 * unless - 조건이 false일 때만 적용
 */
function unless<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T,
  value: T
): T {
  return predicate(value) ? value : fn(value);
}

const curriedUnless = curry(unless) as Unless;
export default curriedUnless;
