/**
 * find - 조건 만족 첫 요소
 */
function find<T>(predicate: (value: T) => boolean, arr: T[]): T | undefined {
  return arr.find(predicate);
}

export default find;
