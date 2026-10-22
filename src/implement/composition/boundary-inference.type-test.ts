import {
  compose,
  curry,
  from,
  identity,
  pipe,
  pipeAsync,
  ifElse,
  when,
  unless,
  cond,
  fold,
  SideEffect,
  matchSideEffect
} from '../../index';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

export const genericIdentity = pipe(identity);
export const identityNumber = genericIdentity(123);
export const identityObject = genericIdentity({ name: 'Ada' });
export type IdentityNumber = Expect<Equal<typeof identityNumber, 123>>;
export type IdentityObject = Expect<Equal<typeof identityObject, { name: string }>>;
export const asyncIdentity = pipeAsync(identity);
export const asyncIdentityObject = asyncIdentity({ name: 'Ada' });
export type AsyncIdentityObject = Expect<Equal<typeof asyncIdentityObject, Promise<{ name: string }>>>;

export const stagedBranch = ifElse((n: number) => n > 0)((n) => n.toFixed())((n) => n < -1);
export type StagedBranch = Expect<Equal<ReturnType<typeof stagedBranch>, string | boolean>>;
export const twoStageBranch = ifElse(
  (n: number) => n > 0,
  (n) => n.toFixed()
)((n) => n < -1);
export type TwoStageBranch = Expect<Equal<ReturnType<typeof twoStageBranch>, string | boolean>>;
export const stagedWhen = when((n: number) => n > 0)((n) => n.toFixed());
export type StagedWhen = Expect<Equal<ReturnType<typeof stagedWhen>, number | string>>;
export const stagedUnless = unless((n: number) => n > 0)((n) => ({ value: n }));
export type StagedUnless = Expect<Equal<ReturnType<typeof stagedUnless>, number | { value: number }>>;
declare const nullable: string | null;
export const guardedBranch = pipe(
  nullable,
  ifElse(
    (x) => x !== null,
    (x) => x.toUpperCase(),
    () => 0
  )
);
export type GuardedBranch = Expect<Equal<typeof guardedBranch, string | number>>;
export const guardedWhen = pipe(
  nullable,
  when(
    (x) => x !== null,
    (x) => x.toUpperCase()
  )
);
export type GuardedWhen = Expect<Equal<typeof guardedWhen, string | null>>;
export const guardedUnless = pipe(
  nullable,
  unless(
    (x) => x === null,
    (x) => x.toUpperCase()
  )
);
export type GuardedUnless = Expect<Equal<typeof guardedUnless, string | null>>;
export const folded = fold(() => 'none')((n: number) => n * 2);
export type Folded = Expect<Equal<ReturnType<typeof folded>, string | number>>;
export const foldedInline = pipe(
  nullable,
  fold(
    () => 0,
    (x) => x.toUpperCase()
  )
);
export type FoldedInline = Expect<Equal<typeof foldedInline, number | string>>;
export const classified = pipe(
  1,
  cond([
    [(n) => n > 0, (n) => n.toFixed()],
    [(n) => n <= 0, (n) => n < -10]
  ])
);
export type Classified = Expect<Equal<typeof classified, string | boolean | undefined>>;

const join3 = curry((a: string, b: number, c: boolean) => `${a}:${b}:${c}`);
export const groupedThree = join3('x')(2, true);
export type GroupedThree = Expect<Equal<typeof groupedThree, string>>;
const join5 = curry((a: number, b: number, c: number, d: number, e: number) => a + b + c + d + e);
export const groupedFive = join5(1)(2, 3)(4, 5);
export type GroupedFive = Expect<Equal<typeof groupedFive, number>>;
// @ts-expect-error grouped arguments remain checked
join3('x')('wrong', true);
compose(
  // @ts-expect-error incompatible compose connection must fail at construction
  (s: string) => s.toUpperCase(),
  (n: number) => n + 1
);
// @ts-expect-error from does not bypass reverse connection validation
compose((s: string) => s.toUpperCase(), from(1));

declare const outcome: number | SideEffect<'MISSING' | 'INVALID'>;
export const matched = matchSideEffect(outcome, {
  value: (n) => n.toFixed(),
  effect: (effect) => effect.effect()
});
export type Matched = Expect<Equal<typeof matched, string>>;
export const effectOnly = matchSideEffect(
  SideEffect.of(() => 42),
  {
    value: (value) => value,
    effect: (effect) => effect.effect().toFixed()
  }
);
export type EffectOnly = Expect<Equal<typeof effectOnly, string>>;
export const exactEffect = matchSideEffect(outcome, {
  value: () => undefined,
  effect: (effect) => effect.effect()
});
export type ExactEffect = Expect<Equal<typeof exactEffect, undefined | 'MISSING' | 'INVALID'>>;
