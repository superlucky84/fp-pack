import curry from '../composition/curry';

/**
 * drop - 앞에서 n개 제외
 */
function drop<T>(n: number, arr: T[]): T[] {
  const count = Math.floor(n);
  if (!Number.isFinite(count) || count <= 0) {
    return arr;
  }
  return arr.slice(count);
}

export default curry(drop);
