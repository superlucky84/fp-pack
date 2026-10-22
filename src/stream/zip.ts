import type { AnyIterableInput, PromiseLikeValue, CombinedItem, CombinedIterator } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** zip - preserve source element types and execution mode. */
function zip<O extends AnyIterableInput<unknown>>(
  other: O
): <I extends AnyIterableInput<unknown>>(
  iterable: I
) => CombinedIterator<I, O, [CombinedItem<I, O>, CombinedItem<O, I>]>;
function zip<I extends AnyIterableInput<unknown>, O extends AnyIterableInput<unknown>>(
  other: O,
  iterable: I
): CombinedIterator<I, O, [CombinedItem<I, O>, CombinedItem<O, I>]>;
function zip<A, B>(
  other: AnyIterableInput<PromiseLikeValue<B>>,
  iterable?: AnyIterableInput<PromiseLikeValue<A>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<A>>) => zip(other, next as never);
  }

  if (isAsyncInput(other) || isAsyncInput(iterable)) {
    return (async function* () {
      const left = toAsync(iterable);
      const right = toAsync(other);
      const leftIter = left[Symbol.asyncIterator]();
      const rightIter = right[Symbol.asyncIterator]();

      try {
        while (true) {
          const [leftResult, rightResult] = await Promise.all([leftIter.next(), rightIter.next()]);
          if (leftResult.done || rightResult.done) {
            return;
          }
          yield [leftResult.value as A, rightResult.value as B];
        }
      } finally {
        try {
          await leftIter.return?.();
        } finally {
          await rightIter.return?.();
        }
      }
    })();
  }

  if (isIterable(iterable) && isIterable(other)) {
    return (function* () {
      const leftIter = (iterable as Iterable<A>)[Symbol.iterator]();
      const rightIter = (other as Iterable<B>)[Symbol.iterator]();

      try {
        while (true) {
          const leftResult = leftIter.next();
          const rightResult = rightIter.next();
          if (leftResult.done || rightResult.done) {
            return;
          }
          yield [leftResult.value as A, rightResult.value as B];
        }
      } finally {
        try {
          leftIter.return?.();
        } finally {
          rightIter.return?.();
        }
      }
    })();
  }

  throw new TypeError('zip: input is not iterable');
}

export default zip;
