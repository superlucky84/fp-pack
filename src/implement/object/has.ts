import curry from '../composition/curry';

/**
 * has - 속성 존재 확인
 */
function has<T extends object>(key: keyof T, obj: T): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export default curry(has);
