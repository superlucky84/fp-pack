import {
  pipe, pipeAsync, pipeSideEffect, pipeAsyncSideEffect,
  pipeStrict, pipeAsyncStrict, pipeSideEffectStrict, pipeAsyncSideEffectStrict,
  pipeWithDeps, from, map, filter, SideEffect,
} from 'fp-pack';
import { range, map as streamMap, toArray } from 'fp-pack/stream';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;

export const arrayValue = pipe([1, 2, 3], map(x => x * 2), filter(x => x > 2));
export type ArrayValue = Expect<Equal<typeof arrayValue, number[]>>;
export const asyncValue = pipeAsync(1, async x => x + 1, x => x.toFixed());
export type AsyncValue = Expect<Equal<typeof asyncValue, Promise<string>>>;
export const effectValue = pipeSideEffect(1, x => x > 0 ? x : SideEffect.of(() => 'LOW' as const), x => x.toFixed());
export type EffectValue = Expect<Equal<typeof effectValue, string | SideEffect<'LOW'>>>;
export const asyncEffectValue = pipeAsyncSideEffect(1, async x => x > 0 ? x : SideEffect.of(() => 'LOW' as const), x => x.toFixed());
export type AsyncEffectValue = Expect<Equal<typeof asyncEffectValue, Promise<string | SideEffect<'LOW'>>>>;

// Exporting a bound wrapper must emit declarations without requiring an annotation.
export const withDeps = pipeWithDeps(pipeAsyncSideEffect);
export const withAlias = pipeWithDeps(pipeAsyncSideEffectStrict);
export type SameWrapper = Expect<Equal<typeof withDeps, typeof withAlias>>;
export const query = withDeps(from(1), async (id, deps: { fetch: (id: number) => Promise<{ name: string }> }) => deps.fetch(id), user => user.name);
export const queried = query()({ fetch: async id => ({ name: String(id) }) });
export type Queried = Expect<Equal<typeof queried, Promise<string>>>;
export const streamed = pipe(range(0, 3), streamMap(x => x * 2), toArray);

const numberStep = (x: number) => x;
const stringStep = (x: string) => x.toLowerCase();
// @ts-expect-error defaults reject the original issue shape
pipe(1, numberStep, stringStep);
// @ts-expect-error defaults reject the original issue shape
pipeAsync(1, numberStep, stringStep);
// @ts-expect-error default wrappers must preserve checks
pipeWithDeps(pipeSideEffect)(1, numberStep, stringStep);
// @ts-expect-error from() must not bypass wrapper checks
withDeps(from(1), numberStep, stringStep);
// @ts-expect-error aliases share checks
pipeStrict(1, numberStep, stringStep);
// @ts-expect-error aliases share checks
pipeAsyncStrict(1, numberStep, stringStep);
// @ts-expect-error aliases share checks
pipeSideEffectStrict(1, numberStep, stringStep);
// @ts-expect-error aliases share checks
withAlias(from(1), numberStep, stringStep);

export const optional = pipe((n = 0) => n, n => n + 1)();
export type Optional = Expect<Equal<typeof optional, number>>;
