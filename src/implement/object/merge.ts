/**
 * merge - 객체 병합 (얕은 병합)
 */
function merge<T, U>(obj1: T, obj2: U): T & U {
  return {
    ...(obj1 as object),
    ...(obj2 as object),
  } as T & U;
}

export default merge;
