/** log - tap 기반 로깅 */
function log<T>(label?: string): (value: T) => T {
  // TODO: implement
  return (value: T) => value;
}
export default log;
