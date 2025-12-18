/** maybe - null-safe 연산 */
function maybe<T, R>(fn: (value: T) => R): (value: T | null | undefined) => R | null {
  // TODO: implement
  return (value: T | null | undefined) => null;
}
export default maybe;
