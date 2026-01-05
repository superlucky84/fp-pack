import SideEffect, { runPipeResult } from './sideEffect';
import from from './from';
import pipe from './pipe';
import pipeSideEffect from './pipeSideEffect';
import pipeSideEffectStrict from './pipeSideEffectStrict';
import pipeAsync from '../async/pipeAsync';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import pipeAsyncSideEffectStrict from '../async/pipeAsyncSideEffectStrict';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;
type EffectUnion<T> = Extract<T, SideEffect<any>> extends SideEffect<infer E> ? E : never;
type ValueUnion<T> = Exclude<T, SideEffect<any>>;

export const sideEffectInput = SideEffect.of(() => 0);

export const purePipe = pipe(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => `n:${value}`
);

type PurePipeExpected = (input: number) => string;
export type PipePureIsStrict = Expect<Equal<typeof purePipe, PurePipeExpected>>;

export const purePipeSix = pipe(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => `${value}`,
  (value) => value.length,
  (value) => value + 1,
  (value) => `n:${value}`
);

type PurePipeSixExpected = (input: number) => string;
export type PipePureSixIsStrict = Expect<Equal<typeof purePipeSix, PurePipeSixExpected>>;

export const purePipeTen = pipe(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => `v:${value}`,
  (value) => value.toUpperCase(),
  (value) => value.length,
  (value) => value + 1,
  (value) => `${value}`,
  (value) => value.padStart(3, '0'),
  (value) => value.length,
  (value) => `n:${value}`
);

type PurePipeTenExpected = (input: number) => string;
export type PipePureTenIsStrict = Expect<Equal<typeof purePipeTen, PurePipeTenExpected>>;

export const pipeFromTen = pipe(
  from(1),
  (value) => value + 1,
  (value) => value * 2,
  (value) => `${value}`,
  (value) => value.padStart(3, '0'),
  (value) => value.length,
  (value) => value + 1,
  (value) => `${value}`,
  (value) => value.padStart(4, '0'),
  (value) => `n:${value}`
);

export const pipeFromTenValue = pipeFromTen('input');

type PipeFromTenValueExpected = string;
export type PipeFromTenValueIsStrict = Expect<Equal<typeof pipeFromTenValue, PipeFromTenValueExpected>>;

export const pipeFromTenValueNoInput = pipeFromTen();

type PipeFromTenValueNoInputExpected = string;
export type PipeFromTenValueNoInputIsStrict = Expect<
  Equal<typeof pipeFromTenValueNoInput, PipeFromTenValueNoInputExpected>
>;

export const pipeWithSideEffectInput = pipeSideEffect(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => `n:${value}`
);

export const pipeWithSideEffectValue = pipeWithSideEffectInput(sideEffectInput);

type PipeExpected = (input: number | SideEffect<any>) => string | SideEffect<any>;
export type PipeAcceptsSideEffectInput = Expect<Equal<typeof pipeWithSideEffectInput, PipeExpected>>;

export const pipeSideEffectSix = pipeSideEffect(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => value + 3,
  (value) => value - 1,
  (value) => value * 2,
  (value) => `n:${value}`
);

type PipeSideEffectSixExpected = (input: number | SideEffect<any>) => string | SideEffect<any>;
export type PipeSideEffectSixIsStrict = Expect<Equal<typeof pipeSideEffectSix, PipeSideEffectSixExpected>>;

export const pipeSideEffectTen = pipeSideEffect(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => `v:${value}`,
  (value) => value.toUpperCase(),
  (value) => value.length,
  (value) => value + 1,
  (value) => `${value}`,
  (value) => value.padStart(3, '0'),
  (value) => value.length,
  (value) => `n:${value}`
);

type PipeSideEffectTenExpected = (input: number | SideEffect<any>) => string | SideEffect<any>;
export type PipeSideEffectTenIsStrict = Expect<Equal<typeof pipeSideEffectTen, PipeSideEffectTenExpected>>;

export const pipeSideEffectFromTen = pipeSideEffect(
  from(1),
  (value) => value + 1,
  (value) => value * 2,
  (value) => `${value}`,
  (value) => value.padStart(3, '0'),
  (value) => value.length,
  (value) => value + 1,
  (value) => `${value}`,
  (value) => value.padStart(4, '0'),
  (value) => `n:${value}`
);

