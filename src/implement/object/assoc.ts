import curry from '../composition/curry';

type AssocKey = string | number | symbol;

type AssocValue<T, K extends AssocKey, V> = K extends keyof T
  ? (T[K] extends V ? T : Omit<T, K> & Record<K, V>)
  : T & Record<K, V>;

type AssocResult<T, K extends AssocKey, V> =
  T extends readonly (infer U)[]
    ? K extends number | `${number}`
      ? Array<V | U>
      : AssocValue<T, K, V>
    : AssocValue<T, K, V>;

/**
 * assoc - 불변 객체 속성 설정
 */
function assoc<T, K extends AssocKey, V>(key: K, value: V, obj: T): AssocResult<T, K, V> {
  if (Array.isArray(obj)) {
    const result = obj.slice();
    (result as any)[key] = value;
    return result as AssocResult<T, K, V>;
  }

  if (obj && typeof obj === 'object') {
    return {
      ...(obj as object),
      [key]: value,
    } as AssocResult<T, K, V>;
  }

  return { [key]: value } as AssocResult<T, K, V>;
}

export default curry(assoc);
