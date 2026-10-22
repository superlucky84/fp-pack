import { pipe, pipeAsync, pipeSideEffect } from '../index';
import {
  take,
  drop,
  chunk,
  map,
  filter,
  find,
  some,
  every,
  flatMap,
  reduce,
  scan,
  zip,
  zipWith,
  concat,
  append,
  prepend,
  toArray,
  toAsync
} from './index';
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;
const numbers = [1, 2, 3];
const firstTwo = take(2);
export const savedSync = firstTwo(numbers);
export const savedAsync = firstTwo(Promise.resolve(numbers));
export type SavedSync = Expect<Equal<typeof savedSync, IterableIterator<number>>>;
export type SavedAsync = Expect<Equal<typeof savedAsync, AsyncIterableIterator<number>>>;
export const inlineSync = pipe(
  numbers,
  drop(1),
  take(2),
  map((n) => n.toFixed()),
  toArray
);
export type InlineSync = Expect<Equal<typeof inlineSync, Promise<string[]>>>;
export const inlineAsync = pipe(
  Promise.resolve(numbers),
  take(2),
  map((n) => n.toFixed()),
  toArray
);
export type InlineAsync = Expect<Equal<typeof inlineAsync, Promise<string[]>>>;
export const asyncPredicate = pipe(
  numbers,
  toAsync,
  filter(async (n) => n > 1),
  toArray
);
export type AsyncPredicate = Expect<Equal<typeof asyncPredicate, Promise<number[]>>>;
export const lazyAsyncMap = pipe(
  numbers,
  map(async (n) => n * 2),
  toArray
);
export type LazyAsyncMap = Expect<Equal<typeof lazyAsyncMap, Promise<number[]>>>;
declare const nullable: (string | null)[];
export const narrowed = pipe(
  nullable,
  filter((x) => x !== null),
  map((x) => x.toUpperCase()),
  toArray
);
export type Narrowed = Expect<Equal<typeof narrowed, Promise<string[]>>>;
export const found = pipe(
  nullable,
  find((x) => x !== null)
);
export type Found = Expect<Equal<typeof found, string | undefined>>;
export const grouped = pipe(
  numbers,
  chunk(2),
  map((xs) => xs.reduce((a, b) => a + b, 0)),
  toArray
);
export type Grouped = Expect<Equal<typeof grouped, Promise<number[]>>>;
const withLabels = zip(['a', 'b']);
export const zipped = pipe(
  numbers,
  withLabels,
  map(([n, s]) => n.toFixed() + s),
  toArray
);
export type Zipped = Expect<Equal<typeof zipped, Promise<string[]>>>;
export const zippedAsync = withLabels(Promise.resolve(numbers));
export type ZippedAsync = Expect<Equal<typeof zippedAsync, AsyncIterableIterator<[number, string]>>>;
export const appended = pipe(Promise.resolve(numbers), concat([4]), append(5), prepend(0), toArray);
export type Appended = Expect<Equal<typeof appended, Promise<number[]>>>;
export const sum = pipe(
  numbers,
  reduce((acc, n) => acc + n, 0)
);
export type Sum = Expect<Equal<typeof sum, number>>;
export const asyncSum = pipe(
  numbers,
  toAsync,
  reduce(async (acc, n) => acc + n, 0)
);
export type AsyncSum = Expect<Equal<typeof asyncSum, Promise<number>>>;
export const scanAsync = pipe(
  numbers,
  toAsync,
  scan(async (acc, n) => acc + n, 0),
  toArray
);
export type ScanAsync = Expect<Equal<typeof scanAsync, Promise<number[]>>>;
export const withAsyncPipe = pipeAsync(
  numbers,
  take(2),
  map((n) => n.toFixed()),
  toArray
);
export type WithAsyncPipe = Expect<Equal<typeof withAsyncPipe, Promise<string[]>>>;
export const withEffectPipe = pipeSideEffect(
  numbers,
  take(2),
  map((n) => n.toFixed())
);
export type WithEffectPipe = Expect<Equal<typeof withEffectPipe, IterableIterator<string>>>;
// @ts-expect-error async predicates require an async source
filter(async (n) => n > 1, numbers);
// @ts-expect-error async flatMap requires an async source
flatMap(async (n) => [n * 2], numbers);
// @ts-expect-error async some requires an async source
some(async (n) => n > 1, numbers);
// @ts-expect-error async every requires an async source
every(async (n) => n > 1, numbers);
// @ts-expect-error async find requires an async source
find(async (n) => n > 1, numbers);
// @ts-expect-error async reduce requires an async source
reduce(async (acc, n) => acc + n, 0, numbers);
pipe(
  numbers,
  map((n) => {
    // @ts-expect-error callback input must not become any
    return n.toUpperCase();
  })
);
export const zipMap = pipe(
  numbers,
  zipWith((n, s) => n.toFixed() + s, ['a']),
  toArray
);
export type ZipMap = Expect<Equal<typeof zipMap, Promise<string[]>>>;
