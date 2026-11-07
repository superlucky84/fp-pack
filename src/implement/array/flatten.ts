/**
 * flatten - 1단계 배열 평탄화
 */
function flatten<T>(arr: readonly (readonly T[])[]): T[] {
  return arr.flat();
}

export default flatten;
