/**
 * evolve - 구조 기반 변환
 */
function evolve<T extends object>(
  transformations: Partial<{ [K in keyof T]: (value: T[K]) => any }>
): (obj: T) => T {
  // TODO: implement
  return (obj: T) => obj;
}

export default evolve;
