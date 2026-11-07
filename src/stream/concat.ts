import type { AnyIterableInput, PromiseLikeValue, InputItem, CombinedIterator } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** concat - preserve source element types and execution mode. */
function concat<O extends AnyIterableInput<unknown>>(
  other: O
): <I extends AnyIterableInput<unknown>>(iterable: I) => CombinedIterator<I, O, InputItem<I> | InputItem<O>>;
function concat<I extends AnyIterableInput<unknown>, O extends AnyIterableInput<unknown>>(
  other: O,
  iterable: I
): CombinedIterator<I, O, InputItem<I> | InputItem<O>>;
function concat<T>(
  other: AnyIterableInput<PromiseLikeValue<T>>,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => concat(other, next as never);
  }

  if (isAsyncInput(other) || isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        yield item as T;
      }
      for await (const item of toAsync(other)) {
        yield item as T;
      }
    })();
  }

  if (isIterable(iterable) && isIterable(other)) {
    return (function* () {
      for (const item of iterable) {
        yield item as T;
      }
      for (const item of other as Iterable<T>) {
        yield item as T;
      }
    })();
  }

  throw new TypeError('concat: input is not iterable');
}

export default concat;
