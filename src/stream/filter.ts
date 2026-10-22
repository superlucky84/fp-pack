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

/** filter - preserve source element types and execution mode. */
function filter<I extends AnyIterableInput<unknown>, S extends InputItem<I>>(
  predicate: (value: InputItem<I>) => value is S
): (iterable: I) => IteratorResultFor<I, S>;
function filter<T, S extends T>(
  predicate: (value: T) => value is S
): <I extends InputFor<T>>(iterable: I) => IteratorResultFor<I, S>;
function filter<I extends AnyIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean
): (iterable: I) => IteratorResultFor<I, InputItem<I>>;
function filter<T>(
  predicate: (value: T) => boolean
): <I extends InputFor<T>>(iterable: I) => IteratorResultFor<I, InputItem<I>>;
function filter<I extends AsyncIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean | PromiseLike<boolean>
): (iterable: I) => AsyncIterableIterator<InputItem<I>>;
function filter<T>(
  predicate: (value: T) => boolean | PromiseLike<boolean>
): <I extends Extract<InputFor<T>, AsyncIterableInput<unknown>>>(iterable: I) => AsyncIterableIterator<InputItem<I>>;
function filter<I extends AnyIterableInput<unknown>, S extends InputItem<I>>(
  predicate: (value: InputItem<I>) => value is S,
  iterable: I
): IteratorResultFor<I, S>;
function filter<I extends AnyIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean,
  iterable: I
): IteratorResultFor<I, InputItem<I>>;
function filter<I extends AsyncIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean | PromiseLike<boolean>,
  iterable: I
): AsyncIterableIterator<InputItem<I>>;
function filter<T>(
  predicate: (value: T) => boolean | PromiseLike<boolean>,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => filter(predicate, next as never);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      for await (const item of toAsync(iterable)) {
        if (await predicate(item as T)) {
          yield item as T;
        }
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      for (const item of iterable) {
        if (requireSync(predicate(item as T), 'filter')) {
          yield item as T;
        }
      }
    })();
  }

  throw new TypeError('filter: input is not iterable');
}

export default filter;
