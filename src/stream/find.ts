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

/** find - preserve source element types and execution mode. */
function find<I extends AnyIterableInput<unknown>, S extends InputItem<I>>(
  predicate: (value: InputItem<I>) => value is S
): (iterable: I) => ScalarResultFor<I, S | undefined>;
function find<T, S extends T>(
  predicate: (value: T) => value is S
): <I extends InputFor<T>>(iterable: I) => ScalarResultFor<I, S | undefined>;
function find<I extends AnyIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean
): (iterable: I) => ScalarResultFor<I, InputItem<I> | undefined>;
function find<T>(
  predicate: (value: T) => boolean
): <I extends InputFor<T>>(iterable: I) => ScalarResultFor<I, InputItem<I> | undefined>;
function find<I extends AsyncIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean | PromiseLike<boolean>
): (iterable: I) => Promise<InputItem<I> | undefined>;
function find<T>(
  predicate: (value: T) => boolean | PromiseLike<boolean>
): <I extends AsyncIterableInput<PromiseLikeValue<T>>>(iterable: I) => Promise<InputItem<I> | undefined>;
function find<I extends AnyIterableInput<unknown>, S extends InputItem<I>>(
  predicate: (value: InputItem<I>) => value is S,
  iterable: I
): ScalarResultFor<I, S | undefined>;
function find<I extends AnyIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean,
  iterable: I
): ScalarResultFor<I, InputItem<I> | undefined>;
function find<I extends AsyncIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean | PromiseLike<boolean>,
  iterable: I
): Promise<InputItem<I> | undefined>;
function find<T>(
  predicate: (value: T) => boolean | PromiseLike<boolean>,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => find(predicate, next as never);
  }

  if (isAsyncInput(iterable)) {
    return (async () => {
      for await (const item of toAsync(iterable)) {
        if (await predicate(item as T)) {
          return item as T;
        }
      }
      return undefined;
    })();
  }

  if (isIterable(iterable)) {
    for (const item of iterable) {
      if (requireSync(predicate(item as T), 'find')) {
        return item as T;
      }
    }
    return undefined;
  }

  throw new TypeError('find: input is not iterable');
}

export default find;
