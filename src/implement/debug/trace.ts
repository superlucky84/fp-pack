/** trace - 파이프라인 중간 값 출력 */
function trace<T>(label?: string): (value: T) => T {
  // TODO: implement
  return (value: T) => value;
}
export default trace;
