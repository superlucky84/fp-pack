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

// A required parameter after a default still needs its original slot.
const afterDefault = (count = 1, label: string) => label.repeat(count);
export const requiredAfterDefault = curryN(2, afterDefault)(undefined)('x');
export type RequiredAfterDefault = Expect<Equal<typeof requiredAfterDefault, string>>;
// @ts-expect-error count 1 cannot omit the required label
curryN(1, afterDefault);
// @ts-expect-error nonfunctions do not acquire a callable public signature
curryN(0, {});

declare const literalFunction: (value: number) => 'OK' | 'ERR';
export const literalResult = curryN(1, literalFunction)(2);
export type LiteralResult = Expect<Equal<typeof literalResult, 'OK' | 'ERR'>>;
declare const genericFunction: <T>(value: T) => T;
export const genericResult = curryN(1, genericFunction)(2);
export type GenericResult = Expect<Equal<typeof genericResult, unknown>>;

declare const unionCount: 1 | 2;
export const unionCountResult = curryN(unionCount, add)(2);
export type UnionCountResult = Expect<Equal<typeof unionCountResult, number | CurriedN<(b?: number) => number, 1>>>;
export const completedUnionCount = curryN(unionCount, add)(2, 3);
export type CompletedUnionCount = Expect<Equal<typeof completedUnionCount, number>>;
declare const invalidUnionCount: 1 | 3;
// @ts-expect-error all possible counts must be valid for the source function
curryN(invalidUnionCount, add);
declare const unionFunction: ((a: number, b?: number) => number) | ((a: number, b?: number) => string);
export const unionFunctionResult = curryN(1, unionFunction)(2);
export type UnionFunctionResult = Expect<Equal<typeof unionFunctionResult, number | string>>;
declare const finiteOrRest: ((a: number, b?: number) => string) | ((...values: number[]) => number);
export const finiteOrRestPartial = curryN(2, finiteOrRest)(1);
export const finiteOrRestResult = finiteOrRestPartial(2);
export type FiniteOrRestResult = Expect<Equal<typeof finiteOrRestResult, number | string>>;
// @ts-expect-error undefined is invalid for the possible numeric rest function
finiteOrRestPartial(undefined);
declare const incompatibleTail: ((a: number, b?: string) => string) | ((...values: number[]) => number);
const incompatibleTailPartial = curryN(2, incompatibleTail)(1);
// @ts-expect-error consuming a shared prefix must preserve every possible remaining signature
incompatibleTailPartial(2);
declare const incompatibleFunctions: ((a: number) => number) | ((a: string) => string);
// @ts-expect-error a union source must be narrowed before using incompatible parameters
curryN(1, incompatibleFunctions)(2);
declare const differingCounts: ((a: number) => number) | ((a: number, b: number) => number);
// @ts-expect-error count 1 is invalid for one possible function
curryN(1, differingCounts);

declare const pair: readonly [number, number];
export const tupleSpread = curryN(2, sum)(...pair);
export type TupleSpread = Expect<Equal<typeof tupleSpread, number>>;
export const zeroRest = curryN(0, sum)(...values);
export type ZeroRest = Expect<Equal<typeof zeroRest, number>>;
export const partialThroughEmpty = curryN(2, add)(1)();
export const reusedEmptyPartial = partialThroughEmpty(2);
export type ReusedEmptyPartial = Expect<Equal<typeof reusedEmptyPartial, number>>;
declare const readonlyValues: readonly number[];
export const readonlyParameter = curryN(
  2,
  (prefix: string, data: readonly number[]) => prefix + data.join(',')
)('values:')(readonlyValues);
export type ReadonlyParameter = Expect<Equal<typeof readonlyParameter, string>>;

export const atLimit = curryN(32, sum)(
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31
);
export const completedLimit = atLimit(32);
export type CompletedLimit = Expect<Equal<typeof completedLimit, number>>;
// @ts-expect-error rest values after the threshold remain checked
atLimit(32, 'wrong');

declare const receiverUnion: ((value: number) => number) | ((this: { value: number }, extra: number) => number);
// @ts-expect-error one possible function still requires binding its receiver
curryN(1, receiverUnion);
