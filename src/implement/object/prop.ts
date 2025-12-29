import curry from '../composition/curry';

/**
 * prop - 안전한 프로퍼티 접근
 */
function prop<T, K extends keyof T = keyof T>(key: K, obj: T): T[K] | undefined {
  return obj?.[key];
}

export default curry(prop);
