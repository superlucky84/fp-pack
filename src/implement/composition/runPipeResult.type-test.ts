import SideEffect, { isSideEffect, matchSideEffect, runPipeResult } from './sideEffect';
import pipeSideEffect from './pipeSideEffect';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;
type IsAny<T> = 0 extends (1 & T) ? true : false;
type IsUnknown<T> = unknown extends T ? (T extends unknown ? (IsAny<T> extends true ? false : true) : false) : false;

const divide = (a: number, b: number) =>
  b !== 0 ? a / b : SideEffect.of(() => 'DIVIDE_BY_ZERO');

export const runPipeResultPipeline = pipeSideEffect((x: number) => divide(10, x));

export const runPipeResultValue = runPipeResultPipeline(2);

type RunPipeResultValueExpected = number | SideEffect<any>;
export type RunPipeResultValueIsStrict = Expect<Equal<typeof runPipeResultValue, RunPipeResultValueExpected>>;

export const runPipeResultAny = runPipeResult(runPipeResultValue);
export type RunPipeResultAnyIsAny = Expect<IsAny<typeof runPipeResultAny>>;

export const runPipeResultExplicit = runPipeResult<number, string>(runPipeResultValue);
type RunPipeResultExplicitExpected = number | string;
export type RunPipeResultExplicitIsStrict = Expect<Equal<typeof runPipeResultExplicit, RunPipeResultExplicitExpected>>;

export const runPipeResultEffect = runPipeResult(SideEffect.of(() => 'EFFECT' as const));
type RunPipeResultEffectExpected = 'EFFECT';
export type RunPipeResultEffectIsStrict = Expect<Equal<typeof runPipeResultEffect, RunPipeResultEffectExpected>>;

export const runPipeResultEffectExplicit = runPipeResult<string, null>(SideEffect.of(() => null));
type RunPipeResultEffectExplicitExpected = null;
export type RunPipeResultEffectExplicitIsStrict = Expect<
  Equal<typeof runPipeResultEffectExplicit, RunPipeResultEffectExplicitExpected>
>;

export const runPipeResultPlain = runPipeResult('PLAIN' as const);
type RunPipeResultPlainExpected = 'PLAIN';
export type RunPipeResultPlainIsStrict = Expect<Equal<typeof runPipeResultPlain, RunPipeResultPlainExpected>>;

export const runPipeResultObject = runPipeResult(SideEffect.of(() => ({ ok: true as const })));
type RunPipeResultObjectExpected = { ok: true };
export type RunPipeResultObjectIsStrict = Expect<Equal<typeof runPipeResultObject, RunPipeResultObjectExpected>>;

const unionValue: number | SideEffect<'ERR'> = Math.random() > 0.5 ? 1 : SideEffect.of(() => 'ERR' as const);
export const runPipeResultUnion = runPipeResult(unionValue);
type RunPipeResultUnionExpected = number | 'ERR';
export type RunPipeResultUnionIsStrict = Expect<Equal<typeof runPipeResultUnion, RunPipeResultUnionExpected>>;

export const runPipeResultNull = runPipeResult(SideEffect.of(() => null));
type RunPipeResultNullExpected = null;
export type RunPipeResultNullIsStrict = Expect<Equal<typeof runPipeResultNull, RunPipeResultNullExpected>>;

export const runPipeResultUndefined = runPipeResult(SideEffect.of(() => undefined));
type RunPipeResultUndefinedExpected = undefined;
export type RunPipeResultUndefinedIsStrict = Expect<Equal<typeof runPipeResultUndefined, RunPipeResultUndefinedExpected>>;

export const runPipeResultNullable = runPipeResult<string, string | null>(SideEffect.of(() => null));
type RunPipeResultNullableExpected = string | null;
export type RunPipeResultNullableIsStrict = Expect<
  Equal<typeof runPipeResultNullable, RunPipeResultNullableExpected>
>;

export const runPipeResultExplicitValue = runPipeResult<number, string>(123);
type RunPipeResultExplicitValueExpected = number | string;
export type RunPipeResultExplicitValueIsStrict = Expect<
  Equal<typeof runPipeResultExplicitValue, RunPipeResultExplicitValueExpected>
>;

export const runPipeResultExplicitValueSingle = runPipeResult<number>(123);
type RunPipeResultExplicitValueSingleExpected = number;
export type RunPipeResultExplicitValueSingleIsStrict = Expect<
  Equal<typeof runPipeResultExplicitValueSingle, RunPipeResultExplicitValueSingleExpected>
>;

const assertNumber = (value: number) => value;
const assertSideEffect = (value: SideEffect<any>) => value;
const assertErr = (value: 'ERR') => value;
const assertNullableString = (value: string | null) => value;
const assertNumberOrErr = (value: number | 'ERR') => value;
const assertNumberOrString = (value: number | string) => value;

if (!isSideEffect(runPipeResultValue)) {
  assertNumber(runPipeResultValue);
} else {
  assertSideEffect(runPipeResultValue);
}

const maybeResult: number | SideEffect<'ERR'> = Math.random() > 0.5 ? 1 : SideEffect.of(() => 'ERR' as const);
if (isSideEffect(maybeResult)) {
  const effectValue = runPipeResult(maybeResult);
  assertErr(effectValue);
} else {
  const value = runPipeResult(maybeResult);
  assertNumber(value);
}

const maybeResultExplicit: number | SideEffect<'ERR'> = Math.random() > 0.5 ? 1 : SideEffect.of(() => 'ERR' as const);
if (isSideEffect(maybeResultExplicit)) {
  const effectValue = runPipeResult<number, 'ERR'>(maybeResultExplicit);
  assertErr(effectValue);
} else {
  const value = runPipeResult<number, 'ERR'>(maybeResultExplicit);
  assertNumberOrErr(value);
}

assertNumberOrString(runPipeResultExplicitValue);

const maybeNullable: SideEffect<string | null> = SideEffect.of(() => (Math.random() > 0.5 ? 'OK' : null));
const nullableResult = runPipeResult(maybeNullable);
assertNullableString(nullableResult);

const matchSideEffectWidened: number | SideEffect<any> = Math.random() > 0.5 ? 1 : SideEffect.of(() => 'ERR' as const);
export const matchSideEffectWidenedResult = matchSideEffect(matchSideEffectWidened, {
  value: (value: number) => value + 1,
  effect: (effect) => effect.effect()
});

export type MatchSideEffectWidenedIsUnknown = Expect<IsUnknown<typeof matchSideEffectWidenedResult>>;

export const matchSideEffectExplicitResult = matchSideEffect<number, number, string>(matchSideEffectWidened, {
  value: (value) => value + 1,
  effect: (effect) => effect.effect() as string
});

type MatchSideEffectExplicitExpected = number | string;
export type MatchSideEffectExplicitIsStrict = Expect<
  Equal<typeof matchSideEffectExplicitResult, MatchSideEffectExplicitExpected>
>;
