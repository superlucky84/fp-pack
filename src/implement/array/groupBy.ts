/**
 * groupBy - 키 기준 그룹화
 */
function groupBy<T>(fn: (value: T) => string): (arr: T[]) => Record<string, T[]> {
  // TODO: implement
  return (arr: T[]) => ({});
}

export default groupBy;
