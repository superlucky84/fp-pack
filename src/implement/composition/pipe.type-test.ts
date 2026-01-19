import SideEffect, { runPipeResult } from './sideEffect';
import from from './from';
import pipe from './pipe';
import pipeStrict from './pipeStrict';
import pipeSideEffect from './pipeSideEffect';
import pipeSideEffectStrict from './pipeSideEffectStrict';
import pipeAsync from '../async/pipeAsync';
import pipeAsyncStrict from '../async/pipeAsyncStrict';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import pipeAsyncSideEffectStrict from '../async/pipeAsyncSideEffectStrict';
import tap from './tap';
import assoc from '../object/assoc';
import map from '../array/map';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;
type EffectUnion<T> = Extract<T, SideEffect<any>> extends SideEffect<infer E> ? E : never;
type ValueUnion<T> = Exclude<T, SideEffect<any>>;

export const sideEffectInput = SideEffect.of(() => 0);

export const purePipe = pipe(
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `n:${value}`
);

type PurePipeExpected = (input: number) => string;
export type PipePureIsStrict = Expect<Equal<typeof purePipe, PurePipeExpected>>;

export const purePipeZero = pipe(() => 3, (value: number) => value + 1);

type PurePipeZeroExpected = () => number;
export type PipePureZeroIsStrict = Expect<Equal<typeof purePipeZero, PurePipeZeroExpected>>;

export const purePipeZeroValue = purePipeZero();

type PurePipeZeroValueExpected = number;
export type PipePureZeroValueIsStrict = Expect<Equal<typeof purePipeZeroValue, PurePipeZeroValueExpected>>;

export const purePipeValue = purePipe(1);

type PurePipeValueExpected = string;
export type PipePureValueIsStrict = Expect<Equal<typeof purePipeValue, PurePipeValueExpected>>;

export const purePipeSix = pipe(
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `${value}`,
  (value: string) => value.length,
  (value: number) => value + 1,
  (value: number) => `n:${value}`
);

type PurePipeSixExpected = (input: number) => string;
export type PipePureSixIsStrict = Expect<Equal<typeof purePipeSix, PurePipeSixExpected>>;

