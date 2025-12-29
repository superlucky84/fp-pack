/**
 * Curry function with proper TypeScript types
 * Supports functions with 2-5 parameters with full type inference
 *
 * Why these explicit overloads?
 * A fully "dynamic" curry type needs recursive conditional + variadic tuple types.
 * That looks clever, but often turns type inference mushy, slows the compiler,
 * and makes error messages hard to read. These 2–5 arity overloads keep the API
 * crisp, fast, and predictable while preserving rich partial-application types.
*/

type Curry2<A, B, R> = {
  (a: A): (b: B) => R;
  (a: A, b: B): R;
};

type Curry3<A, B, C, R> = {
  (a: A): Curry2<B, C, R>;
  (a: A, b: B): (c: C) => R;
  (a: A, b: B, c: C): R;
};

type Curry4<A, B, C, D, R> = {
  (a: A): Curry3<B, C, D, R>;
  (a: A, b: B): Curry2<C, D, R>;
  (a: A, b: B, c: C): (d: D) => R;
  (a: A, b: B, c: C, d: D): R;
};

type Curry5<A, B, C, D, E, R> = {
  (a: A): Curry4<B, C, D, E, R>;
  (a: A, b: B): Curry3<C, D, E, R>;
  (a: A, b: B, c: C): Curry2<D, E, R>;
  (a: A, b: B, c: C, d: D): (e: E) => R;
  (a: A, b: B, c: C, d: D, e: E): R;
};

type Apply2<Fn, A, B> = Fn extends (a: A, b: B) => infer R ? R : never;
type Apply3<Fn, A, B, C> = Fn extends (a: A, b: B, c: C) => infer R ? R : never;
type Apply4<Fn, A, B, C, D> = Fn extends (a: A, b: B, c: C, d: D) => infer R ? R : never;
type Apply5<Fn, A, B, C, D, E> = Fn extends (a: A, b: B, c: C, d: D, e: E) => infer R ? R : never;

type Curry2Generic<Fn> = {
  <A, B>(a: A): (b: B) => Apply2<Fn, A, B>;
  <A, B>(a: A, b: B): Apply2<Fn, A, B>;
};

type Curry3Generic<Fn> = {
  <A, B, C>(a: A): (b: B) => (c: C) => Apply3<Fn, A, B, C>;
  <A, B, C>(a: A, b: B): (c: C) => Apply3<Fn, A, B, C>;
  <A, B, C>(a: A, b: B, c: C): Apply3<Fn, A, B, C>;
};

type Curry4Generic<Fn> = {
  <A, B, C, D>(a: A): (b: B) => (c: C) => (d: D) => Apply4<Fn, A, B, C, D>;
  <A, B, C, D>(a: A, b: B): (c: C) => (d: D) => Apply4<Fn, A, B, C, D>;
  <A, B, C, D>(a: A, b: B, c: C): (d: D) => Apply4<Fn, A, B, C, D>;
  <A, B, C, D>(a: A, b: B, c: C, d: D): Apply4<Fn, A, B, C, D>;
};

type Curry5Generic<Fn> = {
  <A, B, C, D, E>(a: A): (b: B) => (c: C) => (d: D) => (e: E) => Apply5<Fn, A, B, C, D, E>;
  <A, B, C, D, E>(a: A, b: B): (c: C) => (d: D) => (e: E) => Apply5<Fn, A, B, C, D, E>;
  <A, B, C, D, E>(a: A, b: B, c: C): (d: D) => (e: E) => Apply5<Fn, A, B, C, D, E>;
  <A, B, C, D, E>(a: A, b: B, c: C, d: D): (e: E) => Apply5<Fn, A, B, C, D, E>;
  <A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): Apply5<Fn, A, B, C, D, E>;
};

type CurryVariadic<Fn extends (...args: any[]) => any> = Fn extends (...args: infer P) => infer R
  ? <T extends any[]>(
      ...args: T
    ) => T extends P ? R : P extends [...T, ...infer Rest] ? CurryVariadic<(...args: Rest) => R> : never
  : never;

function curry<A>(fn: <T>(a: A, b: T[]) => T[]): {
  (a: A): <T>(b: T[]) => T[];
  <T>(a: A, b: T[]): T[];
};
function curry<A>(fn: <T>(a: A, b: T[]) => T[][]): {
  (a: A): <T>(b: T[]) => T[][];
  <T>(a: A, b: T[]): T[][];
};
// Overloads for 2-5 parameter functions
function curry<Fn extends <A, B>(a: A, b: B) => any>(fn: Fn): Curry2Generic<Fn>;
function curry<Fn extends <A, B, C>(a: A, b: B, c: C) => any>(fn: Fn): Curry3Generic<Fn>;
function curry<Fn extends <A, B, C, D>(a: A, b: B, c: C, d: D) => any>(fn: Fn): Curry4Generic<Fn>;
function curry<Fn extends <A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E) => any>(fn: Fn): Curry5Generic<Fn>;
function curry<A, B, R>(fn: (a: A, b: B) => R): Curry2<A, B, R>;
function curry<A, B, C, R>(fn: (a: A, b: B, c: C) => R): Curry3<A, B, C, R>;
function curry<A, B, C, D, R>(fn: (a: A, b: B, c: C, d: D) => R): Curry4<A, B, C, D, R>;
function curry<A, B, C, D, E, R>(fn: (a: A, b: B, c: C, d: D, e: E) => R): Curry5<A, B, C, D, E, R>;

// Variadic fallback for other arities
function curry<T extends (...args: any[]) => any>(fn: T): CurryVariadic<T>;

// Implementation
function curry(fn: (...args: any[]) => any, ...args: any[]): any {
  const curried = (accumulated: any[]) => {
    return accumulated.length >= fn.length
      ? fn(...accumulated)
      : (...nextArgs: any[]) => curried([...accumulated, ...nextArgs]);
  };

  return args.length === 0 ? curried([]) : curried(args);
}

export default curry;
