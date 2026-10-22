import { pipe, pipeAsync, pipeSideEffect, pipeAsyncSideEffect, evolve, merge, mergeDeep,
  prop, pick, omit, path, pathOr, assocPath, flattenDeep, getOrElse, map, filter,
  find, partition, take, sortBy, groupBy, reduce, zip, mapMaybe } from '../../index';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;
type User = { id: number; name: string; nickname?: string };
declare const user: User;
declare const users: readonly User[];
declare const maybeUsers: User[] | undefined;
declare const maybeUser: User | undefined;
declare const nullable: readonly (string | null)[];

export const transformed = pipe({ count: 1, label: 'a' }, evolve({ count: n => n.toFixed() }));
export type Transformed = Expect<Equal<typeof transformed, { count: string; label: string }>>;
// @ts-expect-error transformed count is a string
pipe({ count: 1 }, evolve({ count: n => n.toFixed() }), x => x.count.toFixed());
// @ts-expect-error transformer input is a number, not any
pipe({ count: 1 }, evolve({ count: n => n.toUpperCase() }));

export const merged = pipe({ count: 1 }, merge({ count: 'old', label: 'a' }), x => x.count.toFixed());
export type Merged = Expect<Equal<typeof merged, string>>;
export const deepMerged = pipe({ nested: { count: 1 } }, mergeDeep({ nested: { count: 'old', label: 'a' } }), x => x.nested.count.toFixed());
export type DeepMerged = Expect<Equal<typeof deepMerged, string>>;
declare const optionalPatch: { count?: number };
export const optionalMerge = merge({ count: 'fallback' }, optionalPatch);
export type OptionalMerge = Expect<Equal<typeof optionalMerge.count, string | number | undefined>>;

export const requiredProp = pipe(user, prop('name'), name => name.toUpperCase());
export type RequiredProp = Expect<Equal<typeof requiredProp, string>>;
export const optionalProp = pipe(user, prop('nickname'));
export type OptionalProp = Expect<Equal<typeof optionalProp, string | undefined>>;
export const optionalPick = pipe(user, pick(['nickname']));
export type OptionalPick = Expect<Equal<typeof optionalPick, Pick<User, 'nickname'>>>;
export const optionalOmit = pipe(user, omit(['nickname']));
export type OptionalOmit = Expect<Equal<typeof optionalOmit, Omit<User, 'nickname'>>>;
// @ts-expect-error unknown property
pipe(user, prop('nmae'));

export const deepRead = pipe({ user: { name: 'Ada' } }, path(['user', 'name']));
export type DeepRead = Expect<Equal<typeof deepRead, string>>;
export const optionalRead = pipe(maybeUser, path(['nickname']));
export type OptionalRead = Expect<Equal<typeof optionalRead, string | undefined>>;
export const defaultRead = pipe(user, pathOr('anonymous', ['nickname']));
export type DefaultRead = Expect<Equal<typeof defaultRead, string>>;
// @ts-expect-error a numeric property cannot become a string from contextual output
export const falsePath: string | undefined = path(['count'], { count: 1 });
export const deepWrite = pipe({ user: { id: 1, name: 'Ada' } }, assocPath(['user', 'name'], 42));
export type DeepWrite = Expect<Equal<typeof deepWrite.user.name, number>>;
export type RetainedWrite = Expect<Equal<typeof deepWrite.user.id, number>>;
export const flat = pipe([[1], [2, [3]]], flattenDeep);
export type Flat = Expect<Equal<typeof flat, number[]>>;
// @ts-expect-error flatten output derives from the actual leaf types
export const falseFlat: string[] = flattenDeep([[1], [2, [3]]]);

export const fallbackNames = pipe(maybeUsers, getOrElse([]), map(u => u.name));
export type FallbackNames = Expect<Equal<typeof fallbackNames, string[]>>;
export const nullFallback = pipe(maybeUser, getOrElse(null));
export type NullFallback = Expect<Equal<typeof nullFallback, User | null>>;
export const objectFallback = pipe(maybeUser, getOrElse({ id: 0, name: '' }), u => u.id.toFixed());
export type ObjectFallback = Expect<Equal<typeof objectFallback, string>>;

export const readonlyNames = pipe(users, filter(u => u.id > 0), sortBy(u => u.id), take(2), map(u => u.name));
export type ReadonlyNames = Expect<Equal<typeof readonlyNames, string[]>>;
export const readonlyReduced = pipe(users, reduce((sum, u) => sum + u.id, 0));
export type ReadonlyReduced = Expect<Equal<typeof readonlyReduced, number>>;
export const readonlyGroups = pipe(users, groupBy(u => u.name));
export type ReadonlyGroups = Expect<Equal<typeof readonlyGroups, Record<string, User[]>>>;
export const readonlyZip = pipe(users, zip(['a', 'b']), map(([u, label]) => u.name + label));
export type ReadonlyZip = Expect<Equal<typeof readonlyZip, string[]>>;
export const readonlyMaybe = pipe(users, mapMaybe(u => u.nickname));
export type ReadonlyMaybe = Expect<Equal<typeof readonlyMaybe, string[]>>;
export const narrowedFind = pipe(nullable, find(x => x !== null));
export type NarrowedFind = Expect<Equal<typeof narrowedFind, string | undefined>>;
export const narrowedPartition = pipe(nullable, partition(x => x !== null));
export type NarrowedPartition = Expect<Equal<typeof narrowedPartition, [string[], null[]]>>;

export const asyncData = pipeAsync(users, map(u => u.name));
export type AsyncData = Expect<Equal<typeof asyncData, Promise<string[]>>>;
export const effectData = pipeSideEffect(users, map(u => u.name));
export type EffectData = Expect<Equal<typeof effectData, string[]>>;
export const asyncEffectData = pipeAsyncSideEffect(users, map(u => u.name));
export type AsyncEffectData = Expect<Equal<typeof asyncEffectData, Promise<string[]>>>;