export const pipeSideEffectFromTenValue = pipeSideEffectFromTen('input');

type PipeSideEffectFromTenValueExpected = string | SideEffect<any>;
export type PipeSideEffectFromTenValueIsStrict = Expect<
  Equal<typeof pipeSideEffectFromTenValue, PipeSideEffectFromTenValueExpected>
>;

export const pipeSideEffectFromTenValueNoInput = pipeSideEffectFromTen();

type PipeSideEffectFromTenValueNoInputExpected = string | SideEffect<any>;
export type PipeSideEffectFromTenValueNoInputIsStrict = Expect<
  Equal<typeof pipeSideEffectFromTenValueNoInput, PipeSideEffectFromTenValueNoInputExpected>
>;

export const purePipeAsync = pipeAsync(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => `n:${value}`
);

type PurePipeAsyncExpected = (input: number) => Promise<string>;
export type PipeAsyncPureIsStrict = Expect<Equal<typeof purePipeAsync, PurePipeAsyncExpected>>;

export const purePipeAsyncSix = pipeAsync(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => `${value}`,
  async (value) => value.length,
  (value) => value + 3,
  async (value) => `n:${value}`
);

type PurePipeAsyncSixExpected = (input: number) => Promise<string>;
export type PipeAsyncPureSixIsStrict = Expect<Equal<typeof purePipeAsyncSix, PurePipeAsyncSixExpected>>;

export const purePipeAsyncTen = pipeAsync(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => `${value}`,
  async (value) => value.length,
  (value) => value + 3,
  async (value) => value * 2,
  (value) => `${value}`,
  async (value) => value.length,
  (value) => value + 1,
  async (value) => `n:${value}`
);

type PurePipeAsyncTenExpected = (input: number) => Promise<string>;
export type PipeAsyncPureTenIsStrict = Expect<Equal<typeof purePipeAsyncTen, PurePipeAsyncTenExpected>>;

export const pipeAsyncFromTen = pipeAsync(
  from(1),
  async (value) => value + 1,
  (value) => value * 2,
  async (value) => `${value}`,
  (value) => value.padStart(3, '0'),
  async (value) => value.length,
  (value) => value + 1,
  async (value) => `${value}`,
  (value) => value.padStart(4, '0'),
  async (value) => `n:${value}`
);

export const pipeAsyncFromTenValue = pipeAsyncFromTen('input');

type PipeAsyncFromTenValueExpected = Promise<string>;
export type PipeAsyncFromTenValueIsStrict = Expect<
  Equal<typeof pipeAsyncFromTenValue, PipeAsyncFromTenValueExpected>
>;

export const pipeAsyncFromTenValueNoInput = pipeAsyncFromTen();

type PipeAsyncFromTenValueNoInputExpected = Promise<string>;
export type PipeAsyncFromTenValueNoInputIsStrict = Expect<
  Equal<typeof pipeAsyncFromTenValueNoInput, PipeAsyncFromTenValueNoInputExpected>
>;

export const pipeAsyncWithSideEffectInput = pipeAsyncSideEffect(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => `n:${value}`
);

export const pipeAsyncWithSideEffectValue = pipeAsyncWithSideEffectInput(sideEffectInput);

type PipeAsyncExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncAcceptsSideEffectInput = Expect<
  Equal<typeof pipeAsyncWithSideEffectInput, PipeAsyncExpected>
>;

export const pipeAsyncSideEffectSix = pipeAsyncSideEffect(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => value + 3,
  async (value) => value - 1,
  (value) => value * 2,
  async (value) => `n:${value}`
);

type PipeAsyncSideEffectSixExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectSixIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectSix, PipeAsyncSideEffectSixExpected>
>;

export const pipeAsyncSideEffectTen = pipeAsyncSideEffect(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => `${value}`,
  async (value) => value.length,
  (value) => value + 3,
  async (value) => value * 2,
  (value) => `${value}`,
  async (value) => value.length,
  (value) => value + 1,
  async (value) => `n:${value}`
);

type PipeAsyncSideEffectTenExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectTenIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectTen, PipeAsyncSideEffectTenExpected>
>;

