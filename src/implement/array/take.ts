/**
 * take - 앞에서 n개 선택
 */
function take<T>(n: number, arr: T[]): T[] {
  if (n <= 0) return [];
  if (n >= arr.length) return [...arr];
  return arr.slice(0, n);
}

export default take;
