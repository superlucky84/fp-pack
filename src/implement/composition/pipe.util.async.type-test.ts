import SideEffect from './sideEffect';
import pipe from './pipe';
import pipeHint from './pipeHint';
import pipeSideEffect from './pipeSideEffect';
import pipeSideEffectStrict from './pipeSideEffectStrict';
import pipeAsync from '../async/pipeAsync';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import pipeAsyncSideEffectStrict from '../async/pipeAsyncSideEffectStrict';
import retry from '../async/retry';
import timeout from '../async/timeout';
import debounce from '../async/debounce';
import throttle from '../async/throttle';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;
type EffectUnion<T> = Extract<T, SideEffect<any>> extends SideEffect<infer E> ? E : never;
type ValueUnion<T> = Exclude<T, SideEffect<any>>;

const toUpper = (value: string) => value.toUpperCase();
const toLength = (value: string) => value.length;
type Audit = { id: number; label: string; active?: boolean };
type AuditFn = (id: number, label: string, active?: boolean) => Audit;
type LabeledThis = { tag: string };
type ThisFn = (this: LabeledThis, value: number) => string;

const auditFn: AuditFn = (id, label, active) => ({ id, label, active });
const thisFn: ThisFn = function (this: LabeledThis, value: number) {
  return `${this.tag}:${value}`;
};

export const pipeDebounce = pipe(
  debounce(toUpper),
  (fn: (value: string) => string) => fn
);

type PipeDebounceExpected = (input: number) => (value: string) => string;
export type PipeDebounceIsStrict = Expect<Equal<typeof pipeDebounce, PipeDebounceExpected>>;

export const debounceDirect = debounce(auditFn, 50);
export type DebounceDirectIsStrict = Expect<Equal<typeof debounceDirect, AuditFn>>;

export const debounceCurried = debounce(auditFn);
type DebounceCurriedExpected = (ms: number) => AuditFn;
export type DebounceCurriedIsStrict = Expect<Equal<typeof debounceCurried, DebounceCurriedExpected>>;

export const debounceCurriedApplied = debounceCurried(50);
export type DebounceCurriedParamsIsStrict = Expect<
  Equal<Parameters<typeof debounceCurriedApplied>, Parameters<AuditFn>>
>;
export type DebounceCurriedReturnIsStrict = Expect<
  Equal<ReturnType<typeof debounceCurriedApplied>, ReturnType<AuditFn>>
>;

export const debounceThisDirect = debounce(thisFn, 25);
export type DebounceThisIsStrict = Expect<
  Equal<ThisParameterType<typeof debounceThisDirect>, ThisParameterType<ThisFn>>
>;

export const pipeThrottle = pipe(
  throttle(toLength),
  (fn: (value: string) => number) => fn
);

type PipeThrottleExpected = (input: number) => (value: string) => number;
export type PipeThrottleIsStrict = Expect<Equal<typeof pipeThrottle, PipeThrottleExpected>>;

export const throttleDirect = throttle(auditFn, 60);
export type ThrottleDirectIsStrict = Expect<Equal<typeof throttleDirect, AuditFn>>;

export const throttleCurried = throttle(auditFn);
type ThrottleCurriedExpected = (ms: number) => AuditFn;
export type ThrottleCurriedIsStrict = Expect<Equal<typeof throttleCurried, ThrottleCurriedExpected>>;

export const throttleCurriedApplied = throttleCurried(60);
export type ThrottleCurriedParamsIsStrict = Expect<
  Equal<Parameters<typeof throttleCurriedApplied>, Parameters<AuditFn>>
>;
export type ThrottleCurriedReturnIsStrict = Expect<
  Equal<ReturnType<typeof throttleCurriedApplied>, ReturnType<AuditFn>>
>;

export const throttleThisDirect = throttle(thisFn, 30);
export type ThrottleThisIsStrict = Expect<
  Equal<ThisParameterType<typeof throttleThisDirect>, ThisParameterType<ThisFn>>
>;

export const pipeSideEffectDebounce = pipeSideEffect(
  debounce(toUpper),
  (fn: (value: string) => string) => (fn.length > 0 ? fn : SideEffect.of(() => 'NO_FN' as const))
);

