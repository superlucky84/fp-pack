/**
 * dissoc - 불변 객체 속성 제거
 */
function dissoc<T, K extends keyof T = keyof T>(key: K): (obj: T) => Omit<T, K> {
  return (obj: T) => {
    if (Array.isArray(obj)) {
      const result = obj.slice();
      const index = typeof key === 'number' ? key : Number.isNaN(Number(key)) ? -1 : Number(key);
      if (index >= 0 && index < result.length) {
        result.splice(index, 1);
      } else {
        delete (result as unknown as Record<PropertyKey, unknown>)[key as unknown as PropertyKey];
      }
      return result as unknown as Omit<T, K>;
    }

    if (obj && typeof obj === 'object') {
      const { [key]: _removed, ...rest } = obj as Record<PropertyKey, unknown>;
      return rest as Omit<T, K>;
    }

    return obj as Omit<T, K>;
  };
}

export default dissoc;
