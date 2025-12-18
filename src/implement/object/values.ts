/**
 * values - 객체 값 배열
 */
function values<T extends object>(obj: T): Array<T[keyof T]> {
  // TODO: implement
  return [];
}

export default values;
