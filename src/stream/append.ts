import type { AnyIterableInput, PromiseLikeValue, InputItem, IteratorResultFor } from './utils';
import { awaitValue, isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** append - preserve source element types and execution mode. */
function append<V>(
  value: V
): <I extends AnyIterableInput<unknown>>(iterable: I) => IteratorResultFor<I, InputItem<I> | V>;
function append<I extends AnyIterableInput<unknown>, V>(value: V, iterable: I): IteratorResultFor<I, InputItem<I> | V>;
function append<T>(value: PromiseLikeValue<T>, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => append(value, next as never);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        yield item as T;
      }
      yield await awaitValue(value);
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      for (const item of iterable) {
        yield item as T;
      }
      yield value as T;
    })();
  }

  throw new TypeError('append: input is not iterable');
}

export default append;
