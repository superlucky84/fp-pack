import curry from '../composition/curry';

type OmitFn = {
  <K extends PropertyKey>(...args: [keys: readonly K[]]): <T extends Partial<Record<K, unknown>>>(obj: T) => Omit<T, K>;
  <T extends object, K extends keyof T = keyof T>(...args: [keys: readonly K[], obj: T]): Omit<T, K>;
};

/**
 * omit - 일부 속성 제거
 */
function omit<T, K extends keyof T = keyof T>(keys: readonly K[], obj: T): Omit<T, K> {
  const result = { ...(obj as object) } as T;
  for (const key of keys) {
    delete (result as Record<PropertyKey, unknown>)[key];
  }
  return result as Omit<T, K>;
}

const curriedOmit = curry(omit) as OmitFn;
export default curriedOmit;
