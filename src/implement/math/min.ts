/** min - 최소값 */
function min(arr: number[]): number {
  if (arr.length === 0) return Infinity;
  return Math.min(...arr);
}
export default min;
