/**
 * zipIndex - 인덱스와 값을 쌍으로 묶기
 */
function zipIndex<T>(arr: readonly T[]): Array<[number, T]> {
  return arr.map((value, index) => [index, value]);
}

export default zipIndex;
