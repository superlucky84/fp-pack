import curry from '../composition/curry';

/** join - 배열 결합 */
function join(separator: string, arr: string[]): string {
  return arr.join(separator);
}
export default curry(join);
