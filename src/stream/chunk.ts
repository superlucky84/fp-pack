import type { AnyIterableInput, PromiseLikeValue, InputItem, IteratorResultFor } from './utils';
import { awaitValue, isAsyncIterable, isIterable, isPromiseLike } from './utils';
import toAsync from './toAsync';

const chunkIterable = function* <T>(size: number, iterable: Iterable<T>): IterableIterator<T[]> {
  const chunkSize = Math.floor(size);
  if (!Number.isFinite(chunkSize) || chunkSize <= 0) {
    return;
  }

  let buffer: T[] = [];
  for (const item of iterable) {
    buffer.push(item);
    if (buffer.length >= chunkSize) {
      yield buffer;
      buffer = [];
    }
  }

  if (buffer.length > 0) {
    yield buffer;
  }
};

const chunkAsyncIterable = async function* <T>(size: number, iterable: AsyncIterable<T>): AsyncIterableIterator<T[]> {
  const chunkSize = Math.floor(size);
  if (!Number.isFinite(chunkSize) || chunkSize <= 0) {
    return;
  }

  let buffer: T[] = [];
  for await (const item of iterable) {
    buffer.push(item);
    if (buffer.length >= chunkSize) {
      yield buffer;
      buffer = [];
    }
  }

  if (buffer.length > 0) {
    yield buffer;
  }
};

function chunk(
  size: number
): <I extends AnyIterableInput<unknown>>(iterable: I) => IteratorResultFor<I, InputItem<I>[]>;
function chunk<I extends AnyIterableInput<unknown>>(size: number, iterable: I): IteratorResultFor<I, InputItem<I>[]>;
function chunk<T>(size: number, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (nextIterable: AnyIterableInput<PromiseLikeValue<T>>) => chunk(size, nextIterable);
  }

  if (isPromiseLike(iterable)) {
    return chunkAsyncIterable(size, toAsync(iterable));
  }

  if (isAsyncIterable(iterable)) {
    return chunkAsyncIterable(
      size,
      (async function* () {
        for await (const item of iterable) {
          yield await awaitValue(item as PromiseLikeValue<T>);
        }
      })()
    );
  }

  if (isIterable(iterable)) {
    return chunkIterable(size, iterable as Iterable<T>);
  }

  throw new TypeError('chunk: input is not iterable');
}

export default chunk;