export const pipeAsyncSideEffectFromTen = pipeAsyncSideEffect(
  from(1),
  async (value) => value + 1,
  (value) => value * 2,
  async (value) => `${value}`,
  (value) => value.padStart(3, '0'),
  async (value) => value.length,
  (value) => value + 1,
  async (value) => `${value}`,
  (value) => value.padStart(4, '0'),
  async (value) => `n:${value}`
);

export const pipeAsyncSideEffectFromTenValue = pipeAsyncSideEffectFromTen('input');

type PipeAsyncSideEffectFromTenValueExpected = Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectFromTenValueIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectFromTenValue, PipeAsyncSideEffectFromTenValueExpected>
>;

export const pipeAsyncSideEffectFromTenValueNoInput = pipeAsyncSideEffectFromTen();

type PipeAsyncSideEffectFromTenValueNoInputExpected = Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectFromTenValueNoInputIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectFromTenValueNoInput, PipeAsyncSideEffectFromTenValueNoInputExpected>
>;

export const strictPipeSideEffect = pipeSideEffectStrict(
  (value: number) => value + 1,
  (value) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value) => (value > 2 ? value : SideEffect.of(() => 0 as const))
);

export const strictPipeSideEffectResult = strictPipeSideEffect(1);

type StrictSideEffectEffects = EffectUnion<typeof strictPipeSideEffectResult>;
type StrictSideEffectEffectsExpected = 'LOW' | 0;
export type PipeSideEffectStrictEffects = Expect<Equal<StrictSideEffectEffects, StrictSideEffectEffectsExpected>>;

type StrictSideEffectValue = ValueUnion<typeof strictPipeSideEffectResult>;
type StrictSideEffectValueExpected = number;
export type PipeSideEffectStrictValue = Expect<Equal<StrictSideEffectValue, StrictSideEffectValueExpected>>;

export const strictPipeSideEffectRunResult = runPipeResult(strictPipeSideEffectResult);

type StrictPipeSideEffectRunExpected =
  | ValueUnion<typeof strictPipeSideEffectResult>
  | EffectUnion<typeof strictPipeSideEffectResult>;
export type PipeSideEffectStrictRunPipeResultIsStrict = Expect<
  Equal<typeof strictPipeSideEffectRunResult, StrictPipeSideEffectRunExpected>
>;

export const strictPipeSideEffectInput = strictPipeSideEffect(SideEffect.of(() => 'INPUT' as const));

type StrictSideEffectInputEffects = EffectUnion<typeof strictPipeSideEffectInput>;
type StrictSideEffectInputEffectsExpected = 'LOW' | 0 | 'INPUT';
export type PipeSideEffectStrictInputEffects = Expect<
  Equal<StrictSideEffectInputEffects, StrictSideEffectInputEffectsExpected>
>;

export const strictPipeSideEffectSix = pipeSideEffectStrict(
  (value: number) => value + 1,
  (value) => (value > 2 ? value : SideEffect.of(() => 'LOW' as const)),
  (value) => value + 1,
  (value) => (value > 10 ? value : SideEffect.of(() => 'SMALL' as const)),
  (value) => value * 2,
  (value) => (value > 40 ? value : SideEffect.of(() => 0 as const))
);

export const strictPipeSideEffectSixResult = strictPipeSideEffectSix(1);

type StrictSixEffects = EffectUnion<typeof strictPipeSideEffectSixResult>;
type StrictSixEffectsExpected = 'LOW' | 'SMALL' | 0;
export type PipeSideEffectStrictSixEffects = Expect<Equal<StrictSixEffects, StrictSixEffectsExpected>>;

type StrictSixValue = ValueUnion<typeof strictPipeSideEffectSixResult>;
type StrictSixValueExpected = number;
export type PipeSideEffectStrictSixValue = Expect<Equal<StrictSixValue, StrictSixValueExpected>>;

export const strictPipeSideEffectTen = pipeSideEffectStrict(
  (value: number) => value + 1,
  (value) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value) => value + 1,
  (value) => (value > 3 ? value : SideEffect.of(() => 'MID' as const)),
  (value) => value * 2,
  (value) => value + 1,
  (value) => (value > 10 ? value : SideEffect.of(() => 0 as const)),
  (value) => value + 1,
  (value) => value * 2,
  (value) => value + 1
);

export const strictPipeSideEffectTenResult = strictPipeSideEffectTen(1);

