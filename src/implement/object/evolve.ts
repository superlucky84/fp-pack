/**
 * evolve - 구조 기반 변환
 */
function evolve<T extends object>(
  transformations: Partial<{ [K in keyof T]: (value: T[K]) => any }>
): (obj: T) => T {
  return (obj: T) => {
    const result = { ...(obj as object) } as T;
    for (const key of Object.keys(transformations) as Array<keyof T>) {
      const transformer = transformations[key];
      if (typeof transformer === 'function') {
        result[key] = transformer(obj[key]);
      }
    }
    return result;
  };
}

export default evolve;
