import type { InputFor, AnyIterableInput, PromiseLikeValue, InputItem, IteratorResultFor } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** map - preserve source element types and execution mode. */
function map<I extends AnyIterableInput<unknown>, R>(
  fn: (value: InputItem<I>) => R
): (iterable: I) => IteratorResultFor<I, R>;
function map<T, R>(fn: (value: T) => R): <I extends InputFor<T>>(iterable: I) => IteratorResultFor<I, R>;
function map<I extends AnyIterableInput<unknown>, R>(
  fn: (value: InputItem<I>) => R,
  iterable: I
): IteratorResultFor<I, R>;
function map<T, R>(fn: (value: T) => R | PromiseLike<R>, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => map(fn, next as never);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        yield await fn(item as T);
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      for (const item of iterable) {
        yield fn(item as T) as R;
      }
    })();
  }

  throw new TypeError('map: input is not iterable');
}

export default map;
