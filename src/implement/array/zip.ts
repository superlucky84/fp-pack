import curry from '../composition/curry';

/**
 * zip - 배열 병합
 */
function zip<T, U>(arr2: U[], arr1: T[]): Array<[T, U]> {
  const length = Math.min(arr1.length, arr2.length);
  const result: Array<[T, U]> = [];

  for (let i = 0; i < length; i += 1) {
    result.push([arr1[i], arr2[i]]);
  }

  return result;
}

export default curry(zip);
