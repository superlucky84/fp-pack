import type { AnyIterableInput, PromiseLikeValue } from './utils';
import { awaitValue, isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** flattenDeep - lazily flatten nested iterables */
function flattenDeep<T>(iterable: Iterable<unknown>): IterableIterator<T>;
function flattenDeep<T>(iterable: AnyIterableInput<PromiseLikeValue<unknown>>): AsyncIterableIterator<T>;
function flattenDeep<T>(iterable: AnyIterableInput<PromiseLikeValue<unknown>>): any {
  const walkSync = function* (value: unknown): IterableIterator<T> {
    if (isIterable(value)) {
      for (const item of value as Iterable<unknown>) {
        yield* walkSync(item);
      }
      return;
    }
    yield value as T;
  };

  if (isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        const resolved = await awaitValue(item as PromiseLikeValue<unknown>);
        for (const inner of walkSync(resolved)) {
          yield inner as T;
        }
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      for (const item of iterable as Iterable<unknown>) {
        yield* walkSync(item);
      }
    })();
  }

  throw new TypeError('flattenDeep: input is not iterable');
}

export default flattenDeep;
