/** gt - 초과 비교 */
function gt(a: number): (b: number) => boolean {
  return (b: number) => b > a;
}
export default gt;
