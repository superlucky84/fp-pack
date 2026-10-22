import type {
  InputFor,
  AnyIterableInput,
  AsyncIterableInput,
  PromiseLikeValue,
  InputItem,
  ScalarResultFor
} from './utils';
import { isAsyncInput, isIterable, requireSync } from './utils';
import toAsync from './toAsync';

/** reduce - preserve source element types and execution mode. */
function reduce<I extends AnyIterableInput<unknown>, R>(
  fn: (acc: R, value: InputItem<I>) => R,
  initial: R
): (iterable: I) => ScalarResultFor<I, R>;
function reduce<T, R>(
  fn: (acc: R, value: T) => R,
  initial: R
): <I extends InputFor<T>>(iterable: I) => ScalarResultFor<I, R>;
function reduce<I extends AsyncIterableInput<unknown>, R>(
  fn: (acc: R, value: InputItem<I>) => R | PromiseLike<R>,
  initial: R
): (iterable: I) => Promise<Awaited<R>>;
function reduce<T, R>(
  fn: (acc: R, value: T) => R | PromiseLike<R>,
  initial: R
): (iterable: AsyncIterableInput<PromiseLikeValue<T>>) => Promise<Awaited<R>>;
function reduce<I extends AnyIterableInput<unknown>, R>(
  fn: (acc: R, value: InputItem<I>) => R,
  initial: R,
  iterable: I
): ScalarResultFor<I, R>;
function reduce<I extends AsyncIterableInput<unknown>, R>(
  fn: (acc: R, value: InputItem<I>) => R | PromiseLike<R>,
  initial: R,
  iterable: I
): Promise<Awaited<R>>;
function reduce<T, R>(
  fn: (acc: R, value: T) => R | PromiseLike<R>,
  initial: R,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => reduce(fn, initial, next as never);
  }

  if (isAsyncInput(iterable)) {
    return (async () => {
      let acc = initial;
      for await (const item of toAsync(iterable)) {
        acc = await fn(acc, item as T);
      }
      return acc;
    })();
  }

  if (isIterable(iterable)) {
    let acc = initial;
    for (const item of iterable) {
      acc = requireSync(fn(acc, item as T), 'reduce') as R;
    }
    return acc;
  }

  throw new TypeError('reduce: input is not iterable');
}

export default reduce;
