import curry from '../composition/curry';

type PickFn = {
  <K extends PropertyKey>(...args: [keys: readonly K[]]): <T extends Partial<Record<K, unknown>>>(obj: T) => Pick<T, K>;
  <T extends object, K extends keyof T = keyof T>(...args: [keys: readonly K[], obj: T]): Pick<T, K>;
};

/**
 * pick - 일부 속성 선택
 */
function pick<T extends object, K extends keyof T = keyof T>(keys: readonly K[], obj: T): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

const curriedPick = curry(pick) as PickFn;
export default curriedPick;
