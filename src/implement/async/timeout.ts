/** timeout - 제한 시간 내 실행 */
function timeout<T>(ms: number): (promise: Promise<T>) => Promise<T> {
  // TODO: implement
  return (promise: Promise<T>) => promise;
}
export default timeout;
