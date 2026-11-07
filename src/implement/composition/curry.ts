/**
 * Curry function with stable TypeScript types.
 * Supports functions with 2-5 parameters and keeps data-last call order.
 */

export type Curry2<Fn> = Fn extends (a: infer A, b: infer B) => infer R
  ? {
      (...args: [A]): (b: B) => R;
      (...args: [A, B]): R;
    }
  : never;

export type Curry3<Fn> = Fn extends (a: infer A, b: infer B, c: infer C) => infer R
  ? {
      (...args: [A]): Curry2<(b: B, c: C) => R>;
      (...args: [A, B]): (c: C) => R;
      (...args: [A, B, C]): R;
    }
  : never;

export type Curry4<Fn> = Fn extends (a: infer A, b: infer B, c: infer C, d: infer D) => infer R
  ? {
      (...args: [A]): Curry3<(b: B, c: C, d: D) => R>;
      (...args: [A, B]): Curry2<(c: C, d: D) => R>;
      (...args: [A, B, C]): (d: D) => R;
      (...args: [A, B, C, D]): R;
    }
  : never;

export type Curry5<Fn> = Fn extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E) => infer R
  ? {
      (...args: [A]): Curry4<(b: B, c: C, d: D, e: E) => R>;
      (...args: [A, B]): Curry3<(c: C, d: D, e: E) => R>;
      (...args: [A, B, C]): Curry2<(d: D, e: E) => R>;
      (...args: [A, B, C, D]): (e: E) => R;
      (...args: [A, B, C, D, E]): R;
    }
  : never;

type CurryVariadic<Fn extends (...args: any[]) => any> = Fn extends (...args: infer P) => infer R
  ? <T extends any[]>(
      ...args: T
    ) => T extends P ? R : P extends [...T, ...infer Rest] ? CurryVariadic<(...args: Rest) => R> : never
  : never;

type CurryByArity<Fn extends (...args: any[]) => any> = Parameters<Fn>['length'] extends 2
  ? Curry2<Fn>
  : Parameters<Fn>['length'] extends 3
    ? Curry3<Fn>
    : Parameters<Fn>['length'] extends 4
      ? Curry4<Fn>
      : Parameters<Fn>['length'] extends 5
        ? Curry5<Fn>
        : CurryVariadic<Fn>;

export type Curried<Fn extends (...args: any[]) => any> = CurryByArity<Fn>;

function curry<Fn extends (...args: any[]) => any>(fn: Fn): Curried<Fn>;

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
