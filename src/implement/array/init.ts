/**
 * init - 마지막 요소 제외
 */
function init<T>(arr: T[]): T[] {
  if (arr.length <= 1) return [];
  return arr.slice(0, -1);
}

export default init;
