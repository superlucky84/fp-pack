/**
 * sortBy - 기준 함수로 정렬
 */
function sortBy<T>(fn: (value: T) => any, arr: T[]): T[] {
  return [...arr].sort((a, b) => {
    const aKey = fn(a);
    const bKey = fn(b);
    if (aKey < bKey) return -1;
    if (aKey > bKey) return 1;
    return 0;
  });
}

export default sortBy;
