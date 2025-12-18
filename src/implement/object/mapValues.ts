/**
 * mapValues - 값만 변환
 */
function mapValues<T extends object, R>(
  fn: (value: T[keyof T]) => R
): (obj: T) => Record<keyof T, R> {
  // TODO: implement
  return (obj: T) => ({} as Record<keyof T, R>);
}

export default mapValues;
