/**
 * dissoc - 불변 객체 속성 제거
 */
function dissoc<T, K extends keyof T>(key: K): (obj: T) => Omit<T, K> {
  // TODO: implement
  return (obj: T) => ({} as Omit<T, K>);
}

export default dissoc;
