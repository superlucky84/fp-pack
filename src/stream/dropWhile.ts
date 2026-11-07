import type {
  InputFor,
  AnyIterableInput,
  AsyncIterableInput,
  PromiseLikeValue,
  InputItem,
  IteratorResultFor
} from './utils';
import { isAsyncInput, isIterable, requireSync } from './utils';
import toAsync from './toAsync';

/** dropWhile - preserve source element types and execution mode. */
function dropWhile<I extends AnyIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean
): (iterable: I) => IteratorResultFor<I, InputItem<I>>;
function dropWhile<T>(
  predicate: (value: T) => boolean
): <I extends InputFor<T>>(iterable: I) => IteratorResultFor<I, InputItem<I>>;
function dropWhile<I extends AsyncIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean | PromiseLike<boolean>
): (iterable: I) => AsyncIterableIterator<InputItem<I>>;
function dropWhile<T>(
  predicate: (value: T) => boolean | PromiseLike<boolean>
): <I extends Extract<InputFor<T>, AsyncIterableInput<unknown>>>(iterable: I) => AsyncIterableIterator<InputItem<I>>;
function dropWhile<I extends AnyIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean,
  iterable: I
): IteratorResultFor<I, InputItem<I>>;
function dropWhile<I extends AsyncIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean | PromiseLike<boolean>,
  iterable: I
): AsyncIterableIterator<InputItem<I>>;
function dropWhile<T>(
  predicate: (value: T) => boolean | PromiseLike<boolean>,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => dropWhile(predicate, next as never);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      let dropping = true;
      for await (const item of toAsync(iterable)) {
        if (dropping && !(await predicate(item as T))) {
          dropping = false;
        }
        if (!dropping) {
          yield item as T;
        }
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      let dropping = true;
      for (const item of iterable) {
        if (dropping && !requireSync(predicate(item as T), 'dropWhile')) {
          dropping = false;
        }
        if (!dropping) {
          yield item as T;
        }
      }
    })();
  }

  throw new TypeError('dropWhile: input is not iterable');
}

export default dropWhile;
