/** getOrElse - 기본값 제공 */
function getOrElse<T>(defaultValue: T): (value: T | null | undefined) => T {
  // TODO: implement
  return (value: T | null | undefined) => defaultValue;
}
export default getOrElse;
