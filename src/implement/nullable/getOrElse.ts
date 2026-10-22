/** getOrElse - use a fallback for null/undefined without constraining the input. */
function getOrElse<D extends unknown[]>(defaultValue: D): <T>(value: T[] | null | undefined) => (T | D[number])[];
function getOrElse<D extends readonly unknown[]>(defaultValue: D): <T>(value: readonly T[] | null | undefined) => readonly (T | D[number])[];
function getOrElse<D>(defaultValue: D): <T>(value: T | null | undefined) => NonNullable<T> | D;
function getOrElse(defaultValue: unknown): any {
  return (value: unknown) => value == null ? defaultValue : value;
}
export default getOrElse;
