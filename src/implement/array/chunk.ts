/**
 * chunk - 배열을 일정 크기로 분할
 */
function chunk<T>(size: number, arr: T[]): T[][] {
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

export default chunk;