type PipeSideEffectDebounceExpected = (input: number | SideEffect<any>) => ((value: string) => string) | SideEffect<any>;
export type PipeSideEffectDebounceIsStrict = Expect<
  Equal<typeof pipeSideEffectDebounce, PipeSideEffectDebounceExpected>
>;

export const pipeSideEffectStrictThrottle = pipeSideEffectStrict(
  throttle(toLength),
  (fn: (value: string) => number) => (fn.length > 0 ? fn : SideEffect.of(() => 'NO_FN' as const))
);

export const pipeSideEffectStrictThrottleResult = pipeSideEffectStrictThrottle(100);

type PipeSideEffectStrictThrottleResultExpected = ((value: string) => number) | SideEffect<'NO_FN'>;
export type PipeSideEffectStrictThrottleResultIsStrict = Expect<
  Equal<typeof pipeSideEffectStrictThrottleResult, PipeSideEffectStrictThrottleResultExpected>
>;

type PipeSideEffectStrictThrottleEffects = EffectUnion<typeof pipeSideEffectStrictThrottleResult>;
export type PipeSideEffectStrictThrottleEffectsIsStrict = Expect<
  Equal<PipeSideEffectStrictThrottleEffects, 'NO_FN'>
>;

type PipeSideEffectStrictThrottleValue = ValueUnion<typeof pipeSideEffectStrictThrottleResult>;
export type PipeSideEffectStrictThrottleValueIsStrict = Expect<
  Equal<PipeSideEffectStrictThrottleValue, (value: string) => number>
>;

export const pipeAsyncRetry = pipeAsync(
  pipeHint<() => Promise<number>, Promise<number>>(retry(2)),
  async (value: number) => value + 1,
  (value: number) => `${value}`
);

type PipeAsyncRetryExpected = (input: () => Promise<number>) => Promise<string>;
export type PipeAsyncRetryIsStrict = Expect<Equal<typeof pipeAsyncRetry, PipeAsyncRetryExpected>>;

export const pipeAsyncTimeout = pipeAsync(
  pipeHint<Promise<number>, Promise<number>>(timeout(100)),
  async (value: number) => value + 1
);

type PipeAsyncTimeoutExpected = (input: Promise<number>) => Promise<number>;
export type PipeAsyncTimeoutIsStrict = Expect<Equal<typeof pipeAsyncTimeout, PipeAsyncTimeoutExpected>>;

export const pipeAsyncSideEffectTimeout = pipeAsyncSideEffect(
  pipeHint<Promise<number>, Promise<number>>(timeout(200)),
  async (value: number) => (value > 0 ? value : SideEffect.of(() => 'NON_POSITIVE' as const))
);

type PipeAsyncSideEffectTimeoutExpected = (input: Promise<number> | SideEffect<any>) => Promise<number | SideEffect<any>>;
export type PipeAsyncSideEffectTimeoutIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectTimeout, PipeAsyncSideEffectTimeoutExpected>
>;

export const pipeAsyncSideEffectStrictRetry = pipeAsyncSideEffectStrict(
  pipeHint<() => Promise<number>, Promise<number>>(retry(1)),
  async (value: number) => (value > 0 ? value : SideEffect.of(() => 'RETRY_FAILED' as const))
);

export const pipeAsyncSideEffectStrictRetryResult = pipeAsyncSideEffectStrictRetry(async () => 1);

type PipeAsyncSideEffectStrictRetryResultExpected = Promise<number | SideEffect<'RETRY_FAILED'>>;
export type PipeAsyncSideEffectStrictRetryResultIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectStrictRetryResult, PipeAsyncSideEffectStrictRetryResultExpected>
>;

type PipeAsyncSideEffectStrictRetryResolved = Awaited<typeof pipeAsyncSideEffectStrictRetryResult>;
type PipeAsyncSideEffectStrictRetryEffects = EffectUnion<PipeAsyncSideEffectStrictRetryResolved>;
export type PipeAsyncSideEffectStrictRetryEffectsIsStrict = Expect<
  Equal<PipeAsyncSideEffectStrictRetryEffects, 'RETRY_FAILED'>
>;

type PipeAsyncSideEffectStrictRetryValue = ValueUnion<PipeAsyncSideEffectStrictRetryResolved>;
export type PipeAsyncSideEffectStrictRetryValueIsStrict = Expect<
  Equal<PipeAsyncSideEffectStrictRetryValue, number>
>;
