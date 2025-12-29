import curry from '../composition/curry';

/** assert - 조건 검증 */
function assert(condition: boolean, message?: string): void {
  if (!condition) {
    throw new Error(message ?? 'Assertion failed');
  }
}
export default curry(assert);
