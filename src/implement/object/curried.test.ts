import { describe, it, expect } from 'vitest';
import assoc from './assoc';
import assocPath from './assocPath';
import dissocPath from './dissocPath';
import evolve from './evolve';
import has from './has';
import merge from './merge';
import mergeDeep from './mergeDeep';
import omit from './omit';
import path from './path';
import pick from './pick';
import prop from './prop';

describe('object (curried)', () => {
  it('supports data-last currying', () => {
    expect(prop('name')({ name: 'jane', age: 1 })).toBe('jane');
    expect(path(['a', 'b'])({ a: { b: 2 } })).toBe(2);
    expect(pick(['a', 'c'])({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, c: 3 });
    expect(omit(['b'])({ a: 1, b: 2 })).toEqual({ a: 1 });
    expect(assoc('b', 2)({ a: 1 })).toEqual({ a: 1, b: 2 });
    expect(assocPath(['a', 'b'], 2)({})).toEqual({ a: { b: 2 } });
    expect(dissocPath(['a', 'b'])({ a: { b: 1, c: 2 } })).toEqual({ a: { c: 2 } });
    expect(merge({ a: 1 })({ b: 2 })).toEqual({ a: 1, b: 2 });
    expect(mergeDeep({ a: { b: 1 } })({ a: { c: 2 } })).toEqual({ a: { b: 1, c: 2 } });
    expect(has('a')({ a: 1 })).toBe(true);
    expect(evolve({ a: (value: number) => value + 1 })({ a: 1, b: 2 })).toEqual({ a: 2, b: 2 });
  });
});
