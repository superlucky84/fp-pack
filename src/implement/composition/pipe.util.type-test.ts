import SideEffect from './sideEffect';
import pipe from './pipe';
import pipeHint from './pipeHint';
import pipeSideEffect from './pipeSideEffect';
import pipeSideEffectStrict from './pipeSideEffectStrict';
import pipeStrict from './pipeStrict';
import tap from './tap';
import pipeAsync from '../async/pipeAsync';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import pipeAsyncSideEffectStrict from '../async/pipeAsyncSideEffectStrict';
import pipeAsyncStrict from '../async/pipeAsyncStrict';
import filter from '../array/filter';
import flattenDeep from '../array/flattenDeep';
import map from '../array/map';
import sum from '../math/sum';
import gt from '../equality/gt';
import isEmpty from '../equality/isEmpty';
import when from '../control/when';
import ifElse from '../control/ifElse';
import log from '../debug/log';
import prop from '../object/prop';
import mergeAll from '../object/mergeAll';
import getOrElse from '../nullable/getOrElse';
import mapMaybe from '../nullable/mapMaybe';
import join from '../string/join';
import trim from '../string/trim';
import toUpper from '../string/toUpper';
import streamFilter from '../../stream/filter';
import streamMap from '../../stream/map';
import streamRange from '../../stream/range';
import streamReduce from '../../stream/reduce';
import streamToArray from '../../stream/toArray';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type IsAssignable<A, B> = A extends B ? true : false;
type Expect<T extends true> = T;

type User = {
  name?: string;
};

type TagOwner = {
  tags?: Array<string | null>;
};

type Config = {
  value?: number;
};

const getName = prop('name') as (user: User) => string | undefined;
const getNameOrEmpty = (value: string | undefined): string => value ?? '';
const getTags = prop('tags') as (owner: TagOwner) => Array<string | null> | undefined;
const mergeConfig = mergeAll as (configs: Config[]) => Config;
const getValue = prop('value') as (config: Config) => number | undefined;
const streamMapNumber = streamMap((value: number) => value + 1) as (iterable: Iterable<number>) => IterableIterator<
  number
>;
const streamFilterNumber = streamFilter((value: number) => value > 1) as (
  iterable: Iterable<number>
) => IterableIterator<number>;
const streamReduceNumber = streamReduce((acc: number, value: number) => acc + value, 0) as (
  iterable: Iterable<number>
) => number;
const streamMapAsyncNumber = streamMap(async (value: number) => value + 1) as (
  iterable: Iterable<number>
) => IterableIterator<Promise<number>>;
const streamToArrayNumber = streamToArray<number>;
const trimAsync = async (value: string): Promise<string> => value.trim();

export const pipeArrayControlString = pipe(
  flattenDeep<number>,
  filter(gt(1)),
  map((value: number) => value * 2),
  sum,
  when(gt(10), (value) => value + 1),
  (value) => `${value}`,
  trim,
  toUpper,
  log<string>('total')
);

type PipeArrayControlStringExpected = (input: any[]) => string;
export type PipeArrayControlStringIsStrict = Expect<
  Equal<typeof pipeArrayControlString, PipeArrayControlStringExpected>
>;

export const pipeObjectNullableControl = pipe(
  getName,
  getOrElse(''),
  ifElse(
    (value: string) => value.length > 0,
    toUpper,
    () => 'UNKNOWN'
  ),
  tap((value: string) => value.length)
);

type PipeObjectNullableControlExpected = (input: User) => string;
export type PipeObjectNullableControlIsStrict = Expect<
  Equal<typeof pipeObjectNullableControl, PipeObjectNullableControlExpected>
>;

export const pipeUserNameDataFirst = pipe(
  { name: 'Ada' } as User,
  getName,
  getOrElse(''),
  toUpper
);

type PipeUserNameDataFirstExpected = string;
export type PipeUserNameDataFirstIsStrict = Expect<
  Equal<typeof pipeUserNameDataFirst, PipeUserNameDataFirstExpected>
>;

export const pipeUserNameFnFirst = pipe(
  getName,
  getOrElse(''),
  toUpper
);

export const pipeUserNameFnFirstResult = pipeUserNameFnFirst({ name: 'Ada' } as User);

