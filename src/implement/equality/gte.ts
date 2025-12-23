/** gte - 이상 비교 */
function gte(a: number): (b: number) => boolean {
  return (b: number) => b >= a;
}
export default gte;
