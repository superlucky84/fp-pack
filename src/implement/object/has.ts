/**
 * has - 속성 존재 확인
 */
function has<T extends object>(key: keyof T): (obj: T) => boolean {
  // TODO: implement
  return (obj: T) => false;
}

export default has;
