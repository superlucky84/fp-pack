import curry from '../composition/curry';

/** div - 나눗셈 */
function div(a: number, b: number): number {
  return a / b;
}
export default curry(div);
