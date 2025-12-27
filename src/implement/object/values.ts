/**
 * values - 객체 값 배열
 */
function values<T extends object>(obj: T): Array<T[keyof T]> {
  return Object.values(obj) as Array<T[keyof T]>;
}

export default values;
