/** fold - Maybe/Result 처리 */
function fold<T, R>(
  onNone: () => R,
  onSome: (value: T) => R
): (value: T | null | undefined) => R {
  // TODO: implement
  return (value: T | null | undefined) => onNone();
}
export default fold;
