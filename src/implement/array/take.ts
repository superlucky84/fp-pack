import curry from '../composition/curry';

type Take = {
  (n: number): <T>(arr: readonly T[]) => T[];
  <T>(...args: [n: number, arr: readonly T[]]): T[];
};

/**
 * take - 앞에서 n개 선택
 */
function take<T>(n: number, arr: readonly T[]): T[] {
  if (n <= 0) return [];
  if (n >= arr.length) return [...arr];
  return arr.slice(0, n);
}

const curriedTake = curry(take) as Take;
export default curriedTake;
