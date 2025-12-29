import curry from '../composition/curry';

/**
 * sort - 비교 함수로 정렬 (불변)
 */
function sort<T>(compare: (a: T, b: T) => number, arr: T[]): T[] {
  return [...arr].sort(compare);
}

export default curry(sort);
