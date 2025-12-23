/** lt - 미만 비교 */
function lt(a: number): (b: number) => boolean {
  return (b: number) => b < a;
}
export default lt;
