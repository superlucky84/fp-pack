/** mapMaybe - 값이 있는 항목만 변환 */
function mapMaybe<T, R>(
  fn: (value: T) => R | null | undefined
): (values: readonly T[]) => R[] {
  return (values: readonly T[]) => {
    const results: R[] = [];

    for (const value of values) {
      const mapped = fn(value);
      if (mapped !== null && mapped !== undefined) {
        results.push(mapped);
      }
    }

    return results;
  };
}
export default mapMaybe;
