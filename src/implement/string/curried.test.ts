import { describe, it, expect } from 'vitest';
import split from './split';
import join from './join';
import replace from './replace';
import match from './match';

describe('string (curried)', () => {
  it('supports direct and data-last currying', () => {
    expect(split(',', 'a,b,c')).toEqual(['a', 'b', 'c']);
    expect(split(',')('a,b,c')).toEqual(['a', 'b', 'c']);

    expect(join('-', ['a', 'b', 'c'])).toBe('a-b-c');
    expect(join('-')(['a', 'b', 'c'])).toBe('a-b-c');

    expect(replace('a', 'b', 'a-a')).toBe('b-a');
    expect(replace('a', 'b')('a-a')).toBe('b-a');

    expect(match(/a/g, 'a1a2')).toEqual(['a', 'a']);
    expect(match(/a/g)('a1a2')).toEqual(['a', 'a']);
  });
});
