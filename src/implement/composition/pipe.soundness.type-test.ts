import SideEffect from './sideEffect';
import pipe from './pipe';
import pipeStrict from './pipeStrict';
import pipeSideEffect from './pipeSideEffect';
import pipeSideEffectStrict from './pipeSideEffectStrict';
import pipeAsync from '../async/pipeAsync';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import tap from './tap';
import identity from './identity';
import map from '../array/map';
import filter from '../array/filter';
import prop from '../object/prop';
import streamFilter from '../../stream/filter';
import streamZip from '../../stream/zip';
import streamMap from '../../stream/map';
import streamToArray from '../../stream/toArray';

// Regression suite for issue #5: every step-to-step mismatch must be a compile error,
// and none may silently resolve to `never` / `any` through a fallback overload.

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;

const numId = (id: number) => id;
const strId = (s: string) => s;
const numToStr = (n: number) => `${n}`;
const strLen = (s: string) => s.length;
const toLow = (n: number) => (n > 0 ? n : SideEffect.of(() => 'LOW' as const));

// --- mismatches (issue #5 shapes) ---

// @ts-expect-error predefined mismatch (issue #5)
pipe(1, numId, strId);
// @ts-expect-error annotated inline mismatch
pipe(1, numId, (s: string) => s.toLowerCase());
// @ts-expect-error function-first mismatch
pipe(numId, strId);
// @ts-expect-error wider union input into a narrower first step
pipe(1 as number | string, numId, numToStr);
// @ts-expect-error mismatch inside an 11+ step pipeline
pipe(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, strId);
// @ts-expect-error async mismatch
pipeAsync(1, async (id: number) => id, strId);
// @ts-expect-error async function-first mismatch
pipeAsync(numId, strId);
// @ts-expect-error SideEffect mismatch (issue #5 original report)
pipeSideEffect(1, numId, strId);
// @ts-expect-error SideEffect mismatch after a step that may short-circuit
pipeSideEffect(1, toLow, strId);
// @ts-expect-error async SideEffect mismatch
pipeAsyncSideEffect(1, numId, strId);
// @ts-expect-error deprecated aliases keep the same checks
pipeStrict(1, numId, strId);
// @ts-expect-error deprecated aliases keep the same checks
pipeSideEffectStrict(1, numId, strId);

// --- inference must be unaffected ---

export const inlineChain = pipe(1, (x) => x + 1, (x) => `${x}`, (s) => s.length);
export type InlineChainIsStrict = Expect<Equal<typeof inlineChain, number>>;

export const inlineToPredefined = pipe(1, (x) => x.toString(), strLen);
export type InlineToPredefinedIsStrict = Expect<Equal<typeof inlineToPredefined, number>>;

export const predefinedToInline = pipe(1, numToStr, (s) => s.length);
export type PredefinedToInlineIsStrict = Expect<Equal<typeof predefinedToInline, number>>;

// Was `never` before 0.15.0: the first step's parameter type no longer drives inference of the input.
export const subtypeInput = pipe({ a: 1, b: 2 }, (o: { a: number }) => o.a);
export type SubtypeInputIsStrict = Expect<Equal<typeof subtypeInput, number>>;

export const curriedUtils = pipe([1, 2, 3], map((x: number) => x * 2), filter((x) => x > 2));
export type CurriedUtilsIsStrict = Expect<Equal<typeof curriedUtils, number[]>>;

export const genericSteps = pipe({ a: 1 }, prop('a'), identity);
export type GenericStepsIsStrict = Expect<Equal<typeof genericSteps, number | undefined>>;

export const functionFirstInline = pipe(numToStr, (s) => s.length);
export type FunctionFirstInlineIsStrict = Expect<Equal<typeof functionFirstInline, (a: number) => number>>;

type State = { todos: number[] };
const state: State = { todos: [] };
// A generic first step must not leak `NoInfer<State>` into the hover.
export const genericFirstStep = pipe(state, tap((s) => s.todos.length));
export type GenericFirstStepIsStrict = Expect<Equal<typeof genericFirstStep, State>>;

// --- SideEffect precision ---

export const effectFree = pipeSideEffect(1, numId, numToStr);
export type EffectFreeIsPlain = Expect<Equal<typeof effectFree, string>>;

export const withEffect = pipeSideEffect(1, toLow, numToStr);
export type WithEffectIsPrecise = Expect<Equal<typeof withEffect, string | SideEffect<'LOW'>>>;

// --- function-first pipelines with inline lambdas inside generic helpers ---
// Before 0.15.0 these only compiled because a catch-all overload returned `(input: any) => any`.

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;

export const tapInFunctionFirst = pipe(double, tap((x) => x.toFixed()), addTen, tap((x) => x.toFixed()));
export type TapInFunctionFirstIsStrict = Expect<Equal<typeof tapInFunctionFirst, (a: number) => number>>;

export const curriedThenTap = pipe(filter((n: number) => n > 0), tap((xs) => xs.length));
export type CurriedThenTapIsStrict = Expect<Equal<typeof curriedThenTap, (a: number[]) => number[]>>;

export const asyncTapInFunctionFirst = pipeAsync(async (n: number) => n * 2, tap((x) => x.toFixed()));
export type AsyncTapInFunctionFirstIsStrict = Expect<
  Equal<typeof asyncTapInFunctionFirst, (a: number) => Promise<number>>
>;

export const effectTapInFunctionFirst = pipeSideEffect(toLow, tap((x) => x.toFixed()));
export const effectTapValue = effectTapInFunctionFirst(1);
export type EffectTapValueIsPrecise = Expect<Equal<typeof effectTapValue, number | SideEffect<'LOW'>>>;

// --- data-first and function-first share one signature per arity ---
// With separate overload groups, whichever group TS tried first fixed the parameter types of
// lambdas nested in generic helpers for the other style (e.g. `filter(([event]) => ...)` below).

function* clickEvents() {
  yield { type: 'click', target: 'button' };
}
function* timestamps() {
  yield 1;
}
export const destructuredInStream = pipe(
  streamZip(timestamps(), clickEvents()),
  streamFilter(([event]) => event.type === 'click'),
  streamMap(([event, time]) => ({ target: event.target, time })),
  streamToArray
);
export type DestructuredInStreamIsStrict = Expect<
  Equal<typeof destructuredInStream, Promise<{ target: string; time: number }[]>>
>;

// `any` input is data, not a function-first step.
declare const anyInput: any;
export const anyData = pipe(anyInput, (value) => value.length as number);
export type AnyDataIsStrict = Expect<Equal<typeof anyData, number>>;
