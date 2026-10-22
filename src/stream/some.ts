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

/** some - preserve source element types and execution mode. */
function some<I extends AnyIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean
): (iterable: I) => ScalarResultFor<I, boolean>;
function some<T>(predicate: (value: T) => boolean): <I extends InputFor<T>>(iterable: I) => ScalarResultFor<I, boolean>;
function some<I extends AsyncIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean | PromiseLike<boolean>
): (iterable: I) => Promise<boolean>;
function some<T>(
  predicate: (value: T) => boolean | PromiseLike<boolean>
): <I extends AsyncIterableInput<PromiseLikeValue<T>>>(iterable: I) => Promise<boolean>;
function some<I extends AnyIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean,
  iterable: I
): ScalarResultFor<I, boolean>;
function some<I extends AsyncIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean | PromiseLike<boolean>,
  iterable: I
): Promise<boolean>;
function some<T>(
  predicate: (value: T) => boolean | PromiseLike<boolean>,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => some(predicate, next as never);
  }

  if (isAsyncInput(iterable)) {
    return (async () => {
      for await (const item of toAsync(iterable)) {
        if (await predicate(item as T)) {
          return true;
        }
      }
      return false;
    })();
  }

  if (isIterable(iterable)) {
    for (const item of iterable) {
      if (requireSync(predicate(item as T), 'some')) {
        return true;
      }
    }
    return false;
  }

  throw new TypeError('some: input is not iterable');
}

export default some;