export const purePipeTen = pipe(
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `v:${value}`,
  (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  (value: number) => value + 1,
  (value: number) => `${value}`,
  (value: string) => value.padStart(3, '0'),
  (value: string) => value.length,
  (value: number) => `n:${value}`
);

type PurePipeTenExpected = (input: number) => string;
export type PipePureTenIsStrict = Expect<Equal<typeof purePipeTen, PurePipeTenExpected>>;

export const purePipeEleven = pipe(
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `v:${value}`,
  (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  (value: number) => value + 3,
  (value: number) => value * 2,
  (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  (value: string) => value.length,
  (value: number) => `n:${value}`
);

type PurePipeElevenExpected = (input: number) => string;
export type PipePureElevenIsStrict = Expect<Equal<typeof purePipeEleven, PurePipeElevenExpected>>;

export const purePipeElevenValue = purePipeEleven(1);

type PurePipeElevenValueExpected = string;
export type PipePureElevenValueIsStrict = Expect<
  Equal<typeof purePipeElevenValue, PurePipeElevenValueExpected>
>;

const pipeElevenFnsHinted: [
  (value: number) => number,
  (value: number) => number,
  (value: number) => string,
  (value: string) => string,
  (value: string) => number,
  (value: number) => number,
  (value: number) => number,
  (value: number) => string,
  (value: string) => string,
  (value: string) => number,
  (value: number) => string
] = [
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `v:${value}`,
  (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  (value: number) => value + 3,
  (value: number) => value * 2,
  (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  (value: string) => value.length,
  (value: number) => `n:${value}`
];

export const purePipeElevenValueHinted = pipe<number, typeof pipeElevenFnsHinted>(
  1,
  ...pipeElevenFnsHinted
);

type PurePipeElevenValueHintedExpected = string;
export type PipePureElevenValueHintedIsStrict = Expect<
  Equal<typeof purePipeElevenValueHinted, PurePipeElevenValueHintedExpected>
>;

export const pipeFromTen = pipe(
  from(1),
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `${value}`,
  (value: string) => value.padStart(3, '0'),
  (value: string) => value.length,
  (value: number) => value + 1,
  (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  (value: string) => `n:${value}`
);

export const pipeFromTenValue = pipeFromTen('input');

type PipeFromTenValueExpected = string;
export type PipeFromTenValueIsStrict = Expect<Equal<typeof pipeFromTenValue, PipeFromTenValueExpected>>;

export const pipeFromTenValueNoInput = pipeFromTen();

type PipeFromTenValueNoInputExpected = string;
export type PipeFromTenValueNoInputIsStrict = Expect<
  Equal<typeof pipeFromTenValueNoInput, PipeFromTenValueNoInputExpected>
>;

export const pipeFromNoInput = pipe(from(1));

type PipeFromNoInputExpected = (input?: unknown) => number;
export type PipeFromNoInputIsStrict = Expect<Equal<typeof pipeFromNoInput, PipeFromNoInputExpected>>;

export const pipeFromNoInputValue = pipeFromNoInput();

type PipeFromNoInputValueExpected = number;
export type PipeFromNoInputValueIsStrict = Expect<Equal<typeof pipeFromNoInputValue, PipeFromNoInputValueExpected>>;

export const purePipeStrict = pipeStrict(
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `n:${value}`
);

type PurePipeStrictExpected = (input: number) => string;
export type PipeStrictPureIsStrict = Expect<Equal<typeof purePipeStrict, PurePipeStrictExpected>>;

export const purePipeStrictZero = pipeStrict(() => 3, (value: number) => value + 1);

type PurePipeStrictZeroExpected = () => number;
export type PipeStrictZeroIsStrict = Expect<Equal<typeof purePipeStrictZero, PurePipeStrictZeroExpected>>;

export const purePipeStrictZeroValue = purePipeStrictZero();

type PurePipeStrictZeroValueExpected = number;
export type PipeStrictZeroValueIsStrict = Expect<Equal<typeof purePipeStrictZeroValue, PurePipeStrictZeroValueExpected>>;

export const purePipeStrictValue = pipeStrict(
  1,
  (value: number) => value + 1,
  (value: number) => `n:${value}`
);

type PurePipeStrictValueExpected = string;
export type PipeStrictValueIsStrict = Expect<Equal<typeof purePipeStrictValue, PurePipeStrictValueExpected>>;

export const purePipeStrictEleven = pipeStrict(
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `v:${value}`,
  (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  (value: number) => value + 3,
  (value: number) => value * 2,
  (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  (value: string) => value.length,
  (value: number) => `n:${value}`
);

type PurePipeStrictElevenExpected = (input: number) => string;
export type PipeStrictElevenIsStrict = Expect<
  Equal<typeof purePipeStrictEleven, PurePipeStrictElevenExpected>
>;

export const purePipeStrictElevenValue = purePipeStrictEleven(1);

type PurePipeStrictElevenValueExpected = string;
export type PipeStrictElevenValueIsStrict = Expect<
  Equal<typeof purePipeStrictElevenValue, PurePipeStrictElevenValueExpected>
>;

const pipeStrictElevenFnsHinted: [
  (value: number) => number,
  (value: number) => number,
  (value: number) => string,
  (value: string) => string,
  (value: string) => number,
  (value: number) => number,
  (value: number) => number,
  (value: number) => string,
  (value: string) => string,
  (value: string) => number,
  (value: number) => string
] = [
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `v:${value}`,
  (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  (value: number) => value + 3,
  (value: number) => value * 2,
  (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  (value: string) => value.length,
  (value: number) => `n:${value}`
];

export const purePipeStrictElevenValueHinted = pipeStrict<number, typeof pipeStrictElevenFnsHinted>(
  1,
  ...pipeStrictElevenFnsHinted
);

type PurePipeStrictElevenValueHintedExpected = string;
export type PipeStrictElevenValueHintedIsStrict = Expect<
  Equal<typeof purePipeStrictElevenValueHinted, PurePipeStrictElevenValueHintedExpected>
>;

export const pipeStrictFromTen = pipeStrict(
  from(1),
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `${value}`,
  (value: string) => value.padStart(3, '0'),
  (value: string) => value.length,
  (value: number) => value + 1,
  (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  (value: string) => `n:${value}`
);

export const pipeStrictFromTenValue = pipeStrictFromTen('input');

type PipeStrictFromTenValueExpected = string;
export type PipeStrictFromTenValueIsStrict = Expect<Equal<typeof pipeStrictFromTenValue, PipeStrictFromTenValueExpected>>;

export const pipeStrictFromTenValueNoInput = pipeStrictFromTen();

type PipeStrictFromTenValueNoInputExpected = string;
export type PipeStrictFromTenValueNoInputIsStrict = Expect<
  Equal<typeof pipeStrictFromTenValueNoInput, PipeStrictFromTenValueNoInputExpected>
>;

export const pipeStrictFromNoInput = pipeStrict(from(1));

type PipeStrictFromNoInputExpected = (input?: unknown) => number;
export type PipeStrictFromNoInputIsStrict = Expect<Equal<typeof pipeStrictFromNoInput, PipeStrictFromNoInputExpected>>;

export const pipeStrictFromNoInputValue = pipeStrictFromNoInput();

type PipeStrictFromNoInputValueExpected = number;
export type PipeStrictFromNoInputValueIsStrict = Expect<
  Equal<typeof pipeStrictFromNoInputValue, PipeStrictFromNoInputValueExpected>
>;

export const pipeWithSideEffectInput = pipeSideEffect(
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `n:${value}`
);

export const pipeWithSideEffectValue = pipeWithSideEffectInput(sideEffectInput);

type PipeExpected = (input: number | SideEffect<any>) => string | SideEffect<any>;
export type PipeAcceptsSideEffectInput = Expect<Equal<typeof pipeWithSideEffectInput, PipeExpected>>;

export const pipeSideEffectZero = pipeSideEffect(() => 1, (value: number) => value + 1);

type PipeSideEffectZeroExpected = () => number | SideEffect<any>;
export type PipeSideEffectZeroIsStrict = Expect<Equal<typeof pipeSideEffectZero, PipeSideEffectZeroExpected>>;

export const pipeSideEffectZeroValue = pipeSideEffectZero();

type PipeSideEffectZeroValueExpected = number | SideEffect<any>;
export type PipeSideEffectZeroValueIsStrict = Expect<
  Equal<typeof pipeSideEffectZeroValue, PipeSideEffectZeroValueExpected>
>;

export const pipeWithSideEffectValueInput = pipeWithSideEffectInput(1);

type PipeWithSideEffectValueInputExpected = string | SideEffect<any>;
export type PipeSideEffectValueInputIsStrict = Expect<
  Equal<typeof pipeWithSideEffectValueInput, PipeWithSideEffectValueInputExpected>
>;

export const pipeSideEffectSix = pipeSideEffect(
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => value + 3,
  (value: number) => value - 1,
  (value: number) => value * 2,
  (value: number) => `n:${value}`
);

type PipeSideEffectSixExpected = (input: number | SideEffect<any>) => string | SideEffect<any>;
export type PipeSideEffectSixIsStrict = Expect<Equal<typeof pipeSideEffectSix, PipeSideEffectSixExpected>>;

export const pipeSideEffectTen = pipeSideEffect(
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `v:${value}`,
  (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  (value: number) => value + 1,
  (value: number) => `${value}`,
  (value: string) => value.padStart(3, '0'),
  (value: string) => value.length,
  (value: number) => `n:${value}`
);

type PipeSideEffectTenExpected = (input: number | SideEffect<any>) => string | SideEffect<any>;
export type PipeSideEffectTenIsStrict = Expect<Equal<typeof pipeSideEffectTen, PipeSideEffectTenExpected>>;

export const pipeSideEffectEleven = pipeSideEffect(
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `v:${value}`,
  (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  (value: number) => value + 3,
  (value: number) => value * 2,
  (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  (value: string) => value.length,
  (value: number) => `n:${value}`
);

type PipeSideEffectElevenExpected = (input: number | SideEffect<any>) => string | SideEffect<any>;
export type PipeSideEffectElevenIsStrict = Expect<
  Equal<typeof pipeSideEffectEleven, PipeSideEffectElevenExpected>
>;

export const pipeSideEffectElevenValueHinted = pipeSideEffect<number, typeof pipeElevenFnsHinted>(
  1,
  ...pipeElevenFnsHinted
);

type PipeSideEffectElevenValueHintedExpected = string | SideEffect<any>;
export type PipeSideEffectElevenValueHintedIsStrict = Expect<
  Equal<typeof pipeSideEffectElevenValueHinted, PipeSideEffectElevenValueHintedExpected>
>;

export const pipeSideEffectFromTen = pipeSideEffect(
  from(1),
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => `${value}`,
  (value: string) => value.padStart(3, '0'),
  (value: string) => value.length,
  (value: number) => value + 1,
  (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  (value: string) => `n:${value}`
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

export const pipeSideEffectFromNoInput = pipeSideEffect(from(1));

type PipeSideEffectFromNoInputExpected = (input?: unknown) => number | SideEffect<any>;
export type PipeSideEffectFromNoInputIsStrict = Expect<
  Equal<typeof pipeSideEffectFromNoInput, PipeSideEffectFromNoInputExpected>
>;

export const pipeSideEffectFromNoInputValue = pipeSideEffectFromNoInput();

type PipeSideEffectFromNoInputValueExpected = number | SideEffect<any>;
export type PipeSideEffectFromNoInputValueIsStrict = Expect<
  Equal<typeof pipeSideEffectFromNoInputValue, PipeSideEffectFromNoInputValueExpected>
>;

export const purePipeAsync = pipeAsync(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `n:${value}`
);

type PurePipeAsyncExpected = (input: number) => Promise<string>;
export type PipeAsyncPureIsStrict = Expect<Equal<typeof purePipeAsync, PurePipeAsyncExpected>>;

export const purePipeAsyncZero = pipeAsync(() => 1, async (value: number) => value + 1);

type PurePipeAsyncZeroExpected = () => Promise<number>;
export type PipeAsyncPureZeroIsStrict = Expect<Equal<typeof purePipeAsyncZero, PurePipeAsyncZeroExpected>>;

export const purePipeAsyncZeroValue = purePipeAsyncZero();

type PurePipeAsyncZeroValueExpected = Promise<number>;
export type PipeAsyncPureZeroValueIsStrict = Expect<
  Equal<typeof purePipeAsyncZeroValue, PurePipeAsyncZeroValueExpected>
>;

export const purePipeAsyncValue = purePipeAsync(1);

type PurePipeAsyncValueExpected = Promise<string>;
export type PipeAsyncPureValueIsStrict = Expect<Equal<typeof purePipeAsyncValue, PurePipeAsyncValueExpected>>;

export const purePipeAsyncSix = pipeAsync(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `${value}`,
  async (value: string) => value.length,
  (value: number) => value + 3,
  async (value: number) => `n:${value}`
);

type PurePipeAsyncSixExpected = (input: number) => Promise<string>;
export type PipeAsyncPureSixIsStrict = Expect<Equal<typeof purePipeAsyncSix, PurePipeAsyncSixExpected>>;

export const purePipeAsyncTen = pipeAsync(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `${value}`,
  async (value: string) => value.length,
  (value: number) => value + 3,
  async (value: number) => value * 2,
  (value: number) => `${value}`,
  async (value: string) => value.length,
  (value: number) => value + 1,
  async (value: number) => `n:${value}`
);

type PurePipeAsyncTenExpected = (input: number) => Promise<string>;
export type PipeAsyncPureTenIsStrict = Expect<Equal<typeof purePipeAsyncTen, PurePipeAsyncTenExpected>>;

export const purePipeAsyncEleven = pipeAsync(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `v:${value}`,
  async (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  async (value: number) => value + 3,
  (value: number) => value * 2,
  async (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  async (value: string) => value.length,
  (value: number) => `n:${value}`
);

type PurePipeAsyncElevenExpected = (input: number) => Promise<string>;
export type PipeAsyncPureElevenIsStrict = Expect<
  Equal<typeof purePipeAsyncEleven, PurePipeAsyncElevenExpected>
>;

export const purePipeAsyncElevenValue = purePipeAsyncEleven(1);

type PurePipeAsyncElevenValueExpected = Promise<string>;
export type PipeAsyncPureElevenValueIsStrict = Expect<
  Equal<typeof purePipeAsyncElevenValue, PurePipeAsyncElevenValueExpected>
>;

const pipeAsyncElevenFnsHinted: [
  (value: number) => number,
  (value: number) => Promise<number>,
  (value: number) => string,
  (value: string) => Promise<string>,
  (value: string) => number,
  (value: number) => Promise<number>,
  (value: number) => number,
  (value: number) => Promise<string>,
  (value: string) => string,
  (value: string) => Promise<number>,
  (value: number) => string
] = [
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `v:${value}`,
  async (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  async (value: number) => value + 3,
  (value: number) => value * 2,
  async (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  async (value: string) => value.length,
  (value: number) => `n:${value}`
];

export const purePipeAsyncElevenValueHinted = pipeAsync<number, typeof pipeAsyncElevenFnsHinted>(
  1,
  ...pipeAsyncElevenFnsHinted
);

type PurePipeAsyncElevenValueHintedExpected = Promise<string>;
export type PipeAsyncPureElevenValueHintedIsStrict = Expect<
  Equal<typeof purePipeAsyncElevenValueHinted, PurePipeAsyncElevenValueHintedExpected>
>;

export const pipeAsyncFromTen = pipeAsync(
  from(1),
  async (value: number) => value + 1,
  (value: number) => value * 2,
  async (value: number) => `${value}`,
  (value: string) => value.padStart(3, '0'),
  async (value: string) => value.length,
  (value: number) => value + 1,
  async (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  async (value: string) => `n:${value}`
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

export const pipeAsyncFromNoInput = pipeAsync(from(1));

type PipeAsyncFromNoInputExpected = (input?: unknown) => Promise<number>;
export type PipeAsyncFromNoInputIsStrict = Expect<Equal<typeof pipeAsyncFromNoInput, PipeAsyncFromNoInputExpected>>;

export const pipeAsyncFromNoInputValue = pipeAsyncFromNoInput();

type PipeAsyncFromNoInputValueExpected = Promise<number>;
export type PipeAsyncFromNoInputValueIsStrict = Expect<
  Equal<typeof pipeAsyncFromNoInputValue, PipeAsyncFromNoInputValueExpected>
>;

export const purePipeAsyncStrict = pipeAsyncStrict(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `n:${value}`
);

type PurePipeAsyncStrictExpected = (input: number) => Promise<string>;
export type PipeAsyncStrictPureIsStrict = Expect<Equal<typeof purePipeAsyncStrict, PurePipeAsyncStrictExpected>>;

export const purePipeAsyncStrictZero = pipeAsyncStrict(() => 1, async (value: number) => value + 1);

type PurePipeAsyncStrictZeroExpected = () => Promise<number>;
export type PipeAsyncStrictZeroIsStrict = Expect<Equal<typeof purePipeAsyncStrictZero, PurePipeAsyncStrictZeroExpected>>;

export const purePipeAsyncStrictZeroValue = purePipeAsyncStrictZero();

type PurePipeAsyncStrictZeroValueExpected = Promise<number>;
export type PipeAsyncStrictZeroValueIsStrict = Expect<
  Equal<typeof purePipeAsyncStrictZeroValue, PurePipeAsyncStrictZeroValueExpected>
>;

export const purePipeAsyncStrictValue = pipeAsyncStrict(1);

type PurePipeAsyncStrictValueExpected = Promise<number>;
export type PipeAsyncStrictValueIsStrict = Expect<Equal<typeof purePipeAsyncStrictValue, PurePipeAsyncStrictValueExpected>>;

export const purePipeAsyncStrictEleven = pipeAsyncStrict(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `v:${value}`,
  async (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  async (value: number) => value + 3,
  (value: number) => value * 2,
  async (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  async (value: string) => value.length,
  (value: number) => `n:${value}`
);

type PurePipeAsyncStrictElevenExpected = (input: number) => Promise<string>;
export type PipeAsyncStrictElevenIsStrict = Expect<
  Equal<typeof purePipeAsyncStrictEleven, PurePipeAsyncStrictElevenExpected>
>;

export const purePipeAsyncStrictElevenValue = purePipeAsyncStrictEleven(1);

type PurePipeAsyncStrictElevenValueExpected = Promise<string>;
export type PipeAsyncStrictElevenValueIsStrict = Expect<
  Equal<typeof purePipeAsyncStrictElevenValue, PurePipeAsyncStrictElevenValueExpected>
>;

const pipeAsyncStrictElevenFnsHinted: [
  (value: number) => number,
  (value: number) => Promise<number>,
  (value: number) => string,
  (value: string) => Promise<string>,
  (value: string) => number,
  (value: number) => Promise<number>,
  (value: number) => number,
  (value: number) => Promise<string>,
  (value: string) => string,
  (value: string) => Promise<number>,
  (value: number) => string
] = [
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `v:${value}`,
  async (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  async (value: number) => value + 3,
  (value: number) => value * 2,
  async (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  async (value: string) => value.length,
  (value: number) => `n:${value}`
];

export const purePipeAsyncStrictElevenValueHinted = pipeAsyncStrict<
  number,
  typeof pipeAsyncStrictElevenFnsHinted
>(
  1,
  ...pipeAsyncStrictElevenFnsHinted
);

type PurePipeAsyncStrictElevenValueHintedExpected = Promise<string>;
export type PipeAsyncStrictElevenValueHintedIsStrict = Expect<
  Equal<typeof purePipeAsyncStrictElevenValueHinted, PurePipeAsyncStrictElevenValueHintedExpected>
>;

export const pipeAsyncStrictFromTen = pipeAsyncStrict(
  from(1),
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `${value}`,
  (value: string) => value.padStart(3, '0'),
  async (value: string) => value.length,
  (value: number) => value + 1,
  (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  (value: string) => `n:${value}`
);

export const pipeAsyncStrictFromTenValue = pipeAsyncStrictFromTen('input');

type PipeAsyncStrictFromTenValueExpected = Promise<string>;
export type PipeAsyncStrictFromTenValueIsStrict = Expect<
  Equal<typeof pipeAsyncStrictFromTenValue, PipeAsyncStrictFromTenValueExpected>
>;

export const pipeAsyncStrictFromTenValueNoInput = pipeAsyncStrictFromTen();

type PipeAsyncStrictFromTenValueNoInputExpected = Promise<string>;
export type PipeAsyncStrictFromTenValueNoInputIsStrict = Expect<
  Equal<typeof pipeAsyncStrictFromTenValueNoInput, PipeAsyncStrictFromTenValueNoInputExpected>
>;

export const pipeAsyncStrictFromNoInput = pipeAsyncStrict(from(1));

type PipeAsyncStrictFromNoInputExpected = (input?: unknown) => Promise<number>;
export type PipeAsyncStrictFromNoInputIsStrict = Expect<
  Equal<typeof pipeAsyncStrictFromNoInput, PipeAsyncStrictFromNoInputExpected>
>;

export const pipeAsyncStrictFromNoInputValue = pipeAsyncStrictFromNoInput();

type PipeAsyncStrictFromNoInputValueExpected = Promise<number>;
export type PipeAsyncStrictFromNoInputValueIsStrict = Expect<
  Equal<typeof pipeAsyncStrictFromNoInputValue, PipeAsyncStrictFromNoInputValueExpected>
>;

export const pipeAsyncWithSideEffectInput = pipeAsyncSideEffect(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `n:${value}`
);

export const pipeAsyncWithSideEffectValue = pipeAsyncWithSideEffectInput(sideEffectInput);

type PipeAsyncExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncAcceptsSideEffectInput = Expect<
  Equal<typeof pipeAsyncWithSideEffectInput, PipeAsyncExpected>
>;

export const pipeAsyncSideEffectZero = pipeAsyncSideEffect(() => 1, async (value: number) => value + 1);

type PipeAsyncSideEffectZeroExpected = () => Promise<number | SideEffect<any>>;
export type PipeAsyncSideEffectZeroIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectZero, PipeAsyncSideEffectZeroExpected>
>;

export const pipeAsyncSideEffectZeroValue = pipeAsyncSideEffectZero();

type PipeAsyncSideEffectZeroValueExpected = Promise<number | SideEffect<any>>;
export type PipeAsyncSideEffectZeroValueIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectZeroValue, PipeAsyncSideEffectZeroValueExpected>
>;

export const pipeAsyncWithSideEffectValueInput = pipeAsyncWithSideEffectInput(1);

type PipeAsyncWithSideEffectValueInputExpected = Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectValueInputIsStrict = Expect<
  Equal<typeof pipeAsyncWithSideEffectValueInput, PipeAsyncWithSideEffectValueInputExpected>
>;

export const pipeAsyncSideEffectSix = pipeAsyncSideEffect(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => value + 3,
  async (value: number) => value - 1,
  (value: number) => value * 2,
  async (value: number) => `n:${value}`
);

type PipeAsyncSideEffectSixExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectSixIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectSix, PipeAsyncSideEffectSixExpected>
>;

export const pipeAsyncSideEffectTen = pipeAsyncSideEffect(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `${value}`,
  async (value: string) => value.length,
  (value: number) => value + 3,
  async (value: number) => value * 2,
  (value: number) => `${value}`,
  async (value: string) => value.length,
  (value: number) => value + 1,
  async (value: number) => `n:${value}`
);

type PipeAsyncSideEffectTenExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectTenIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectTen, PipeAsyncSideEffectTenExpected>
>;

export const pipeAsyncSideEffectEleven = pipeAsyncSideEffect(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => `v:${value}`,
  async (value: string) => value.toUpperCase(),
  (value: string) => value.length,
  async (value: number) => value + 3,
  (value: number) => value * 2,
  async (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  async (value: string) => value.length,
  (value: number) => `n:${value}`
);

type PipeAsyncSideEffectElevenExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectElevenIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectEleven, PipeAsyncSideEffectElevenExpected>
>;

export const pipeAsyncSideEffectElevenValueHinted = pipeAsyncSideEffect<number, typeof pipeAsyncElevenFnsHinted>(
  1,
  ...pipeAsyncElevenFnsHinted
);

type PipeAsyncSideEffectElevenValueHintedExpected = Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectElevenValueHintedIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectElevenValueHinted, PipeAsyncSideEffectElevenValueHintedExpected>
>;

export const pipeAsyncSideEffectFromTen = pipeAsyncSideEffect(
  from(1),
  async (value: number) => value + 1,
  (value: number) => value * 2,
  async (value: number) => `${value}`,
  (value: string) => value.padStart(3, '0'),
  async (value: string) => value.length,
  (value: number) => value + 1,
  async (value: number) => `${value}`,
  (value: string) => value.padStart(4, '0'),
  async (value: string) => `n:${value}`
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

export const pipeAsyncSideEffectFromNoInput = pipeAsyncSideEffect(from(1));

type PipeAsyncSideEffectFromNoInputExpected = (input?: unknown) => Promise<number | SideEffect<any>>;
export type PipeAsyncSideEffectFromNoInputIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectFromNoInput, PipeAsyncSideEffectFromNoInputExpected>
>;

export const pipeAsyncSideEffectFromNoInputValue = pipeAsyncSideEffectFromNoInput();

type PipeAsyncSideEffectFromNoInputValueExpected = Promise<number | SideEffect<any>>;
export type PipeAsyncSideEffectFromNoInputValueIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectFromNoInputValue, PipeAsyncSideEffectFromNoInputValueExpected>
>;

export const strictPipeSideEffect = pipeSideEffectStrict(
  (value: number) => value + 1,
  (value: number) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value: number) => (value > 2 ? value : SideEffect.of(() => 0 as const))
);

export const strictPipeSideEffectResult = strictPipeSideEffect(1);

type StrictPipeSideEffectResultExpected = number | SideEffect<'LOW' | 0>;
export type PipeSideEffectStrictResultIsStrict = Expect<
  Equal<typeof strictPipeSideEffectResult, StrictPipeSideEffectResultExpected>
>;

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

export const strictPipeSideEffectZero = pipeSideEffectStrict(
  () => 1,
  (value: number) => (value > 0 ? value : SideEffect.of(() => 'LOW' as const))
);

type StrictPipeSideEffectZeroExpected = () => number | SideEffect<'LOW'>;
export type PipeSideEffectStrictZeroIsStrict = Expect<
  Equal<typeof strictPipeSideEffectZero, StrictPipeSideEffectZeroExpected>
>;

export const strictPipeSideEffectZeroValue = strictPipeSideEffectZero();

type StrictPipeSideEffectZeroValueExpected = number | SideEffect<'LOW'>;
export type PipeSideEffectStrictZeroValueIsStrict = Expect<
  Equal<typeof strictPipeSideEffectZeroValue, StrictPipeSideEffectZeroValueExpected>
>;

export const strictPipeSideEffectInput = strictPipeSideEffect(SideEffect.of(() => 'INPUT' as const));

type StrictPipeSideEffectInputExpected = number | SideEffect<'LOW' | 0 | 'INPUT'>;
export type PipeSideEffectStrictInputIsStrict = Expect<
  Equal<typeof strictPipeSideEffectInput, StrictPipeSideEffectInputExpected>
>;

type StrictSideEffectInputEffects = EffectUnion<typeof strictPipeSideEffectInput>;
type StrictSideEffectInputEffectsExpected = 'LOW' | 0 | 'INPUT';
export type PipeSideEffectStrictInputEffects = Expect<
  Equal<StrictSideEffectInputEffects, StrictSideEffectInputEffectsExpected>
>;

export const strictPipeSideEffectSix = pipeSideEffectStrict(
  (value: number) => value + 1,
  (value: number) => (value > 2 ? value : SideEffect.of(() => 'LOW' as const)),
  (value: number) => value + 1,
  (value: number) => (value > 10 ? value : SideEffect.of(() => 'SMALL' as const)),
  (value: number) => value * 2,
  (value: number) => (value > 40 ? value : SideEffect.of(() => 0 as const))
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
  (value: number) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value: number) => value + 1,
  (value: number) => (value > 3 ? value : SideEffect.of(() => 'MID' as const)),
  (value: number) => value * 2,
  (value: number) => value + 1,
  (value: number) => (value > 10 ? value : SideEffect.of(() => 0 as const)),
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => value + 1
);

export const strictPipeSideEffectTenResult = strictPipeSideEffectTen(1);

type StrictTenEffects = EffectUnion<typeof strictPipeSideEffectTenResult>;
type StrictTenEffectsExpected = 'LOW' | 'MID' | 0;
export type PipeSideEffectStrictTenEffects = Expect<Equal<StrictTenEffects, StrictTenEffectsExpected>>;

type StrictTenValue = ValueUnion<typeof strictPipeSideEffectTenResult>;
type StrictTenValueExpected = number;
export type PipeSideEffectStrictTenValue = Expect<Equal<StrictTenValue, StrictTenValueExpected>>;

export const strictPipeSideEffectEleven = pipeSideEffectStrict(
  (value: number) => value + 1,
  (value: number) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value: number) => value * 2,
  (value: number) => (value > 3 ? value : SideEffect.of(() => 'MID' as const)),
  (value: number) => value + 3,
  (value: number) => (value > 10 ? value : SideEffect.of(() => 0 as const)),
  (value: number) => value * 2,
  (value: number) => value - 1,
  (value: number) => value + 4,
  (value: number) => (value > 20 ? value : SideEffect.of(() => 'HIGH' as const)),
  (value: number) => `n:${value}`
);

export const strictPipeSideEffectElevenResult = strictPipeSideEffectEleven(1);

type StrictElevenEffects = EffectUnion<typeof strictPipeSideEffectElevenResult>;
type StrictElevenEffectsExpected = 'LOW' | 'MID' | 0 | 'HIGH';
export type PipeSideEffectStrictElevenEffects = Expect<
  Equal<StrictElevenEffects, StrictElevenEffectsExpected>
>;

type StrictElevenValue = ValueUnion<typeof strictPipeSideEffectElevenResult>;
type StrictElevenValueExpected = string;
export type PipeSideEffectStrictElevenValue = Expect<Equal<StrictElevenValue, StrictElevenValueExpected>>;

export const strictPipeSideEffectElevenValueHinted = pipeSideEffectStrict<number, typeof pipeStrictElevenFnsHinted>(
  1,
  ...pipeStrictElevenFnsHinted
);

type StrictPipeSideEffectElevenValueHintedExpected = string | SideEffect<never>;
export type PipeSideEffectStrictElevenValueHintedIsStrict = Expect<
  Equal<typeof strictPipeSideEffectElevenValueHinted, StrictPipeSideEffectElevenValueHintedExpected>
>;

export const strictPipeSideEffectFromTen = pipeSideEffectStrict(
  from(1),
  (value: number) => value + 1,
  (value: number) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value: number) => value * 2,
  (value: number) => (value > 4 ? value : SideEffect.of(() => 'MID' as const)),
  (value: number) => value + 1,
  (value: number) => value * 2,
  (value: number) => (value > 20 ? value : SideEffect.of(() => 0 as const)),
  (value: number) => value + 1,
  (value: number) => value * 2
);

export const strictPipeSideEffectFromTenResult = strictPipeSideEffectFromTen('input');

type StrictSideEffectFromTenResultExpected = number | SideEffect<'LOW' | 'MID' | 0>;
export type PipeSideEffectStrictFromTenResultIsStrict = Expect<
  Equal<typeof strictPipeSideEffectFromTenResult, StrictSideEffectFromTenResultExpected>
>;

type StrictFromTenEffects = EffectUnion<typeof strictPipeSideEffectFromTenResult>;
type StrictFromTenEffectsExpected = 'LOW' | 'MID' | 0;
export type PipeSideEffectStrictFromTenEffects = Expect<
  Equal<StrictFromTenEffects, StrictFromTenEffectsExpected>
>;

type StrictFromTenValue = ValueUnion<typeof strictPipeSideEffectFromTenResult>;
type StrictFromTenValueExpected = number;
export type PipeSideEffectStrictFromTenValue = Expect<Equal<StrictFromTenValue, StrictFromTenValueExpected>>;

export const strictPipeSideEffectFromTenResultNoInput = strictPipeSideEffectFromTen();

type StrictSideEffectFromTenNoInputExpected = number | SideEffect<'LOW' | 'MID' | 0>;
export type PipeSideEffectStrictFromTenNoInputIsStrict = Expect<
  Equal<typeof strictPipeSideEffectFromTenResultNoInput, StrictSideEffectFromTenNoInputExpected>
>;

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

export const strictPipeSideEffectFromNoInput = pipeSideEffectStrict(from(1));

type StrictPipeSideEffectFromNoInputExpected = {
  (input?: unknown): number | SideEffect<never>;
  <EIn>(input?: unknown | SideEffect<EIn>): number | SideEffect<EIn>;
};
export type PipeSideEffectStrictFromNoInputIsStrict = Expect<
  Equal<typeof strictPipeSideEffectFromNoInput, StrictPipeSideEffectFromNoInputExpected>
>;

export const strictPipeSideEffectFromNoInputValue = strictPipeSideEffectFromNoInput();

type StrictPipeSideEffectFromNoInputValueExpected = number | SideEffect<never>;
export type PipeSideEffectStrictFromNoInputValueIsStrict = Expect<
  Equal<typeof strictPipeSideEffectFromNoInputValue, StrictPipeSideEffectFromNoInputValueExpected>
>;

export const strictPipeAsyncSideEffect = pipeAsyncSideEffectStrict(
  (value: number) => value + 1,
  async (value: number) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value: number) => (value > 2 ? value : SideEffect.of(() => 0 as const))
);

export const strictPipeAsyncSideEffectResult = strictPipeAsyncSideEffect(1);

type StrictPipeAsyncSideEffectResultExpected = Promise<number | SideEffect<'LOW' | 0>>;
export type PipeAsyncSideEffectStrictResultIsStrict = Expect<
  Equal<typeof strictPipeAsyncSideEffectResult, StrictPipeAsyncSideEffectResultExpected>
>;

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

export const strictPipeAsyncSideEffectZero = pipeAsyncSideEffectStrict(
  () => 1,
  async (value: number) => (value > 0 ? value : SideEffect.of(() => 'LOW' as const))
);

type StrictPipeAsyncSideEffectZeroExpected = () => Promise<number | SideEffect<'LOW'>>;
export type PipeAsyncSideEffectStrictZeroIsStrict = Expect<
  Equal<typeof strictPipeAsyncSideEffectZero, StrictPipeAsyncSideEffectZeroExpected>
>;

export const strictPipeAsyncSideEffectZeroValue = strictPipeAsyncSideEffectZero();

type StrictPipeAsyncSideEffectZeroValueExpected = Promise<number | SideEffect<'LOW'>>;
export type PipeAsyncSideEffectStrictZeroValueIsStrict = Expect<
  Equal<typeof strictPipeAsyncSideEffectZeroValue, StrictPipeAsyncSideEffectZeroValueExpected>
>;

export const strictPipeAsyncSideEffectSix = pipeAsyncSideEffectStrict(
  (value: number) => value + 1,
  async (value: number) => (value > 2 ? value : SideEffect.of(() => 'LOW' as const)),
  (value: number) => value + 1,
  async (value: number) => (value > 10 ? value : SideEffect.of(() => 'SMALL' as const)),
  (value: number) => value * 2,
  async (value: number) => (value > 40 ? value : SideEffect.of(() => 0 as const))
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
  async (value: number) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value: number) => value + 1,
  async (value: number) => (value > 3 ? value : SideEffect.of(() => 'MID' as const)),
  (value: number) => value * 2,
  async (value: number) => value + 1,
  (value: number) => (value > 10 ? value : SideEffect.of(() => 0 as const)),
  async (value: number) => value + 1,
  (value: number) => value * 2,
  async (value: number) => value + 1
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

export const pipeAsyncSideEffectMixed = pipeAsyncSideEffect(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => (value > 2 ? value : SideEffect.of(() => 'LOW' as const)),
  async (value: number) => (value > 10 ? `${value}` : SideEffect.of(() => 'MID' as const)),
  (value: string) => value.length,
  async (value: number) => `n:${value}`
);

type PipeAsyncSideEffectMixedExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectMixedIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectMixed, PipeAsyncSideEffectMixedExpected>
>;

export const strictPipeAsyncSideEffectMixed = pipeAsyncSideEffectStrict(
  (value: number) => value + 1,
  async (value: number) => value * 2,
  (value: number) => (value > 2 ? value : SideEffect.of(() => 'LOW' as const)),
  async (value: number) => (value > 10 ? `${value}` : SideEffect.of(() => 'MID' as const)),
  (value: string) => value.length,
  async (value: number) => `n:${value}`
);

export const strictPipeAsyncSideEffectMixedResult = strictPipeAsyncSideEffectMixed(1);

type StrictAsyncMixedResolved = Awaited<typeof strictPipeAsyncSideEffectMixedResult>;
type StrictAsyncMixedEffects = EffectUnion<StrictAsyncMixedResolved>;
type StrictAsyncMixedEffectsExpected = 'LOW' | 'MID';
export type PipeAsyncSideEffectStrictMixedEffects = Expect<
  Equal<StrictAsyncMixedEffects, StrictAsyncMixedEffectsExpected>
>;

type StrictAsyncMixedValue = ValueUnion<StrictAsyncMixedResolved>;
type StrictAsyncMixedValueExpected = string;
export type PipeAsyncSideEffectStrictMixedValue = Expect<
  Equal<StrictAsyncMixedValue, StrictAsyncMixedValueExpected>
>;

export const strictPipeAsyncSideEffectEleven = pipeAsyncSideEffectStrict(
  (value: number) => value + 1,
  async (value: number) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value: number) => value * 2,
  async (value: number) => (value > 3 ? value : SideEffect.of(() => 'MID' as const)),
  (value: number) => value + 3,
  async (value: number) => (value > 10 ? value : SideEffect.of(() => 0 as const)),
  (value: number) => value * 2,
  async (value: number) => value - 1,
  (value: number) => value + 4,
  async (value: number) => (value > 20 ? value : SideEffect.of(() => 'HIGH' as const)),
  (value: number) => `n:${value}`
);

export const strictPipeAsyncSideEffectElevenResult = strictPipeAsyncSideEffectEleven(1);

type StrictAsyncElevenResolved = Awaited<typeof strictPipeAsyncSideEffectElevenResult>;
type StrictAsyncElevenEffects = EffectUnion<StrictAsyncElevenResolved>;
type StrictAsyncElevenEffectsExpected = 'LOW' | 'MID' | 0 | 'HIGH';
export type PipeAsyncSideEffectStrictElevenEffects = Expect<
  Equal<StrictAsyncElevenEffects, StrictAsyncElevenEffectsExpected>
>;

type StrictAsyncElevenValue = ValueUnion<StrictAsyncElevenResolved>;
type StrictAsyncElevenValueExpected = string;
export type PipeAsyncSideEffectStrictElevenValue = Expect<
  Equal<StrictAsyncElevenValue, StrictAsyncElevenValueExpected>
>;

export const strictPipeAsyncSideEffectElevenValueHinted = pipeAsyncSideEffectStrict<
  number,
  typeof pipeAsyncStrictElevenFnsHinted
>(
  1,
  ...pipeAsyncStrictElevenFnsHinted
);

type StrictPipeAsyncSideEffectElevenValueHintedExpected = Promise<string | SideEffect<never>>;
export type PipeAsyncSideEffectStrictElevenValueHintedIsStrict = Expect<
  Equal<typeof strictPipeAsyncSideEffectElevenValueHinted, StrictPipeAsyncSideEffectElevenValueHintedExpected>
>;

export const strictPipeAsyncSideEffectFromTen = pipeAsyncSideEffectStrict(
  from(1),
  async (value: number) => value + 1,
  (value: number) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  async (value: number) => value * 2,
  (value: number) => (value > 4 ? value : SideEffect.of(() => 'MID' as const)),
  async (value: number) => value + 1,
  (value: number) => value * 2,
  async (value: number) => (value > 20 ? value : SideEffect.of(() => 0 as const)),
  (value: number) => value + 1,
  async (value: number) => value * 2
);

export const strictPipeAsyncSideEffectFromTenResult = strictPipeAsyncSideEffectFromTen('input');

type StrictAsyncFromTenResultExpected = Promise<number | SideEffect<'LOW' | 'MID' | 0>>;
export type PipeAsyncSideEffectStrictFromTenResultIsStrict = Expect<
  Equal<typeof strictPipeAsyncSideEffectFromTenResult, StrictAsyncFromTenResultExpected>
>;

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

type StrictAsyncFromTenNoInputResultExpected = Promise<number | SideEffect<'LOW' | 'MID' | 0>>;
export type PipeAsyncSideEffectStrictFromTenNoInputIsStrict = Expect<
  Equal<typeof strictPipeAsyncSideEffectFromTenResultNoInput, StrictAsyncFromTenNoInputResultExpected>
>;

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

export const strictPipeAsyncSideEffectFromNoInput = pipeAsyncSideEffectStrict(from(1));

type StrictAsyncSideEffectFromNoInputExpected = {
  (input?: unknown): Promise<number | SideEffect<never>>;
  <EIn>(input?: unknown | SideEffect<EIn>): Promise<number | SideEffect<EIn>>;
};
export type PipeAsyncSideEffectStrictFromNoInputIsStrict = Expect<
  Equal<typeof strictPipeAsyncSideEffectFromNoInput, StrictAsyncSideEffectFromNoInputExpected>
>;

export const strictPipeAsyncSideEffectFromNoInputValue = strictPipeAsyncSideEffectFromNoInput();

type StrictAsyncSideEffectFromNoInputValueExpected = Promise<number | SideEffect<never>>;
export type PipeAsyncSideEffectStrictFromNoInputValueIsStrict = Expect<
  Equal<typeof strictPipeAsyncSideEffectFromNoInputValue, StrictAsyncSideEffectFromNoInputValueExpected>
>;

// Negative cases: input required when not using from/zero-arity.
// @ts-expect-error input required for unary pipe
purePipe();
// @ts-expect-error input required for unary pipeStrict
purePipeStrict();
// @ts-expect-error input required for unary pipeSideEffect
pipeWithSideEffectInput();
// @ts-expect-error input required for unary pipeSideEffectStrict
strictPipeSideEffect();
// @ts-expect-error input required for unary pipeAsync
purePipeAsync();
// @ts-expect-error input required for unary pipeAsyncStrict
purePipeAsyncStrict();
// @ts-expect-error input required for unary pipeAsyncSideEffect
pipeAsyncWithSideEffectInput();
// @ts-expect-error input required for unary pipeAsyncSideEffectStrict
strictPipeAsyncSideEffect();

// @ts-expect-error input required for direct pipe call
pipe((value: number) => value + 1)();
// @ts-expect-error input required for direct pipeStrict call
pipeStrict((value: number) => value + 1)();
// @ts-expect-error input required for direct pipeSideEffect call
pipeSideEffect((value: number) => value + 1)();
// @ts-expect-error input required for direct pipeSideEffectStrict call
pipeSideEffectStrict((value: number) => value + 1)();
// @ts-expect-error input required for direct pipeAsync call
pipeAsync((value: number) => value + 1)();
// @ts-expect-error input required for direct pipeAsyncStrict call
pipeAsyncStrict((value: number) => value + 1)();
// @ts-expect-error input required for direct pipeAsyncSideEffect call
pipeAsyncSideEffect((value: number) => value + 1)();
// @ts-expect-error input required for direct pipeAsyncSideEffectStrict call
pipeAsyncSideEffectStrict((value: number) => value + 1)();

const strictMismatchFn1 = (id: number) => id;
const strictMismatchFn2 = (userName: string) => userName;
const strictMismatchFn3 = (userName: string) => userName.toLowerCase();

// @ts-expect-error mismatched types in pipeSideEffectStrict
pipeSideEffectStrict(1, strictMismatchFn1, strictMismatchFn2);
// @ts-expect-error mismatched types in pipeSideEffectStrict with explicit annotation
pipeSideEffectStrict(1, strictMismatchFn1, strictMismatchFn3);
// @ts-expect-error mismatched types in pipeStrict
pipeStrict(1, strictMismatchFn1, strictMismatchFn2);
// @ts-expect-error mismatched types in pipeStrict with explicit annotation
pipeStrict(1, strictMismatchFn1, strictMismatchFn3);
// @ts-expect-error mismatched types in pipeAsyncStrict
pipeAsyncStrict(1, strictMismatchFn1, strictMismatchFn2);
// @ts-expect-error mismatched types in pipeAsyncStrict with explicit annotation
pipeAsyncStrict(1, strictMismatchFn1, strictMismatchFn3);

type AppState = {
  todos: number[];
  filter: string;
  nextId: number;
  editingId: number | null;
};

const appState: AppState = {
  todos: [1, 2, 3],
  filter: 'all',
  nextId: 4,
  editingId: null,
};

export const pipeValueFirstTap = pipe(
  appState,
  tap((state) => state.todos.length)
);

type PipeValueFirstTapExpected = AppState;
export type PipeValueFirstTapIsStrict = Expect<Equal<typeof pipeValueFirstTap, PipeValueFirstTapExpected>>;

export const pipeValueFirstAssoc = pipe(
  appState,
  assoc('editingId', null)
);

type PipeValueFirstAssocExpected = Omit<AppState, 'editingId'> & { editingId: null };
export type PipeValueFirstAssocIsStrict = Expect<Equal<typeof pipeValueFirstAssoc, PipeValueFirstAssocExpected>>;

export const pipeValueFirstMap = pipe(
  ['a', 'b'],
  map((value: string) => value.toUpperCase()),
  tap((values) => values.length)
);

type PipeValueFirstMapExpected = string[];
export type PipeValueFirstMapIsStrict = Expect<Equal<typeof pipeValueFirstMap, PipeValueFirstMapExpected>>;

export const pipeSideEffectValueFirstTap = pipeSideEffect(
  appState,
  tap((state) => state.todos.length)
);

type PipeSideEffectValueFirstTapExpected = AppState | SideEffect<any>;
export type PipeSideEffectValueFirstTapIsStrict = Expect<
  Equal<typeof pipeSideEffectValueFirstTap, PipeSideEffectValueFirstTapExpected>
>;

export const pipeAsyncValueFirst = pipeAsync(
  1,
  (value: number) => value + 1,
  async (value: number) => value * 2
);

type PipeAsyncValueFirstExpected = Promise<number>;
export type PipeAsyncValueFirstIsStrict = Expect<Equal<typeof pipeAsyncValueFirst, PipeAsyncValueFirstExpected>>;

export const pipeAsyncSideEffectValueFirstTap = pipeAsyncSideEffect(
  appState,
  tap((state) => state.todos.length)
);

type PipeAsyncSideEffectValueFirstTapExpected = Promise<AppState | SideEffect<any>>;
export type PipeAsyncSideEffectValueFirstTapIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectValueFirstTap, PipeAsyncSideEffectValueFirstTapExpected>
>;

export const pipeSideEffectStrictValueFirstTap = pipeSideEffectStrict(
  appState,
  tap((state) => state.todos.length)
);

type PipeSideEffectStrictValueFirstTapExpected = AppState | SideEffect<never>;
export type PipeSideEffectStrictValueFirstTapIsStrict = Expect<
  Equal<typeof pipeSideEffectStrictValueFirstTap, PipeSideEffectStrictValueFirstTapExpected>
>;

type PipeSideEffectStrictValueFirstTapEffects = EffectUnion<typeof pipeSideEffectStrictValueFirstTap>;
type PipeSideEffectStrictValueFirstTapEffectsExpected = never;
export type PipeSideEffectStrictValueFirstTapEffectsIsStrict = Expect<
  Equal<PipeSideEffectStrictValueFirstTapEffects, PipeSideEffectStrictValueFirstTapEffectsExpected>
>;

export const pipeAsyncSideEffectStrictValueFirstTap = pipeAsyncSideEffectStrict(
  appState,
  tap((state) => state.todos.length)
);

type PipeAsyncSideEffectStrictValueFirstTapExpected = Promise<AppState | SideEffect<never>>;
export type PipeAsyncSideEffectStrictValueFirstTapIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectStrictValueFirstTap, PipeAsyncSideEffectStrictValueFirstTapExpected>
>;
