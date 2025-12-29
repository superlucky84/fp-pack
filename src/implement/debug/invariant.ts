import curry from '../composition/curry';

/** invariant - 계약 위반 체크 */
function invariant(condition: boolean, message?: string): void {
  if (!condition) {
    throw new Error(message ?? 'Invariant failed');
  }
}
export default curry(invariant);
