import {
  pipe,
  pipeAsync,
  pipeSideEffect,
  pipeAsyncSideEffect,
  evolve,
  merge,
  mergeDeep,
  path,
  assocPath,
  getOrElse,
  map,
  every,
  compose,
  from
} from '../../index';
import * as stream from '../../stream/index';
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

declare const optionalTransforms: { count?: (n: number) => string };
export const maybeTransformed = evolve(optionalTransforms, { count: 1, label: 'one' });
export type OptionalTransform = Expect<Equal<typeof maybeTransformed.count, string | number>>;
declare const union: { kind: 'a'; value: number } | { kind: 'b'; value: string };
export const unionMerge = merge(union, { value: false });
export type UnionMerge = Expect<Equal<typeof unionMerge.value, boolean>>;
declare const optionalLeft: { count?: string };
declare const optionalRight: { count?: number };
export const optionalBoth = merge(optionalLeft, optionalRight);
export type OptionalBoth = Expect<Equal<typeof optionalBoth.count, string | number | undefined>>;
export type OptionalBothKey = Expect<Equal<{} extends Pick<typeof optionalBoth, 'count'> ? true : false, true>>;
export const symbol = Symbol('nested');
export const symbolic = mergeDeep({ [symbol]: { count: 'old', keep: true } }, { [symbol]: { count: 2 } });
export type Symbolic = Expect<Equal<(typeof symbolic)[typeof symbol], { count: number; keep: boolean }>>;
declare const tuple: readonly [{ name: string }, null];
export const tupleRead = path([0, 'name'], tuple);
export type TupleRead = Expect<Equal<typeof tupleRead, string>>;
export const nullRead = path([1, 'name'], tuple);
export type NullRead = Expect<Equal<typeof nullRead, undefined>>;
export const arrayLength = path(['length'], [1, 2]);
export type ArrayLength = Expect<Equal<typeof arrayLength, number>>;
declare const dynamicPath: string[];
export const dynamicRead = path(dynamicPath, { count: 1 });
export type DynamicRead = Expect<Equal<typeof dynamicRead, unknown>>;
declare const missingUser: { user?: { name: string; id: number } };
export const nestedWrite = assocPath(['user', 'name'], 42, missingUser);
export type NestedWrite = Expect<Equal<typeof nestedWrite.user.name, 42>>;
declare const readonlyMaybe: readonly { name: string }[] | undefined;
export const readonlyDefault = pipe(readonlyMaybe, getOrElse([]));
export type ReadonlyDefault = Expect<Equal<typeof readonlyDefault, readonly { name: string }[]>>;
// @ts-expect-error the fallback must not turn an existing readonly array mutable
readonlyDefault.push({ name: 'Ada' });
export const readonlyFallback = pipe(
  readonlyMaybe,
  getOrElse([]),
  map((x) => x.name)
);
export type ReadonlyFallback = Expect<Equal<typeof readonlyFallback, string[]>>;
declare const nullable: readonly (string | null)[];
if (every((x) => x !== null, nullable)) {
  nullable.forEach((x) => x.toUpperCase());
}

const savedMap = stream.map((n: number) => n.toFixed());
export const savedMapped = savedMap([1, 2]);
export type SavedMapped = Expect<Equal<typeof savedMapped, IterableIterator<string>>>;
export const savedMappedAsync = savedMap(Promise.resolve([Promise.resolve(1)]));
export type SavedMappedAsync = Expect<Equal<typeof savedMappedAsync, AsyncIterableIterator<string>>>;
// @ts-expect-error a sync source still contains Promise elements
savedMap([Promise.resolve(1)]);
const savedPromiseMap = stream.map((n: Promise<number>) => n.then((x) => x.toFixed()));
// @ts-expect-error async sources unwrap elements before callbacks
savedPromiseMap(Promise.resolve([Promise.resolve(1)]));
const savedAsyncFilter = stream.filter(async (n: Promise<number>) => (await n) > 0);
// @ts-expect-error async predicates receive resolved elements
savedAsyncFilter(Promise.resolve([Promise.resolve(1)]));
// @ts-expect-error async predicates need an async source even through partial application
stream.filter(async (n: number) => n > 0)([1, 2]);
// @ts-expect-error async accumulation requires an async source
stream.scan(async (sum: number, n: number) => sum + n, 0)([1, 2]);
// @ts-expect-error Promise-valued initial accumulators are not synchronous values
stream.reduce((sum: Promise<number>) => sum, Promise.resolve(0), [1, 2]);
export const zippedPromises = stream.zip([Promise.resolve('a')], Promise.resolve([1]));
export type ZippedPromises = Expect<Equal<typeof zippedPromises, AsyncIterableIterator<[number, string]>>>;
export const rawPromises = stream.zip([Promise.resolve('a')], [1]);
export type RawPromises = Expect<Equal<typeof rawPromises, IterableIterator<[number, Promise<string>]>>>;
export const streamedDeep = pipe(
  [[1], [2, [3]]],
  stream.flattenDeep,
  stream.map((n) => n.toFixed()),
  stream.toArray
);
export type StreamedDeep = Expect<Equal<typeof streamedDeep, Promise<string[]>>>;
export const streamedFlat = pipe([[1], [2]], stream.flatten, stream.map(n => n.toFixed()), stream.toArray);
export type StreamedFlat = Expect<Equal<typeof streamedFlat, Promise<string[]>>>;
// @ts-expect-error sync flatten cannot iterate a Promise as an inner iterable
stream.flatten([Promise.resolve([1, 2])]);
export const asyncEffectStream = pipeAsyncSideEffect(
  [1, 2],
  stream.take(1),
  stream.map((n) => n.toFixed()),
  stream.toArray
);
export type AsyncEffectStream = Expect<Equal<typeof asyncEffectStream, Promise<string[]>>>;
export const asyncArray = pipeAsync(
  [1, 2],
  map((n) => n.toFixed())
);
export type AsyncArray = Expect<Equal<typeof asyncArray, Promise<string[]>>>;
export const effectArray = pipeSideEffect(
  [1, 2],
  map((n) => n.toFixed())
);
export type EffectArray = Expect<Equal<typeof effectArray, string[]>>;
const step = (n: number) => n + 1;
export const composedLong = compose(step, step, step, step, step, step, step, step, step, step, from(0));
export type ComposedLong = Expect<Equal<ReturnType<typeof composedLong>, number>>;
// @ts-expect-error a long typed fallback still checks adjacent functions
compose((s: string) => s.length, step, step, step, step, step, step, step, step, step, from(0));
