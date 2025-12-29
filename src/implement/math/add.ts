import curry from '../composition/curry';

/** add - 덧셈 */
function add(a: number, b: number): number {
  return a + b;
}
export default curry(add);
