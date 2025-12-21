/**
 * groupBy - 키 기준 그룹화
 */
function groupBy<T>(fn: (value: T) => string, arr: T[]): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const key = fn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

export default groupBy;
