/**
 * guard - 조건 불만족 시 early return
 */
function guard<T>(
  predicate: (value: T) => boolean,
  defaultValue: T
): (value: T) => T {
  return (value: T) => (predicate(value) ? value : defaultValue);
}

export default guard;
