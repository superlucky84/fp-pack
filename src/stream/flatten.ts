import type { AnyIterableInput, PromiseLikeValue, InputFor, InputItem, IteratorResultFor } from './utils';
import { awaitValue, isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** flatten - lazily flatten iterable of iterables */
function flatten<I extends InputFor<Iterable<unknown>>>(iterable: I): IteratorResultFor<I, InputItem<InputItem<I>>>;
function flatten<T>(iterable: AnyIterableInput<PromiseLikeValue<Iterable<T>>>): any {
  if (isAsyncInput(iterable)) {
    return (async function* () {
      for await (const inner of toAsync(iterable)) {
        const resolved = await awaitValue(inner as PromiseLikeValue<Iterable<T>>);
        for (const item of resolved) {
          yield item as T;
        }
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      for (const inner of iterable as Iterable<Iterable<T>>) {
        for (const item of inner) {
          yield item as T;
        }
      }
    })();
  }

  throw new TypeError('flatten: input is not iterable');
}

export default flatten;
