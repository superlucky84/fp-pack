import type { AnyIterableInput, PromiseLikeValue, InputItem, IteratorResultFor } from './utils';
import { awaitValue, isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** flattenDeep - lazily flatten nested iterables */
type DeepLeaf<T, Depth extends unknown[] = []> = Depth['length'] extends 16
  ? unknown
  : T extends string
    ? T
    : T extends Iterable<infer Item>
      ? DeepLeaf<Item, [...Depth, 0]>
      : T;
function flattenDeep<I extends AnyIterableInput<unknown>>(iterable: I): IteratorResultFor<I, DeepLeaf<InputItem<I>>>;
function flattenDeep(iterable: AnyIterableInput<unknown>): any {
  const walkSync = function* (value: unknown): IterableIterator<unknown> {
    if (typeof value !== 'string' && isIterable(value)) {
      for (const item of value as Iterable<unknown>) {
        yield* walkSync(item);
      }
      return;
    }
    yield value;
  };

  if (isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        const resolved = await awaitValue(item as PromiseLikeValue<unknown>);
        for (const inner of walkSync(resolved)) {
          yield inner;
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
