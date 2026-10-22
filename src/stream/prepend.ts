import type { AnyIterableInput, PromiseLikeValue, InputItem, IteratorResultFor } from './utils';
import { awaitValue, isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** prepend - preserve source element types and execution mode. */
function prepend<V>(
  value: V
): <I extends AnyIterableInput<unknown>>(iterable: I) => IteratorResultFor<I, InputItem<I> | V>;
function prepend<I extends AnyIterableInput<unknown>, V>(value: V, iterable: I): IteratorResultFor<I, InputItem<I> | V>;
function prepend<T>(value: PromiseLikeValue<T>, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => prepend(value, next as never);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      yield await awaitValue(value);
      for await (const item of toAsync(iterable)) {
        yield item as T;
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      yield value as T;
      for (const item of iterable) {
        yield item as T;
      }
    })();
  }

  throw new TypeError('prepend: input is not iterable');
}

export default prepend;
