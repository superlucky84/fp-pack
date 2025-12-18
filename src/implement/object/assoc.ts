/**
 * assoc - 불변 객체 속성 설정
 */
function assoc<T, K extends keyof T>(key: K, value: T[K]): (obj: T) => T {
  // TODO: implement
  return (obj: T) => obj;
}

export default assoc;