type StrictTenEffects = EffectUnion<typeof strictPipeSideEffectTenResult>;
type StrictTenEffectsExpected = 'LOW' | 'MID' | 0;
export type PipeSideEffectStrictTenEffects = Expect<Equal<StrictTenEffects, StrictTenEffectsExpected>>;

type StrictTenValue = ValueUnion<typeof strictPipeSideEffectTenResult>;
type StrictTenValueExpected = number;
export type PipeSideEffectStrictTenValue = Expect<Equal<StrictTenValue, StrictTenValueExpected>>;

export const strictPipeSideEffectFromTen = pipeSideEffectStrict(
  from(1),
  (value) => value + 1,
  (value) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value) => value * 2,
  (value) => (value > 4 ? value : SideEffect.of(() => 'MID' as const)),
  (value) => value + 1,
  (value) => value * 2,
  (value) => (value > 20 ? value : SideEffect.of(() => 0 as const)),
  (value) => value + 1,
  (value) => value * 2
);

export const strictPipeSideEffectFromTenResult = strictPipeSideEffectFromTen('input');

type StrictFromTenEffects = EffectUnion<typeof strictPipeSideEffectFromTenResult>;
type StrictFromTenEffectsExpected = 'LOW' | 'MID' | 0;
export type PipeSideEffectStrictFromTenEffects = Expect<
  Equal<StrictFromTenEffects, StrictFromTenEffectsExpected>
>;

type StrictFromTenValue = ValueUnion<typeof strictPipeSideEffectFromTenResult>;
type StrictFromTenValueExpected = number;
export type PipeSideEffectStrictFromTenValue = Expect<Equal<StrictFromTenValue, StrictFromTenValueExpected>>;

export const strictPipeSideEffectFromTenResultNoInput = strictPipeSideEffectFromTen();

type StrictFromTenNoInputEffects = EffectUnion<typeof strictPipeSideEffectFromTenResultNoInput>;
type StrictFromTenNoInputEffectsExpected = 'LOW' | 'MID' | 0;
export type PipeSideEffectStrictFromTenNoInputEffects = Expect<
  Equal<StrictFromTenNoInputEffects, StrictFromTenNoInputEffectsExpected>
>;

type StrictFromTenNoInputValue = ValueUnion<typeof strictPipeSideEffectFromTenResultNoInput>;
type StrictFromTenNoInputValueExpected = number;
export type PipeSideEffectStrictFromTenNoInputValue = Expect<
  Equal<StrictFromTenNoInputValue, StrictFromTenNoInputValueExpected>
>;

export const strictPipeAsyncSideEffect = pipeAsyncSideEffectStrict(
  (value: number) => value + 1,
  async (value) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value) => (value > 2 ? value : SideEffect.of(() => 0 as const))
);

export const strictPipeAsyncSideEffectResult = strictPipeAsyncSideEffect(1);

type StrictPipeAsyncResolved = Awaited<typeof strictPipeAsyncSideEffectResult>;
type StrictPipeAsyncEffects = EffectUnion<StrictPipeAsyncResolved>;
type StrictPipeAsyncEffectsExpected = 'LOW' | 0;
export type PipeAsyncSideEffectStrictEffects = Expect<
  Equal<StrictPipeAsyncEffects, StrictPipeAsyncEffectsExpected>
>;

type StrictPipeAsyncValue = ValueUnion<StrictPipeAsyncResolved>;
type StrictPipeAsyncValueExpected = number;
export type PipeAsyncSideEffectStrictValue = Expect<
  Equal<StrictPipeAsyncValue, StrictPipeAsyncValueExpected>
>;

export const strictPipeAsyncSideEffectSix = pipeAsyncSideEffectStrict(
  (value: number) => value + 1,
  async (value) => (value > 2 ? value : SideEffect.of(() => 'LOW' as const)),
  (value) => value + 1,
  async (value) => (value > 10 ? value : SideEffect.of(() => 'SMALL' as const)),
  (value) => value * 2,
  async (value) => (value > 40 ? value : SideEffect.of(() => 0 as const))
);

export const strictPipeAsyncSideEffectSixResult = strictPipeAsyncSideEffectSix(1);

type StrictAsyncSixResolved = Awaited<typeof strictPipeAsyncSideEffectSixResult>;
type StrictAsyncSixEffects = EffectUnion<StrictAsyncSixResolved>;
type StrictAsyncSixEffectsExpected = 'LOW' | 'SMALL' | 0;
export type PipeAsyncSideEffectStrictSixEffects = Expect<
  Equal<StrictAsyncSixEffects, StrictAsyncSixEffectsExpected>
