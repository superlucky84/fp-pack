/** fold - Maybe/Result 처리 */
function fold<T, R>(
  onNone: () => R,
  onSome: (value: T) => R
): (value: T | null | undefined) => R {
  return (value: T | null | undefined) => {
    if (value === null || value === undefined) {
      return onNone();
    }
    return onSome(value);
  };
}
export default fold;
