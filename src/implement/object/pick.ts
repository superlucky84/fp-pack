/**
 * pick - 일부 속성 선택
 */
function pick<T, K extends keyof T>(keys: K[]): (obj: T) => Pick<T, K> {
  // TODO: implement
  return (obj: T) => ({} as Pick<T, K>);
}

export default pick;
