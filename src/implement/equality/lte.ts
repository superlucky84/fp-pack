/** lte - 이하 비교 */
function lte(a: number): (b: number) => boolean {
  return (b: number) => b <= a;
}
export default lte;
