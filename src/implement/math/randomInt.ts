import curry from '../composition/curry';

/** randomInt - 범위 랜덤 정수 */
function randomInt(min: number, max: number): number {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);

  if (upper < lower) {
    return lower;
  }

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
export default curry(randomInt);
