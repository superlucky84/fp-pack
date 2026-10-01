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
