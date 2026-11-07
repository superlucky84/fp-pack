type DeepElement<T, D extends unknown[] = []> = D['length'] extends 16 ? unknown
  : T extends readonly (infer U)[] ? DeepElement<U, [...D, 0]> : T;

/** flattenDeep - recursively collect array leaves without changing the input. */
function flattenDeep<T>(arr: readonly T[]): DeepElement<T>[] {
  const result: unknown[] = [];
  const walk = (items: readonly unknown[]) => {
    for (const item of items) {
      if (Array.isArray(item)) walk(item);
      else result.push(item);
    }
  };
  walk(arr);
  return result as DeepElement<T>[];
}
export default flattenDeep;
