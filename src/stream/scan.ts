import type {
  Accumulator,
  InputFor,
  AnyIterableInput,
  AsyncIterableInput,
  PromiseLikeValue,
  InputItem,
  IteratorResultFor
} from './utils';
import { isAsyncInput, isIterable, requireSync } from './utils';
import toAsync from './toAsync';

/** scan - preserve source element types and execution mode. */
function scan<I extends AnyIterableInput<unknown>, R>(
  fn: (acc: NoInfer<Accumulator<R>>, value: InputItem<I>) => NoInfer<Accumulator<R>>,
  initial: R & Accumulator<R>
): (iterable: I) => IteratorResultFor<I, Accumulator<R>>;
function scan<T, R>(
  fn: (acc: NoInfer<Accumulator<R>>, value: T) => NoInfer<Accumulator<R>>,
  initial: R & Accumulator<R>
): <I extends InputFor<T>>(iterable: I) => IteratorResultFor<I, Accumulator<R>>;
function scan<I extends AsyncIterableInput<unknown>, R>(
  fn: (
    acc: NoInfer<Accumulator<R>>,
    value: InputItem<I>
  ) => NoInfer<Accumulator<R>> | PromiseLike<NoInfer<Accumulator<R>>>,
  initial: R & Accumulator<R>
): (iterable: I) => AsyncIterableIterator<Accumulator<R>>;
function scan<T, R>(
  fn: (acc: NoInfer<Accumulator<R>>, value: T) => NoInfer<Accumulator<R>> | PromiseLike<NoInfer<Accumulator<R>>>,
  initial: R & Accumulator<R>
): (iterable: Extract<InputFor<T>, AsyncIterableInput<unknown>>) => AsyncIterableIterator<Accumulator<R>>;
function scan<I extends AnyIterableInput<unknown>, R>(
  fn: (acc: NoInfer<Accumulator<R>>, value: InputItem<I>) => NoInfer<Accumulator<R>>,
  initial: R & Accumulator<R>,
  iterable: I
): IteratorResultFor<I, Accumulator<R>>;
function scan<I extends AsyncIterableInput<unknown>, R>(
  fn: (
    acc: NoInfer<Accumulator<R>>,
    value: InputItem<I>
  ) => NoInfer<Accumulator<R>> | PromiseLike<NoInfer<Accumulator<R>>>,
  initial: R & Accumulator<R>,
  iterable: I
): AsyncIterableIterator<Accumulator<R>>;
function scan<T, R>(
  fn: (acc: R, value: T) => R | PromiseLike<R>,
  initial: R,
  iterable?: AnyIterableInput<PromiseLikeValue<T>>
): any {
  if (iterable === undefined) {
    return (next: AnyIterableInput<PromiseLikeValue<T>>) => scan(fn as never, initial as never, next as never);
  }

  if (isAsyncInput(iterable)) {
    return (async function* () {
      let acc = initial;
      for await (const item of toAsync(iterable)) {
        acc = await fn(acc, item as T);
        yield acc;
      }
    })();
  }

  if (isIterable(iterable)) {
    return (function* () {
      let acc = initial;
      for (const item of iterable) {
        acc = requireSync(fn(acc, item as T), 'scan') as R;
        yield acc;
      }
    })();
  }

  throw new TypeError('scan: input is not iterable');
}

export default scan;
