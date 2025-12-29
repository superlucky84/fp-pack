/** maybe - null-safe 연산 */
function maybe<T, R>(fn: (value: T) => R): (value: T | null | undefined) => R | null {
  return (value: T | null | undefined) => {
    if (value === null || value === undefined) {
      return null;
    }
    return fn(value);
  };
}
export default maybe;
