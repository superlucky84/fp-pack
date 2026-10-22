/**
 * tail - 첫 요소 제외
 */
function tail<T>(arr: readonly T[]): T[] {
  return arr.slice(1);
}

export default tail;
