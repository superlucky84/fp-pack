import curry from '../composition/curry';

type Drop = {
  (n: number): {
    <T>(arr: T[]): T[];
    <T>(arr: readonly T[]): readonly T[];
  };
  <T>(n: number, arr: T[]): T[];
  <T>(n: number, arr: readonly T[]): readonly T[];
};

/**
 * drop - 앞에서 n개 제외
 */
function drop<T>(n: number, arr: readonly T[]): readonly T[] {
  const count = Math.floor(n);
  if (!Number.isFinite(count) || count <= 0) {
    return arr;
  }
  return arr.slice(count);
}

const curriedDrop = curry(drop) as Drop;
export default curriedDrop;
