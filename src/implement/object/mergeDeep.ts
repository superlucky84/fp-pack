/**
 * mergeDeep - 깊은 객체 병합
 */
function mergeDeep<T, U>(obj2: U): (obj1: T) => T & U {
  // TODO: implement
  return (obj1: T) => ({} as T & U);
}

export default mergeDeep;
