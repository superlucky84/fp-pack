import { curryN, pipe, pipeAsync, pipeSideEffect, pipeAsyncSideEffect } from '../../index';
import type { CurriedN } from '../../index';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;
const add = (a: number, b = 10) => a + b;
export const defaultOne = curryN(1, add)(2);
export type DefaultOne = Expect<Equal<typeof defaultOne, number>>;
export const defaultTwo = curryN(2, add)(2)(3);
export type DefaultTwo = Expect<Equal<typeof defaultTwo, number>>;
export const defaultUndefined = curryN(2, add)(2)(undefined);
export type DefaultUndefined = Expect<Equal<typeof defaultUndefined, number>>;
export const defaultExtra = curryN(1, add)(2, 3);
export type DefaultExtra = Expect<Equal<typeof defaultExtra, number>>;
export const optional = curryN(1, (value: number, unit?: string) => value.toFixed() + (unit ?? ''))(2);
export type Optional = Expect<Equal<typeof optional, string>>;
export const optionalTwo = curryN(2, (value: number, unit?: string) => value.toFixed() + (unit ?? ''))(2)('kg');
export type OptionalTwo = Expect<Equal<typeof optionalTwo, string>>;
const sum = (...values: number[]) => values.reduce((a, b) => a + b, 0);
export const rest = curryN(3, sum)(1)(2, 3, 4);
export type Rest = Expect<Equal<typeof rest, number>>;
export const labeled = curryN(3, (label: string, ...values: number[]) => label + sum(...values))('sum:')(1, 2, 3);
export type Labeled = Expect<Equal<typeof labeled, string>>;
export const optionalRest = curryN(
  2,
  (label?: string, ...values: number[]) => (label ?? '') + sum(...values)
)(undefined)(1, 2);
export type OptionalRest = Expect<Equal<typeof optionalRest, string>>;
export const empty = curryN(2, add)()(2)()(3);
export type Empty = Expect<Equal<typeof empty, number>>;
export const zero = curryN(0, () => 42)();
export type Zero = Expect<Equal<typeof zero, number>>;
export const zeroDefault = curryN(0, (value = 10) => value)(3);
export type ZeroDefault = Expect<Equal<typeof zeroDefault, number>>;
export const callback = curryN(2, (format: (value: number) => string, value: number) => format(value))((n) =>
  n.toFixed()
)(2);
export type Callback = Expect<Equal<typeof callback, string>>;
export const optionalCallback = curryN(1, (format?: (value: number) => string) => format?.(2))((n) => n.toFixed());
export type OptionalCallback = Expect<Equal<typeof optionalCallback, string | undefined>>;
export const addOne = curryN(2, add)(1);
export const piped = pipe(2, addOne, (n) => n.toFixed());
export type Piped = Expect<Equal<typeof piped, string>>;
export const asyncPiped = pipeAsync(2, addOne);
export type AsyncPiped = Expect<Equal<typeof asyncPiped, Promise<number>>>;
export const effectPiped = pipeSideEffect(2, addOne);
export type EffectPiped = Expect<Equal<typeof effectPiped, number>>;
export const asyncEffectPiped = pipeAsyncSideEffect(2, addOne);
export type AsyncEffectPiped = Expect<Equal<typeof asyncEffectPiped, Promise<number>>>;
export const promised = curryN(2, async (a: number, b: number) => a + b)(1)(2);
export type Promised = Expect<Equal<typeof promised, Promise<number>>>;
export const named: CurriedN<typeof add, 2> = curryN(2, add);
export const namedResult = named(1)(2);
export type NamedResult = Expect<Equal<typeof namedResult, number>>;
declare const values: number[];
export const unknownSpread = curryN(3, sum)(...values);
export type UnknownSpread = Expect<Equal<typeof unknownSpread, unknown>>;
export const completedSpread = curryN(3, sum)(1, 2)(3, ...values);
export type CompletedSpread = Expect<Equal<typeof completedSpread, number>>;

// @ts-expect-error the required second argument cannot be omitted by lowering the count
curryN(1, (a: number, b: string) => a + b);
// @ts-expect-error a finite signature cannot receive three arguments
curryN(3, add);
// @ts-expect-error a required prefix cannot execute at count zero
curryN(0, add);
// @ts-expect-error negative count
curryN(-1, sum);
// @ts-expect-error fractional count
curryN(1.5, sum);
// @ts-expect-error recursion budget is explicit
curryN(33, sum);
declare const dynamicCount: number;
// @ts-expect-error a dynamic count cannot define a precise curried signature
curryN(dynamicCount, sum);
// @ts-expect-error argument types remain checked in partial calls
curryN(2, add)('wrong');
// @ts-expect-error required values do not become optional while currying
curryN(2, add)(undefined);
// @ts-expect-error optional values retain their declared type
curryN(2, add)(1)('wrong');
// @ts-expect-error additional finite arguments remain invalid
curryN(1, add)(1, 2, 3);
// @ts-expect-error rest element types remain checked
curryN(2, sum)(1)('wrong');
// @ts-expect-error callback input must be number rather than any
curryN(2, (format: (value: number) => string, value: number) => format(value))((n) => n.toUpperCase());
function needsReceiver(this: { value: number }, extra: number) {
  return this.value + extra;
}
// @ts-expect-error bind an explicit receiver before currying
curryN(1, needsReceiver);
export const bound = curryN(1, needsReceiver.bind({ value: 1 }))(2);
export type Bound = Expect<Equal<typeof bound, number>>;
