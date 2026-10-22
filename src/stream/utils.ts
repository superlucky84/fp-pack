type AnyIterable<T> = Iterable<T> | AsyncIterable<T>;
type AsyncIterableInput<T> = AsyncIterable<T> | PromiseLike<AnyIterable<T>>;
type AnyIterableInput<T> = Iterable<T> | AsyncIterableInput<T>;

type PromiseLikeValue<T> = T | PromiseLike<T>;
type InputFor<T> = Iterable<T> | (Awaited<T> extends T ? AsyncIterableInput<PromiseLikeValue<T>> : never);

type InputItem<I> =
  I extends PromiseLike<infer P>
    ? Awaited<InputItem<P>>
    : I extends AsyncIterable<infer T>
      ? Awaited<T>
      : I extends Iterable<infer T>
        ? T
        : never;
type IteratorResultFor<I, R> = I extends AsyncIterable<unknown> | PromiseLike<unknown>
  ? AsyncIterableIterator<Awaited<R>>
  : IterableIterator<R>;
type ScalarResultFor<I, R> = I extends AsyncIterable<unknown> | PromiseLike<unknown> ? Promise<Awaited<R>> : R;
type CombinedIterator<I, O, R> = I extends AsyncIterable<unknown> | PromiseLike<unknown>
  ? AsyncIterableIterator<Awaited<R>>
  : IteratorResultFor<O, R>;
type CombinedItem<I, O> = I extends AsyncIterable<unknown> | PromiseLike<unknown>
  ? Awaited<InputItem<I>>
  : O extends AsyncIterable<unknown> | PromiseLike<unknown>
    ? Awaited<InputItem<I>>
    : InputItem<I>;

const isPromiseLike = (value: unknown): value is PromiseLike<unknown> =>
  (typeof value === 'object' || typeof value === 'function') &&
  value !== null &&
  typeof (value as PromiseLike<unknown>).then === 'function';

const isAsyncIterable = (value: unknown): value is AsyncIterable<unknown> =>
  (typeof value === 'object' || typeof value === 'function') &&
  value !== null &&
  Symbol.asyncIterator in value &&
  typeof (value as AsyncIterable<unknown>)[Symbol.asyncIterator] === 'function';

const isIterable = (value: unknown): value is Iterable<unknown> =>
  (typeof value === 'string' || typeof value === 'object' || typeof value === 'function') &&
  value !== null &&
  typeof (value as Iterable<unknown>)[Symbol.iterator] === 'function';

const isAsyncInput = (value: unknown): value is PromiseLike<AnyIterable<unknown>> | AsyncIterable<unknown> =>
  isPromiseLike(value) || isAsyncIterable(value);

const resolveIterable = async <T>(input: AnyIterableInput<T>): Promise<AnyIterable<T>> =>
  (isPromiseLike(input) ? await input : input) as AnyIterable<T>;

const awaitValue = async <T>(value: PromiseLikeValue<T>): Promise<T> => (isPromiseLike(value) ? await value : value);

const requireSync = <T>(value: T, operation: string): T => {
  if (isPromiseLike(value)) {
    // A JS caller may bypass the static contract. Observe a rejection before
    // reporting the mode error so it cannot become an unhandled rejection.
    void Promise.resolve(value).catch(() => {});
    throw new TypeError(`${operation}: async callback requires toAsync(input)`);
  }
  return value;
};

export type {
  AnyIterable,
  AnyIterableInput,
  AsyncIterableInput,
  PromiseLikeValue,
  InputFor,
  InputItem,
  IteratorResultFor,
  ScalarResultFor,
  CombinedIterator,
  CombinedItem
};
export { isPromiseLike, isAsyncIterable, isIterable, isAsyncInput, resolveIterable, awaitValue, requireSync };
