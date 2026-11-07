import type { AnyIterableInput, PromiseLikeValue, InputItem, IteratorResultFor } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** take - preserve source element types and execution mode. */
function take(count: number): <I extends AnyIterableInput<unknown>>(iterable: I) => IteratorResultFor<I, InputItem<I>>;
function take<I extends AnyIterableInput<unknown>>(count: number, iterable: I): IteratorResultFor<I, InputItem<I>>;
function take<T>(count: number, iterable?: AnyIterableInput<PromiseLikeValue<T>>): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => take(count, next as never);
  }

  const limit = Math.floor(count);
  if (!Number.isFinite(limit) || limit <= 0) {
    return isAsyncInput(iterable) ? (async function* () {})() : (function* () {})();
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      let taken = 0;
      for await (const item of toAsync(iterable)) {
        yield item as T;
        taken += 1;
        if (taken >= limit) {
          break;
        }
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      let taken = 0;
      for (const item of iterable) {
        yield item as T;
        taken += 1;
        if (taken >= limit) {
          break;
        }
      }
    })();
  }

  throw new TypeError('take: input is not iterable');
}

export default take;
