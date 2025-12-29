import curry from '../composition/curry';

/** mul - 곱셈 */
function mul(a: number, b: number): number {
  return a * b;
}
export default curry(mul);
