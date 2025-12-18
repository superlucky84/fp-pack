/**
 * constant (always) - 항상 같은 값을 반환
 */
function constant<T>(value: T): () => T {
  // TODO: implement
  return () => value;
}

export default constant;
