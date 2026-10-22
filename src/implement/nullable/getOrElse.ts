/** getOrElse - use a fallback for null/undefined without constraining the input. */
type ArrayDefault<I, D extends readonly unknown[]> = [NonNullable<I>] extends [never]
  ? D
  : NonNullable<I> extends readonly (infer T)[]
    ? NonNullable<I> extends unknown[]
      ? D extends unknown[]
        ? (T | D[number])[]
        : readonly (T | D[number])[]
      : readonly (T | D[number])[]
    : never;
function getOrElse<D extends readonly unknown[]>(
  defaultValue: D
): <I extends readonly unknown[] | null | undefined>(value: I) => ArrayDefault<I, D>;
function getOrElse<D>(defaultValue: D): <T>(value: T | null | undefined) => NonNullable<T> | D;
function getOrElse(defaultValue: unknown): any {
  return (value: unknown) => (value == null ? defaultValue : value);
}
export default getOrElse;
