import SideEffect from './sideEffect';
import pipe from './pipe';
import pipeSideEffect from './pipeSideEffect';
import pipeSideEffectStrict from './pipeSideEffectStrict';
import pipeAsync from '../async/pipeAsync';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import pipeAsyncSideEffectStrict from '../async/pipeAsyncSideEffectStrict';
import range from '../../stream/range';
import scan from '../../stream/scan';
import zipWith from '../../stream/zipWith';
import takeWhile from '../../stream/takeWhile';
import dropWhile from '../../stream/dropWhile';
import flatten from '../../stream/flatten';
import concat from '../../stream/concat';
import append from '../../stream/append';
import prepend from '../../stream/prepend';
import map from '../../stream/map';
import toArray from '../../stream/toArray';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;
type EffectUnion<T> = Extract<T, SideEffect<any>> extends SideEffect<infer E> ? E : never;
type ValueUnion<T> = Exclude<T, SideEffect<any>>;

const streamScanSum = scan((acc: number, value: number) => acc + value, 0) as (
  iterable: Iterable<number>
) => IterableIterator<number>;

const streamZipWithLabel = zipWith(
  (value: number, label: string) => `${label}:${value}`,
  ['a', 'b', 'c']
) as (iterable: Iterable<number>) => IterableIterator<string>;

const streamTakeWhile = takeWhile((value: number) => value < 6) as (
  iterable: Iterable<number>
) => IterableIterator<number>;

const streamDropWhile = dropWhile((value: number) => value < 2) as (
  iterable: Iterable<number>
) => IterableIterator<number>;

const streamMapPairs = map((value: number) => [value, value + 1]) as (
  iterable: Iterable<number>
) => IterableIterator<number[]>;

const streamFlattenNumber = flatten as (
  iterable: Iterable<Iterable<number>>
) => IterableIterator<number>;

const streamConcatNumber = concat([100, 200]) as (
  iterable: Iterable<number>
) => IterableIterator<number>;

const streamAppendNumber = append(300) as (
  iterable: Iterable<number>
) => IterableIterator<number>;

const streamPrependNumber = prepend(0) as (
  iterable: Iterable<number>
) => IterableIterator<number>;

const streamToArrayString = toArray<string>;
const streamToArrayNumber = toArray<number>;

export const pipeStreamScanZipWith = pipe(
  (end: number) => range(0, end),
  streamScanSum,
  streamZipWithLabel
);

type PipeStreamScanZipWithExpected = (input: number) => IterableIterator<string>;
export type PipeStreamScanZipWithIsStrict = Expect<
  Equal<typeof pipeStreamScanZipWith, PipeStreamScanZipWithExpected>
>;

export const pipeStreamFlatten = pipe(
  (end: number) => range(0, end),
  streamMapPairs,
  streamFlattenNumber,
  streamDropWhile,
  streamTakeWhile,
  streamConcatNumber,
  streamAppendNumber,
  streamPrependNumber
);

type PipeStreamFlattenExpected = (input: number) => IterableIterator<number>;
export type PipeStreamFlattenIsStrict = Expect<Equal<typeof pipeStreamFlatten, PipeStreamFlattenExpected>>;

export const pipeSideEffectStream = pipeSideEffect(
  (end: number) => range(0, end),
  streamTakeWhile,
  (iterable: IterableIterator<number>) => (iterable ? iterable : SideEffect.of(() => 'EMPTY' as const))
);

type PipeSideEffectStreamExpected = (input: number | SideEffect<any>) => IterableIterator<number> | SideEffect<any>;
export type PipeSideEffectStreamIsStrict = Expect<
  Equal<typeof pipeSideEffectStream, PipeSideEffectStreamExpected>
>;

export const pipeSideEffectStrictStream = pipeSideEffectStrict(
  (end: number) => range(0, end),
  streamDropWhile,
  (iterable: IterableIterator<number>) => (iterable ? iterable : SideEffect.of(() => 'EMPTY' as const))
);

export const pipeSideEffectStrictStreamResult = pipeSideEffectStrictStream(3);

type PipeSideEffectStrictStreamResultExpected = IterableIterator<number> | SideEffect<'EMPTY'>;
export type PipeSideEffectStrictStreamResultIsStrict = Expect<
  Equal<typeof pipeSideEffectStrictStreamResult, PipeSideEffectStrictStreamResultExpected>
>;

type PipeSideEffectStrictStreamEffects = EffectUnion<typeof pipeSideEffectStrictStreamResult>;
export type PipeSideEffectStrictStreamEffectsIsStrict = Expect<
  Equal<PipeSideEffectStrictStreamEffects, 'EMPTY'>
>;

type PipeSideEffectStrictStreamValue = ValueUnion<typeof pipeSideEffectStrictStreamResult>;
export type PipeSideEffectStrictStreamValueIsStrict = Expect<
  Equal<PipeSideEffectStrictStreamValue, IterableIterator<number>>
>;

export const pipeAsyncStreamZipWith = pipeAsync(
  (end: number) => range(0, end),
  streamZipWithLabel,
  streamToArrayString
);

type PipeAsyncStreamZipWithExpected = (input: number) => Promise<string[]>;
export type PipeAsyncStreamZipWithIsStrict = Expect<
  Equal<typeof pipeAsyncStreamZipWith, PipeAsyncStreamZipWithExpected>
>;

export const pipeAsyncSideEffectStream = pipeAsyncSideEffect(
  (end: number) => range(0, end),
  streamConcatNumber,
  streamToArrayNumber,
  async (values: number[]) => (values.length > 0 ? values : SideEffect.of(() => 'EMPTY' as const))
);

type PipeAsyncSideEffectStreamExpected = (input: number | SideEffect<any>) => Promise<number[] | SideEffect<any>>;
export type PipeAsyncSideEffectStreamIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectStream, PipeAsyncSideEffectStreamExpected>
>;

export const pipeAsyncSideEffectStrictStream = pipeAsyncSideEffectStrict(
  (end: number) => range(0, end),
  streamAppendNumber,
  streamToArrayNumber,
  async (values: number[]) => (values.length > 0 ? values : SideEffect.of(() => 'EMPTY' as const))
);

export const pipeAsyncSideEffectStrictStreamResult = pipeAsyncSideEffectStrictStream(3);

type PipeAsyncSideEffectStrictStreamResultExpected = Promise<number[] | SideEffect<'EMPTY'>>;
export type PipeAsyncSideEffectStrictStreamResultIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectStrictStreamResult, PipeAsyncSideEffectStrictStreamResultExpected>
>;

type PipeAsyncSideEffectStrictStreamResolved = Awaited<typeof pipeAsyncSideEffectStrictStreamResult>;
type PipeAsyncSideEffectStrictStreamEffects = EffectUnion<PipeAsyncSideEffectStrictStreamResolved>;
export type PipeAsyncSideEffectStrictStreamEffectsIsStrict = Expect<
  Equal<PipeAsyncSideEffectStrictStreamEffects, 'EMPTY'>
>;

type PipeAsyncSideEffectStrictStreamValue = ValueUnion<PipeAsyncSideEffectStrictStreamResolved>;
export type PipeAsyncSideEffectStrictStreamValueIsStrict = Expect<
  Equal<PipeAsyncSideEffectStrictStreamValue, number[]>
>;
