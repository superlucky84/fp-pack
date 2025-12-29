import curry from '../composition/curry';

/** sub - 뺄셈 */
function sub(a: number, b: number): number {
  return a - b;
}
export default curry(sub);
