/**
 * prop - 안전한 프로퍼티 접근
 */
function prop<T, K extends keyof T>(key: K): (obj: T) => T[K] | undefined {
  // TODO: implement
  return (obj: T) => undefined as any;
}

export default prop;
