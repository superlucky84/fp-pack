/**
 * guard - 조건 불만족 시 early return
 */
function guard<T>(
  predicate: (value: T) => boolean,
  defaultValue: T
): (value: T) => T {
  // TODO: implement
  return (value: T) => value;
}

export default guard;
