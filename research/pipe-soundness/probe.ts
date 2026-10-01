// Probe cases for DESIGN.md § Pipe Soundness Revision. Copied into src/ by reproduce.sh.
// Expected: baseline fails P1 P2 P3 P8 P12 (unused @ts-expect-error) and P7; candidate passes all.
import pipe from './implement/composition/pipe';
import map from './implement/array/map';
import filter from './implement/array/filter';
import prop from './implement/object/prop';
import identity from './implement/composition/identity';
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;
const numId = (id: number) => id;
const strId = (s: string) => s;
const numToStr = (n: number) => `${n}`;
const strLen = (s: string) => s.length;

// P1 issue #5: predefined mismatch should error
// @ts-expect-error P1
export const p1 = pipe(1, numId, strId);
// P2 inline annotated mismatch should error
// @ts-expect-error P2
export const p2 = pipe(1, numId, (s: string) => s.toLowerCase());
// P3 function-first mismatch should error
// @ts-expect-error P3
export const p3 = pipe(numId, strId);
// P4 inline chain infers
export const p4 = pipe(1, (x) => x + 1, (x) => `${x}`, (s) => s.length);
export type P4 = Expect<Equal<typeof p4, number>>;
// P5 inline -> predefined (SmartValidate killer)
export const p5 = pipe(1, (x) => x.toString(), strLen);
export type P5 = Expect<Equal<typeof p5, number>>;
// P6 predefined -> inline
export const p6 = pipe(1, numToStr, (s) => s.length);
export type P6 = Expect<Equal<typeof p6, number>>;
// P7 subtype input is fine
export const p7 = pipe({ a: 1, b: 2 }, (o: { a: number }) => o.a);
export type P7 = Expect<Equal<typeof p7, number>>;
// P8 wider union into narrow fn should error
// @ts-expect-error P8
export const p8 = pipe(1 as number | string, numId, numToStr);
// P9 curried generic utils
export const p9 = pipe([1, 2, 3], map((x: number) => x * 2), filter((x) => x > 2));
export type P9 = Expect<Equal<typeof p9, number[]>>;
// P10 prop + generic identity
export const p10 = pipe({ a: 1 }, prop('a'), identity);
// P11 function-first inline after predefined
export const p11 = pipe(numToStr, (s) => s.length);
export type P11 = Expect<Equal<typeof p11, (a: number) => number>>;
// P12 data-first 12 steps (fallback overload) mismatch
// @ts-expect-error P12
export const p12 = pipe(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, strId);
