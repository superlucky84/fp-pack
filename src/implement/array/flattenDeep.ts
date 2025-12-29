/**
 * flattenDeep - 깊은 배열 평탄화
 */
function flattenDeep<T>(arr: any[]): T[] {
  const result: T[] = [];

  const walk = (items: any[]) => {
    for (const item of items) {
      if (Array.isArray(item)) {
        walk(item);
      } else {
        result.push(item);
      }
    }
  };

  walk(arr);
  return result;
}

export default flattenDeep;
