/** mapMaybe - 값 있을 때만 적용 */
function mapMaybe<T, R>(fn: (value: T) => R): (value: T | null | undefined) => R | null {
  // TODO: implement
  return (value: T | null | undefined) => null;
}
export default mapMaybe;
