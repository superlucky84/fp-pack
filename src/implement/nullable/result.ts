/** result - 성공 / 실패 래핑 */
function result<T, E = Error>(fn: () => T): { ok: true; value: T } | { ok: false; error: E } {
  try {
    return { ok: true, value: fn() };
  } catch (error) {
    return { ok: false, error: error as E };
  }
}
export default result;
