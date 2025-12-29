import curry from '../composition/curry';

/**
 * path - 안전한 깊은 프로퍼티 접근
 */
function path<T>(pathArray: string[], obj: any): T | undefined {
  return pathArray.reduce((current, key) => (current == null ? undefined : current[key]), obj) as T | undefined;
}

export default curry(path);