type PipeUserNameFnFirstResultExpected = string;
export type PipeUserNameFnFirstResultIsStrict = Expect<
  Equal<typeof pipeUserNameFnFirstResult, PipeUserNameFnFirstResultExpected>
>;

export type PipeUserNameFnFirstMatchesDataFirst = Expect<
  Equal<typeof pipeUserNameFnFirstResult, typeof pipeUserNameDataFirst>
>;

export const pipeStrictUserNameFnFirst = pipeStrict(
  getName,
  getOrElse(''),
  toUpper
);

export type PipeStrictUserNameFnFirstMatchesDefault = Expect<
  Equal<typeof pipeStrictUserNameFnFirst, typeof pipeUserNameFnFirst>
>;

export const pipeStrictUserNameDataFirst = pipeStrict(
  { name: 'Ada' } as User,
  getName,
  getNameOrEmpty,
  trim,
  toUpper
);

type PipeStrictUserNameDataFirstExpected = string;
export type PipeStrictUserNameDataFirstIsStrict = Expect<
  Equal<typeof pipeStrictUserNameDataFirst, PipeStrictUserNameDataFirstExpected>
>;

export const pipeStrictUserNameFnFirstStable = pipeStrict(
  getName,
  getNameOrEmpty,
  trim,
  toUpper
);

export const pipeStrictUserNameFnFirstStableResult = pipeStrictUserNameFnFirstStable({ name: 'Ada' } as User);

export type PipeStrictUserNameDataFirstMatchesFnFirst = Expect<
  Equal<typeof pipeStrictUserNameFnFirstStableResult, typeof pipeStrictUserNameDataFirst>
>;

export const pipeSideEffectTags = pipeSideEffect(
  getTags,
  getOrElse<Array<string | null>>([]),
  mapMaybe((tag: string | null) => (tag ? tag.trim() : null)),
  map((tag: string) => tag.toUpperCase()),
  join('|'),
  (value: string) => (isEmpty(value) ? SideEffect.of(() => 'EMPTY' as const) : value)
);

type PipeSideEffectTagsExpected = (input: TagOwner | SideEffect<any>) => string | SideEffect<any>;
export type PipeSideEffectTagsIsStrict = Expect<Equal<typeof pipeSideEffectTags, PipeSideEffectTagsExpected>>;

export const pipeSideEffectTagsStrict = pipeSideEffectStrict(
  getTags,
  getOrElse<Array<string | null>>([]),
  mapMaybe((tag: string | null) => (tag ? tag.trim() : null)),
  map((tag: string) => tag.toUpperCase()),
  join('|'),
  (value: string) => (isEmpty(value) ? SideEffect.of(() => 'EMPTY' as const) : value)
);

export type PipeSideEffectStrictNarrowerThanDefault = Expect<
  IsAssignable<typeof pipeSideEffectTagsStrict, typeof pipeSideEffectTags>
>;

export const pipeSideEffectStrictConfig = pipeSideEffectStrict(
  mergeConfig,
  getValue,
  getOrElse(0),
  when<number>(gt(0), (value: number) => value + 1),
  (value: number) => (value > 0 ? value : SideEffect.of(() => 'NO_VALUE' as const)),
  (value: number) => value + 1
);

export const pipeSideEffectStrictConfigValue = pipeSideEffectStrictConfig([{ value: 1 }]);

type PipeSideEffectStrictConfigValueExpected = number | SideEffect<'NO_VALUE'>;
export type PipeSideEffectStrictConfigValueIsStrict = Expect<
  Equal<typeof pipeSideEffectStrictConfigValue, PipeSideEffectStrictConfigValueExpected>
>;

export const pipeSideEffectStrictConfigInput = pipeSideEffectStrictConfig(SideEffect.of(() => 'INPUT' as const));

type PipeSideEffectStrictConfigInputExpected = number | SideEffect<'NO_VALUE' | 'INPUT'>;
export type PipeSideEffectStrictConfigInputIsStrict = Expect<
  Equal<typeof pipeSideEffectStrictConfigInput, PipeSideEffectStrictConfigInputExpected>
>;

export const pipeAsyncUserLabel = pipeAsync(
  getName,
  getOrElse(''),
  async (value: string) => value.trim(),
  ifElse(
    (value: string) => value.length > 0,
    toUpper,
    () => 'UNKNOWN'
  ),
  pipeHint<string, string>(log('label'))
);

