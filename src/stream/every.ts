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

/** every - preserve source element types and execution mode. */
function every<I extends AnyIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean
): (iterable: I) => ScalarResultFor<I, boolean>;
function every<T>(
  predicate: (value: T) => boolean
): <I extends InputFor<T>>(iterable: I) => ScalarResultFor<I, boolean>;
function every<I extends AsyncIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean | PromiseLike<boolean>
): (iterable: I) => Promise<boolean>;
function every<T>(
  predicate: (value: T) => boolean | PromiseLike<boolean>
): <I extends Extract<InputFor<T>, AsyncIterableInput<unknown>>>(iterable: I) => Promise<boolean>;
function every<I extends AnyIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean,
  iterable: I
): ScalarResultFor<I, boolean>;
function every<I extends AsyncIterableInput<unknown>>(
  predicate: (value: InputItem<I>) => boolean | PromiseLike<boolean>,
  iterable: I
): Promise<boolean>;
function every<T>(
  predicate: (value: T) => boolean | PromiseLike<boolean>,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => every(predicate, next as never);
  }

  if (isAsyncInput(iterable)) {
    return (async () => {
      for await (const item of toAsync(iterable)) {
        if (!(await predicate(item as T))) {
          return false;
        }
      }
      return true;
    })();
  }

  if (isIterable(iterable)) {
    for (const item of iterable) {
      if (!requireSync(predicate(item as T), 'every')) {
        return false;
      }
    }
    return true;
  }

  throw new TypeError('every: input is not iterable');
}

export default every;
