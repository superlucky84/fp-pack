/**
 * omit - 일부 속성 제거
 */
function omit<T, K extends keyof T>(keys: K[]): (obj: T) => Omit<T, K> {
  // TODO: implement
  return (obj: T) => ({} as Omit<T, K>);
}

export default omit;