>;

type StrictAsyncSixValue = ValueUnion<StrictAsyncSixResolved>;
type StrictAsyncSixValueExpected = number;
export type PipeAsyncSideEffectStrictSixValue = Expect<
  Equal<StrictAsyncSixValue, StrictAsyncSixValueExpected>
>;

export const strictPipeAsyncSideEffectTen = pipeAsyncSideEffectStrict(
  (value: number) => value + 1,
  async (value) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value) => value + 1,
  async (value) => (value > 3 ? value : SideEffect.of(() => 'MID' as const)),
  (value) => value * 2,
  async (value) => value + 1,
  (value) => (value > 10 ? value : SideEffect.of(() => 0 as const)),
  async (value) => value + 1,
  (value) => value * 2,
  async (value) => value + 1
);

export const strictPipeAsyncSideEffectTenResult = strictPipeAsyncSideEffectTen(1);

type StrictAsyncTenResolved = Awaited<typeof strictPipeAsyncSideEffectTenResult>;
type StrictAsyncTenEffects = EffectUnion<StrictAsyncTenResolved>;
type StrictAsyncTenEffectsExpected = 'LOW' | 'MID' | 0;
export type PipeAsyncSideEffectStrictTenEffects = Expect<
  Equal<StrictAsyncTenEffects, StrictAsyncTenEffectsExpected>
>;

type StrictAsyncTenValue = ValueUnion<StrictAsyncTenResolved>;
type StrictAsyncTenValueExpected = number;
export type PipeAsyncSideEffectStrictTenValue = Expect<
  Equal<StrictAsyncTenValue, StrictAsyncTenValueExpected>
>;

export const strictPipeAsyncSideEffectFromTen = pipeAsyncSideEffectStrict(
  from(1),
  async (value) => value + 1,
  (value) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  async (value) => value * 2,
  (value) => (value > 4 ? value : SideEffect.of(() => 'MID' as const)),
  async (value) => value + 1,
  (value) => value * 2,
  async (value) => (value > 20 ? value : SideEffect.of(() => 0 as const)),
  (value) => value + 1,
  async (value) => value * 2
);

export const strictPipeAsyncSideEffectFromTenResult = strictPipeAsyncSideEffectFromTen('input');

type StrictAsyncFromTenResolved = Awaited<typeof strictPipeAsyncSideEffectFromTenResult>;
type StrictAsyncFromTenEffects = EffectUnion<StrictAsyncFromTenResolved>;
type StrictAsyncFromTenEffectsExpected = 'LOW' | 'MID' | 0;
export type PipeAsyncSideEffectStrictFromTenEffects = Expect<
  Equal<StrictAsyncFromTenEffects, StrictAsyncFromTenEffectsExpected>
>;

type StrictAsyncFromTenValue = ValueUnion<StrictAsyncFromTenResolved>;
type StrictAsyncFromTenValueExpected = number;
export type PipeAsyncSideEffectStrictFromTenValue = Expect<
  Equal<StrictAsyncFromTenValue, StrictAsyncFromTenValueExpected>
>;

export const strictPipeAsyncSideEffectFromTenResultNoInput = strictPipeAsyncSideEffectFromTen();

type StrictAsyncFromTenNoInputResolved = Awaited<typeof strictPipeAsyncSideEffectFromTenResultNoInput>;
type StrictAsyncFromTenNoInputEffects = EffectUnion<StrictAsyncFromTenNoInputResolved>;
type StrictAsyncFromTenNoInputEffectsExpected = 'LOW' | 'MID' | 0;
export type PipeAsyncSideEffectStrictFromTenNoInputEffects = Expect<
  Equal<StrictAsyncFromTenNoInputEffects, StrictAsyncFromTenNoInputEffectsExpected>
>;

type StrictAsyncFromTenNoInputValue = ValueUnion<StrictAsyncFromTenNoInputResolved>;
type StrictAsyncFromTenNoInputValueExpected = number;
export type PipeAsyncSideEffectStrictFromTenNoInputValue = Expect<
  Equal<StrictAsyncFromTenNoInputValue, StrictAsyncFromTenNoInputValueExpected>
>;
