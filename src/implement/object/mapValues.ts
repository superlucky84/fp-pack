/**
 * mapValues - 값만 변환
 */
function mapValues<T extends object, R>(
  fn: (value: T[keyof T]) => R
): (obj: T) => Record<keyof T, R> {
  return (obj: T) => {
    const result: Record<keyof T, R> = {} as Record<keyof T, R>;
    for (const [key, value] of Object.entries(obj) as Array<[keyof T, T[keyof T]]>) {
      result[key] = fn(value);
    }
    return result;
  };
}

export default mapValues;
