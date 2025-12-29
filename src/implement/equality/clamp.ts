import curry from '../composition/curry';

/** clamp - 범위 제한 */
function clamp(min: number, max: number, value: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
export default curry(clamp);
