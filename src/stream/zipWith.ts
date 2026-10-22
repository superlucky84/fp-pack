import type { AnyIterableInput, PromiseLikeValue, InputFor, InputItem, CombinedItem, CombinedIterator } from './utils';
import { isAsyncInput, isIterable } from './utils';
import toAsync from './toAsync';

/** zipWith - preserve source element types and execution mode. */
function zipWith<I extends AnyIterableInput<unknown>, O extends AnyIterableInput<unknown>, R>(
  fn: (a: CombinedItem<I, O>, b: CombinedItem<O, I>) => R,
  other: O
): (iterable: I) => CombinedIterator<I, O, R>;
function zipWith<A, O extends AnyIterableInput<unknown>, R>(
  fn: (a: A, b: InputItem<O> | Awaited<InputItem<O>>) => R,
  other: O
): <I extends InputFor<A>>(iterable: I) => CombinedIterator<I, O, R>;
function zipWith<I extends AnyIterableInput<unknown>, O extends AnyIterableInput<unknown>, R>(
  fn: (a: CombinedItem<I, O>, b: CombinedItem<O, I>) => R,
  other: O,
  iterable: I
): CombinedIterator<I, O, R>;
function zipWith<A, B, R>(
  fn: (a: A, b: B) => R | PromiseLike<R>,
  other: AnyIterableInput<PromiseLikeValue<B>>,
  iterable?: AnyIterableInput<PromiseLikeValue<A>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<A>>) => zipWith((a, b) => fn(a as A, b as B), other, next as never);
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
          yield await fn(leftResult.value as A, rightResult.value as B);
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
          yield fn(leftResult.value as A, rightResult.value as B) as R;
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

  throw new TypeError('zipWith: input is not iterable');
}

export default zipWith;
