import curry from '../composition/curry';

type NoInfer<T> = [T][T extends any ? 0 : never];
type Widen<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T;

type When = {
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
 * when - 조건이 true일 때만 적용
 */
function when<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T,
  value: T
): T {
  return predicate(value) ? fn(value) : value;
}

const curriedWhen = curry(when) as When;
export default curriedWhen;
