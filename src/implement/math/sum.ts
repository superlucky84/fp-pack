/** sum - 합계 */
function sum(arr: number[]): number {
  return arr.reduce((total, value) => total + value, 0);
}
export default sum;
