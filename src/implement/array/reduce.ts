/**
 * reduce - 누적 연산
 */
function reduce<T, R>(
  fn: (acc: R, value: T) => R,
  initial: R
): (arr: T[]) => R {
  // TODO: implement
  return (arr: T[]) => initial;
}

export default reduce;
