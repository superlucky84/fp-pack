import assoc from './assoc';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;
type Simplify<T> = { [K in keyof T]: T[K] };

const base: { a: number; b: number } = { a: 1, b: 2 };
const addKey = assoc('c', 3, base);
const updateKey = assoc('a', 'x', base);

const list: string[] = ['a', 'b', 'c'];
const updateIndex = assoc(1, 'x', list);
const updateIndexMixed = assoc(1, 1, list);

export type Assoc_AddKey = Expect<
  Equal<Simplify<typeof addKey>, { a: number; b: number; c: number }>
>;
export type Assoc_UpdateKey = Expect<
  Equal<Simplify<typeof updateKey>, { a: string; b: number }>
>;
export type Assoc_UpdateIndex = Expect<Equal<Simplify<typeof updateIndex>, string[]>>;
export type Assoc_UpdateIndexMixed = Expect<
  Equal<Simplify<typeof updateIndexMixed>, Array<string | number>>
>;
