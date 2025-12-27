/**
 * keys - 객체 키 배열
 */
function keys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

export default keys;
