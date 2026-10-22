type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];
type Simplify<T> = { [K in keyof T]: T[K] };

type MergeObjects<L, R> = Simplify<
  Omit<L, keyof R> & Pick<R, Exclude<keyof R, OptionalKeys<R>>> &
  { [K in Extract<OptionalKeys<R>, Exclude<keyof L, OptionalKeys<L>>>]-?: L[K] | R[K] } &
  { [K in Extract<OptionalKeys<R>, OptionalKeys<L>>]?: L[K] | R[K] } &
  Pick<R, Exclude<OptionalKeys<R>, keyof L>>
>;

export type MergeResult<L, R> = L extends unknown ? R extends unknown ? MergeObjects<L, R> : never : never;

type DeepValue<L, R, D extends unknown[]> = D['length'] extends 8 ? unknown
  : L extends readonly unknown[] ? R
  : R extends readonly unknown[] ? R
  : L extends object ? R extends object ? DeepMergeResult<L, R, [...D, 0]> : R : R;

export type DeepMergeResult<L, R, D extends unknown[] = []> = L extends unknown ? R extends unknown
  ? Simplify<Omit<L, keyof R> &
      { [K in Exclude<keyof R, OptionalKeys<R>>]: K extends keyof L ? DeepValue<L[K], R[K], D> : R[K] } &
      { [K in Extract<OptionalKeys<R>, Exclude<keyof L, OptionalKeys<L>>>]-?: L[K] | DeepValue<L[K], R[K], D> } &
      { [K in Extract<OptionalKeys<R>, OptionalKeys<L>>]?: L[K] | DeepValue<L[K], R[K], D> } &
      Pick<R, Exclude<OptionalKeys<R>, keyof L>>>
  : never : never;
