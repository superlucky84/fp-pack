/**
 * has - 속성 존재 확인
 */
function has<T extends object>(key: keyof T): (obj: T) => boolean {
  return (obj: T) => Object.prototype.hasOwnProperty.call(obj, key);
}

export default has;
