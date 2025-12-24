/** mean - 평균 */
function mean(arr: number[]): number {
  if (arr.length === 0) return NaN;
  const total = arr.reduce((acc, value) => acc + value, 0);
  return total / arr.length;
}
export default mean;
