import compose from './compose';
import filter from '../array/filter';
import flattenDeep from '../array/flattenDeep';
import map from '../array/map';
import sum from '../math/sum';
import gt from '../equality/gt';
import when from '../control/when';
import ifElse from '../control/ifElse';
import log from '../debug/log';
import tap from './tap';
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
const getTags = prop('tags') as (owner: TagOwner) => Array<string | null> | undefined;
const mergeConfig = mergeAll as (configs: Config[]) => Config;
const getValue = prop('value') as (config: Config) => number | undefined;
const streamMapNumber = streamMap((value: number) => value + 1) as (iterable: Iterable<number>) => IterableIterator<number>;
const streamFilterNumber = streamFilter((value: number) => value > 1) as (
  iterable: Iterable<number>
) => IterableIterator<number>;
const streamReduceNumber = streamReduce((acc: number, value: number) => acc + value, 0) as (
  iterable: Iterable<number>
) => number;
const streamMapAsyncNumber = streamMap(async (value: number) => value + 1) as (
  iterable: Iterable<number>
) => IterableIterator<Promise<number>>;
const whenPositive = when<number>(gt(0), (value) => value + 1);

export const composeArrayControlString = compose(
  log('total'),
  toUpper,
  trim,
  (value: number) => `${value}`,
  when(gt(10), (value) => value + 1),
  sum,
  map((value: number) => value * 2),
  filter(gt(1)),
  flattenDeep<number>
);

type ComposeArrayControlStringExpected = (input: readonly number[]) => string;
export type ComposeArrayControlStringIsStrict = Expect<
  Equal<typeof composeArrayControlString, ComposeArrayControlStringExpected>
>;

export const composeObjectNullableControl = compose(
  tap((value: string) => value.length),
  ifElse(
    (value: string) => value.length > 0,
    toUpper,
    () => 'UNKNOWN'
  ),
  getOrElse(''),
  getName
);

type ComposeObjectNullableControlExpected = (input: User) => string;
export type ComposeObjectNullableControlIsStrict = Expect<
  Equal<typeof composeObjectNullableControl, ComposeObjectNullableControlExpected>
>;

export const composeTags = compose(
  join('|'),
  map((tag: string) => tag.toUpperCase()),
  mapMaybe((tag: string | null) => (tag ? tag.trim() : null)),
  getOrElse<Array<string | null>>([]),
  getTags
);

type ComposeTagsExpected = (input: TagOwner) => string;
export type ComposeTagsIsStrict = Expect<Equal<typeof composeTags, ComposeTagsExpected>>;

export const composeConfigValue = compose(
  whenPositive,
  getOrElse(0),
  getValue,
  mergeConfig
);

type ComposeConfigValueExpected = (input: Config[]) => number;
export type ComposeConfigValueIsStrict = Expect<Equal<typeof composeConfigValue, ComposeConfigValueExpected>>;

export const composeStreamSync = compose(
  streamReduceNumber,
  streamFilterNumber,
  streamMapNumber,
  (end: number) => streamRange(0, end)
);

type ComposeStreamSyncExpected = (input: number) => number;
export type ComposeStreamSyncIsStrict = Expect<Equal<typeof composeStreamSync, ComposeStreamSyncExpected>>;

export const composeStreamToArray = compose(
  streamToArray,
  streamMapAsyncNumber,
  (end: number) => streamRange(0, end)
);

type ComposeStreamToArrayExpected = (input: number) => Promise<number[]>;
export type ComposeStreamToArrayIsStrict = Expect<Equal<typeof composeStreamToArray, ComposeStreamToArrayExpected>>;
