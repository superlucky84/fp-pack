/** mapResult - 성공 값 변환 */
function mapResult<T, R>(fn: (value: T) => R): (result: { ok: true; value: T } | { ok: false; error: any }) => { ok: true; value: R } | { ok: false; error: any } {
  // TODO: implement
  return (result) => result.ok ? { ok: true, value: fn(result.value) } : result;
}
export default mapResult;
