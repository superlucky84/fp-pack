/**
 * flip - 함수 인자 순서를 뒤집음
 */
function flip<A, B, R>(fn: (a: A, b: B) => R): (b: B, a: A) => R;
function flip<A, B, C, R>(fn: (a: A, b: B, c: C) => R): (c: C, b: B, a: A) => R;
function flip<A, B, C, D, R>(fn: (a: A, b: B, c: C, d: D) => R): (d: D, c: C, b: B, a: A) => R;
function flip<A, B, C, D, E, R>(fn: (a: A, b: B, c: C, d: D, e: E) => R): (e: E, d: D, c: C, b: B, a: A) => R;
function flip<R>(fn: (...args: any[]) => R): (...reversed: any[]) => R;
function flip<R>(fn: (...args: any[]) => R) {
  return function flipped(this: unknown, ...args: any[]) {
    const reversed = [...args].reverse();
    return fn.apply(this, reversed);
  };
}

export default flip;
