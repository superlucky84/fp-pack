import curry from '../composition/curry';

type Chunk = {
  (size: number): <T>(arr: readonly T[]) => T[][];
  <T>(...args: [size: number, arr: readonly T[]]): T[][];
};

/**
 * chunk - 배열을 일정 크기로 분할
 */
function chunk<T>(size: number, arr: readonly T[]): T[][] {
  const chunkSize = Math.floor(size);
  if (!Number.isFinite(chunkSize) || chunkSize <= 0) {
    return [];
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

const curriedChunk = curry(chunk) as Chunk;
export default curriedChunk;
