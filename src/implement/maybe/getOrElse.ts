/** getOrElse - 기본값 제공 */
function getOrElse<T>(defaultValue: T): (value: T | null | undefined) => T {
  return (value: T | null | undefined) => {
    if (value === null || value === undefined) {
      return defaultValue;
    }
    return value;
  };
}
export default getOrElse;
