// Curry function with proper TypeScript types
// Supports functions with 2-5 parameters with full type inference

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

// Overloads for 2-5 parameter functions
function curry<A, B, R>(fn: (a: A, b: B) => R): Curry2<A, B, R>;
function curry<A, B, C, R>(fn: (a: A, b: B, c: C) => R): Curry3<A, B, C, R>;
function curry<A, B, C, D, R>(fn: (a: A, b: B, c: C, d: D) => R): Curry4<A, B, C, D, R>;
function curry<A, B, C, D, E, R>(fn: (a: A, b: B, c: C, d: D, e: E) => R): Curry5<A, B, C, D, E, R>;

// Fallback for other functions
function curry<T extends (...args: any[]) => any>(fn: T): any;

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
