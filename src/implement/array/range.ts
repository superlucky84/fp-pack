/**
 * range - 숫자 범위 생성 (end 제외)
 */
function range(start: number, end: number): number[] {
  if (!Number.isFinite(start) || !Number.isFinite(end)) return [];
  if (start === end) return [];

  const step = start < end ? 1 : -1;
  const result: number[] = [];

  for (let value = start; step > 0 ? value < end : value > end; value += step) {
    result.push(value);
  }

  return result;
}

export default range;
