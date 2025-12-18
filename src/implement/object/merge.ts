/**
 * merge - 객체 병합 (얕은 병합)
 */
function merge<T, U>(obj2: U): (obj1: T) => T & U {
  // TODO: implement
  return (obj1: T) => ({} as T & U);
}

export default merge;
