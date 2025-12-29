/**
 * last - 마지막 요소 가져오기
 */
function last<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[arr.length - 1];
}

export default last;
