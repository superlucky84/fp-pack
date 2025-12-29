import curry from '../composition/curry';

/**
 * omit - 일부 속성 제거
 */
function omit<T, K extends keyof T = keyof T>(keys: K[], obj: T): Omit<T, K> {
  const result = { ...(obj as object) } as T;
  for (const key of keys) {
    delete (result as Record<PropertyKey, unknown>)[key];
  }
  return result as Omit<T, K>;
}

export default curry(omit);