type PipeAsyncUserLabelExpected = (input: User) => Promise<string>;
export type PipeAsyncUserLabelIsStrict = Expect<Equal<typeof pipeAsyncUserLabel, PipeAsyncUserLabelExpected>>;

export const pipeAsyncUserNameDataFirst = pipeAsync(
  { name: 'Ada' } as User,
  getName,
  getOrElse(''),
  async (value: string) => value.trim(),
  toUpper
);

type PipeAsyncUserNameDataFirstExpected = Promise<string>;
export type PipeAsyncUserNameDataFirstIsStrict = Expect<
  Equal<typeof pipeAsyncUserNameDataFirst, PipeAsyncUserNameDataFirstExpected>
>;

export const pipeAsyncUserNameFnFirst = pipeAsync(
  getName,
  getOrElse(''),
  async (value: string) => value.trim(),
  toUpper
);

export const pipeAsyncUserNameFnFirstResult = pipeAsyncUserNameFnFirst({ name: 'Ada' } as User);

type PipeAsyncUserNameFnFirstResultExpected = Promise<string>;
export type PipeAsyncUserNameFnFirstResultIsStrict = Expect<
  Equal<typeof pipeAsyncUserNameFnFirstResult, PipeAsyncUserNameFnFirstResultExpected>
>;

export type PipeAsyncUserNameFnFirstMatchesDataFirst = Expect<
  Equal<typeof pipeAsyncUserNameFnFirstResult, typeof pipeAsyncUserNameDataFirst>
>;

export const pipeAsyncStrictUserNameFnFirst = pipeAsyncStrict(
  getName,
  getOrElse(''),
  async (value: string) => value.trim(),
  toUpper
);

export type PipeAsyncStrictUserNameFnFirstMatchesDefault = Expect<
  Equal<typeof pipeAsyncStrictUserNameFnFirst, typeof pipeAsyncUserNameFnFirst>
>;

export const pipeAsyncStrictUserNameDataFirst = pipeAsyncStrict(
  { name: 'Ada' } as User,
  getName,
  getNameOrEmpty,
  trimAsync,
  toUpper
);

type PipeAsyncStrictUserNameDataFirstExpected = Promise<string>;
export type PipeAsyncStrictUserNameDataFirstIsStrict = Expect<
  Equal<typeof pipeAsyncStrictUserNameDataFirst, PipeAsyncStrictUserNameDataFirstExpected>
>;

export const pipeAsyncStrictUserNameFnFirstStable = pipeAsyncStrict(
  getName,
  getNameOrEmpty,
  trimAsync,
  toUpper
);

export const pipeAsyncStrictUserNameFnFirstStableResult = pipeAsyncStrictUserNameFnFirstStable({ name: 'Ada' } as User);

export type PipeAsyncStrictUserNameDataFirstMatchesFnFirst = Expect<
  Equal<typeof pipeAsyncStrictUserNameFnFirstStableResult, typeof pipeAsyncStrictUserNameDataFirst>
>;

export const pipeAsyncSideEffectTags = pipeAsyncSideEffect(
  getTags,
  getOrElse<Array<string | null>>([]),
  mapMaybe((tag: string | null) => (tag ? tag.trim() : null)),
  async (tags: string[]) => tags.map((tag: string) => tag.toUpperCase()),
  join('|'),
  (value: string) => (isEmpty(value) ? SideEffect.of(() => 'EMPTY' as const) : value)
);

