import type {
  InputFor,
  AnyIterableInput,
  AsyncIterableInput,
  PromiseLikeValue,
  InputItem,
  IteratorResultFor
} from './utils';
import { isAsyncInput, isIterable, requireSync } from './utils';
import toAsync from './toAsync';

/** flatMap - preserve source element types and execution mode. */
function flatMap<I extends AnyIterableInput<unknown>, R>(
  fn: (value: InputItem<I>) => Iterable<R>
): (iterable: I) => IteratorResultFor<I, R>;
function flatMap<T, R>(fn: (value: T) => Iterable<R>): <I extends InputFor<T>>(iterable: I) => IteratorResultFor<I, R>;
function flatMap<I extends AsyncIterableInput<unknown>, R>(
  fn: (value: InputItem<I>) => Iterable<R> | PromiseLike<Iterable<R>>
): (iterable: I) => AsyncIterableIterator<Awaited<R>>;
function flatMap<T, R>(
  fn: (value: T) => Iterable<R> | PromiseLike<Iterable<R>>
): (iterable: AsyncIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<Awaited<R>>;
function flatMap<I extends AnyIterableInput<unknown>, R>(
  fn: (value: InputItem<I>) => Iterable<R>,
  iterable: I
): IteratorResultFor<I, R>;
function flatMap<I extends AsyncIterableInput<unknown>, R>(
  fn: (value: InputItem<I>) => Iterable<R> | PromiseLike<Iterable<R>>,
  iterable: I
): AsyncIterableIterator<Awaited<R>>;
function flatMap<T, R>(
  fn: (value: T) => Iterable<R> | PromiseLike<Iterable<R>>,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => flatMap(fn, next as never);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        const mapped = await fn(item as T);
        for (const inner of mapped) {
          yield inner;
        }
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      for (const item of iterable) {
        const mapped = requireSync(fn(item as T), 'flatMap') as Iterable<R>;
        for (const inner of mapped) {
          yield inner;
        }
      }
    })();
  }

  throw new TypeError('flatMap: input is not iterable');
}

export default flatMap;
