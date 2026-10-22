import curry from '../composition/curry';

type Fold = {
  <RNone>(
    onNone: () => RNone
  ): <T, RSome>(onSome: (value: T) => RSome) => (value: T | null | undefined) => RNone | RSome;
  <T, RNone, RSome>(onNone: () => RNone, onSome: (value: T) => RSome): (value: T | null | undefined) => RNone | RSome;
  <T, RNone, RSome>(onNone: () => RNone, onSome: (value: T) => RSome, value: T | null | undefined): RNone | RSome;
  <T, R>(onNone: () => R, onSome: (value: T) => R): (value: T | null | undefined) => R;
  <T, R>(onNone: () => R, onSome: (value: T) => R, value: T | null | undefined): R;
};

/** fold - Maybe/Result 처리 */
function fold<T, R>(onNone: () => R, onSome: (value: T) => R, value: T | null | undefined): R {
  if (value === null || value === undefined) {
    return onNone();
  }
  return onSome(value);
}
const curriedFold = curry(fold) as Fold;
export default curriedFold;
