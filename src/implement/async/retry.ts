/** retry - 실패 시 재시도 */
function retry<T>(times: number): (fn: () => Promise<T>) => Promise<T> {
  // TODO: implement
  return (fn: () => Promise<T>) => fn();
}
export default retry;
