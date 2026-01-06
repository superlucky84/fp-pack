import SideEffect from './sideEffect';
import pipe from './pipe';
import pipeSideEffect from './pipeSideEffect';
import pipeSideEffectStrict from './pipeSideEffectStrict';
import pipeAsync from '../async/pipeAsync';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import pipeAsyncSideEffectStrict from '../async/pipeAsyncSideEffectStrict';
import reduce from '../array/reduce';
import groupBy from '../array/groupBy';
import sortBy from '../array/sortBy';
import uniqBy from '../array/uniqBy';
import zip from '../array/zip';
import flatMap from '../array/flatMap';
import find from '../array/find';
import some from '../array/some';
import every from '../array/every';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;
type EffectUnion<T> = Extract<T, SideEffect<any>> extends SideEffect<infer E> ? E : never;
type ValueUnion<T> = Exclude<T, SideEffect<any>>;

type User = {
  id: number;
  score: number;
  active: boolean;
  tags: string[];
};

const sortByScore = sortBy((user: User) => user.score);
const uniqById = uniqBy((user: User) => user.id);
const listTags = flatMap((user: User) => user.tags);
const sumTagLengths = reduce((acc: number, tag: string) => acc + tag.length, 0);

export const pipeArrayTagScore = pipe(
  sortByScore,
  uniqById,
  listTags,
  sumTagLengths
);

type PipeArrayTagScoreExpected = (input: User[]) => number;
export type PipeArrayTagScoreIsStrict = Expect<Equal<typeof pipeArrayTagScore, PipeArrayTagScoreExpected>>;

const groupByActive = groupBy((user: User) => (user.active ? 'active' : 'inactive'));
const findHighScore = find((user: User) => user.score > 80);

export const pipeArrayFindActive = pipe(
  groupByActive,
  (groups) => groups.active ?? [],
  findHighScore,
  (user) => (user ? user.id : undefined)
);

type PipeArrayFindActiveExpected = (input: User[]) => number | undefined;
export type PipeArrayFindActiveIsStrict = Expect<Equal<typeof pipeArrayFindActive, PipeArrayFindActiveExpected>>;

export const pipeArrayZipSome = pipe(
  zip([10, 20, 30]) as (values: number[]) => Array<[number, number]>,
  some((pair: [number, number]) => pair[0] > pair[1])
);

type PipeArrayZipSomeExpected = (input: number[]) => boolean;
export type PipeArrayZipSomeIsStrict = Expect<Equal<typeof pipeArrayZipSome, PipeArrayZipSomeExpected>>;

export const pipeArrayEveryUnique = pipe(
  uniqBy((value: number) => value),
  every((value: number) => value > 0)
);

type PipeArrayEveryUniqueExpected = (input: number[]) => boolean;
export type PipeArrayEveryUniqueIsStrict = Expect<Equal<typeof pipeArrayEveryUnique, PipeArrayEveryUniqueExpected>>;

const findActive = find((user: User) => user.active);

export const pipeSideEffectArray = pipeSideEffect(
  sortByScore,
  findActive,
  (user) => (user ? user : SideEffect.of(() => 'NOT_FOUND' as const))
);

type PipeSideEffectArrayExpected = (input: User[] | SideEffect<any>) => User | SideEffect<any>;
export type PipeSideEffectArrayIsStrict = Expect<Equal<typeof pipeSideEffectArray, PipeSideEffectArrayExpected>>;

export const pipeSideEffectStrictArray = pipeSideEffectStrict(
  zip([1, 2, 3]) as (values: number[]) => Array<[number, number]>,
  (pairs) => (every((pair: [number, number]) => pair[0] >= pair[1], pairs)
    ? pairs
    : SideEffect.of(() => 'NOT_ORDERED' as const)),
  (pairs) => pairs.length
);

export const pipeSideEffectStrictArrayResult = pipeSideEffectStrictArray([3, 2, 1]);

type PipeSideEffectStrictArrayResultExpected = number | SideEffect<'NOT_ORDERED'>;
export type PipeSideEffectStrictArrayResultIsStrict = Expect<
  Equal<typeof pipeSideEffectStrictArrayResult, PipeSideEffectStrictArrayResultExpected>
>;

type PipeSideEffectStrictArrayEffects = EffectUnion<typeof pipeSideEffectStrictArrayResult>;
export type PipeSideEffectStrictArrayEffectsIsStrict = Expect<Equal<PipeSideEffectStrictArrayEffects, 'NOT_ORDERED'>>;

type PipeSideEffectStrictArrayValue = ValueUnion<typeof pipeSideEffectStrictArrayResult>;
export type PipeSideEffectStrictArrayValueIsStrict = Expect<Equal<PipeSideEffectStrictArrayValue, number>>;

export const pipeAsyncArray = pipeAsync(
  flatMap((value: number) => [value, value * 2]),
  reduce((acc: number, value: number) => acc + value, 0),
  async (total) => `${total}`
);

type PipeAsyncArrayExpected = (input: number[]) => Promise<string>;
export type PipeAsyncArrayIsStrict = Expect<Equal<typeof pipeAsyncArray, PipeAsyncArrayExpected>>;

export const pipeAsyncSideEffectArray = pipeAsyncSideEffect(
  uniqBy((value: number) => value) as (values: number[]) => number[],
  some((value: number) => value > 5) as (values: number[]) => boolean,
  async (hasLarge) => (hasLarge ? hasLarge : SideEffect.of(() => 'NO_LARGE' as const))
);

type PipeAsyncSideEffectArrayExpected = (input: number[] | SideEffect<any>) => Promise<boolean | SideEffect<any>>;
export type PipeAsyncSideEffectArrayIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectArray, PipeAsyncSideEffectArrayExpected>
>;

export const pipeAsyncSideEffectStrictArray = pipeAsyncSideEffectStrict(
  groupBy((user: User) => (user.active ? 'active' : 'inactive')),
  async (groups) => (groups.active && groups.active.length > 0 ? groups : SideEffect.of(() => 'NO_ACTIVE' as const)),
  (groups) => Object.keys(groups)
);

export const pipeAsyncSideEffectStrictArrayResult = pipeAsyncSideEffectStrictArray([] as User[]);

type PipeAsyncSideEffectStrictArrayResultExpected = Promise<string[] | SideEffect<'NO_ACTIVE'>>;
export type PipeAsyncSideEffectStrictArrayResultIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectStrictArrayResult, PipeAsyncSideEffectStrictArrayResultExpected>
>;

type PipeAsyncSideEffectStrictArrayResolved = Awaited<typeof pipeAsyncSideEffectStrictArrayResult>;
type PipeAsyncSideEffectStrictArrayEffects = EffectUnion<PipeAsyncSideEffectStrictArrayResolved>;
export type PipeAsyncSideEffectStrictArrayEffectsIsStrict = Expect<
  Equal<PipeAsyncSideEffectStrictArrayEffects, 'NO_ACTIVE'>
>;

type PipeAsyncSideEffectStrictArrayValue = ValueUnion<PipeAsyncSideEffectStrictArrayResolved>;
export type PipeAsyncSideEffectStrictArrayValueIsStrict = Expect<
  Equal<PipeAsyncSideEffectStrictArrayValue, string[]>
>;
