/** max - 최대값 */
function max(arr: number[]): number {
  if (arr.length === 0) return -Infinity;
  return Math.max(...arr);
}
export default max;
