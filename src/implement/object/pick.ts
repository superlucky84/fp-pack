/**
 * pick - 일부 속성 선택
 */
function pick<T extends object, K extends keyof T = keyof T>(keys: K[], obj: T): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

export default pick;