type PipeAsyncSideEffectTagsExpected = (input: TagOwner | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectTagsIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectTags, PipeAsyncSideEffectTagsExpected>
>;

export const pipeAsyncSideEffectTagsStrict = pipeAsyncSideEffectStrict(
  getTags,
  getOrElse<Array<string | null>>([]),
  mapMaybe((tag: string | null) => (tag ? tag.trim() : null)),
  async (tags: string[]) => tags.map((tag: string) => tag.toUpperCase()),
  join('|'),
  (value: string) => (isEmpty(value) ? SideEffect.of(() => 'EMPTY' as const) : value)
);

export type PipeAsyncSideEffectStrictNarrowerThanDefault = Expect<
  IsAssignable<typeof pipeAsyncSideEffectTagsStrict, typeof pipeAsyncSideEffectTags>
>;

export const pipeAsyncSideEffectStrictConfig = pipeAsyncSideEffectStrict(
  mergeConfig,
  getValue,
  getOrElse(0),
  async (value: number) => value + 1,
  (value: number) => (value > 0 ? value : SideEffect.of(() => 'NO_VALUE' as const)),
  async (value: number) => value + 1
);

export const pipeAsyncSideEffectStrictConfigValue = pipeAsyncSideEffectStrictConfig([{ value: 1 }]);

type PipeAsyncSideEffectStrictConfigValueExpected = Promise<number | SideEffect<'NO_VALUE'>>;
export type PipeAsyncSideEffectStrictConfigValueIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectStrictConfigValue, PipeAsyncSideEffectStrictConfigValueExpected>
>;

export const pipeAsyncSideEffectStrictConfigInput = pipeAsyncSideEffectStrictConfig(
  SideEffect.of(() => 'INPUT' as const)
);

type PipeAsyncSideEffectStrictConfigInputExpected = Promise<number | SideEffect<'NO_VALUE' | 'INPUT'>>;
export type PipeAsyncSideEffectStrictConfigInputIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectStrictConfigInput, PipeAsyncSideEffectStrictConfigInputExpected>
>;

export const pipeStreamSync = pipe(
  (end: number) => streamRange(0, end),
  streamMapNumber,
  streamFilterNumber,
  streamReduceNumber
);

type PipeStreamSyncExpected = (input: number) => number;
export type PipeStreamSyncIsStrict = Expect<Equal<typeof pipeStreamSync, PipeStreamSyncExpected>>;

export const pipeSideEffectStream = pipeSideEffect(
  (end: number) => streamRange(0, end),
  streamMapNumber,
  streamFilterNumber,
  streamReduceNumber,
  (value: number) => (value > 0 ? value : SideEffect.of(() => 'EMPTY' as const))
);

type PipeSideEffectStreamExpected = (input: number | SideEffect<any>) => number | SideEffect<any>;
export type PipeSideEffectStreamIsStrict = Expect<Equal<typeof pipeSideEffectStream, PipeSideEffectStreamExpected>>;

export const pipeSideEffectStrictStream = pipeSideEffectStrict(
  (end: number) => streamRange(0, end),
  streamMapNumber,
  streamFilterNumber,
  streamReduceNumber,
  (value: number) => (value > 0 ? value : SideEffect.of(() => 'EMPTY' as const))
);

export const pipeSideEffectStrictStreamValue = pipeSideEffectStrictStream(3);

type PipeSideEffectStrictStreamValueExpected = number | SideEffect<'EMPTY'>;
export type PipeSideEffectStrictStreamValueIsStrict = Expect<
  Equal<typeof pipeSideEffectStrictStreamValue, PipeSideEffectStrictStreamValueExpected>
>;

export const pipeAsyncStream = pipeAsync(
  (end: number) => streamRange(0, end),
  streamMapAsyncNumber,
  streamToArrayNumber
);

type PipeAsyncStreamExpected = (input: number) => Promise<number[]>;
export type PipeAsyncStreamIsStrict = Expect<Equal<typeof pipeAsyncStream, PipeAsyncStreamExpected>>;

export const pipeAsyncSideEffectStream = pipeAsyncSideEffect(
  (end: number) => streamRange(0, end),
  streamMapAsyncNumber,
  streamToArrayNumber,
  (value: number[]) => (value.length > 0 ? value : SideEffect.of(() => 'EMPTY' as const))
);

type PipeAsyncSideEffectStreamExpected = (input: number | SideEffect<any>) => Promise<number[] | SideEffect<any>>;
export type PipeAsyncSideEffectStreamIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectStream, PipeAsyncSideEffectStreamExpected>
>;

export const pipeAsyncSideEffectStrictStream = pipeAsyncSideEffectStrict(
  (end: number) => streamRange(0, end),
  streamMapAsyncNumber,
  streamToArrayNumber,
  (value: number[]) => (value.length > 0 ? value : SideEffect.of(() => 'EMPTY' as const))
);

export const pipeAsyncSideEffectStrictStreamValue = pipeAsyncSideEffectStrictStream(3);

type PipeAsyncSideEffectStrictStreamValueExpected = Promise<number[] | SideEffect<'EMPTY'>>;
export type PipeAsyncSideEffectStrictStreamValueIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectStrictStreamValue, PipeAsyncSideEffectStrictStreamValueExpected>
>;
