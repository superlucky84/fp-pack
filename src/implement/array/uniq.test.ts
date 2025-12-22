import { describe, it, expect } from 'vitest';
import uniq from './uniq';

describe('uniq', () => {
  it('removes duplicate primitives', () => {
    expect(uniq([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });

  it('keeps first occurrence order', () => {
    expect(uniq(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c']);
  });

  it('compares by reference for objects', () => {
    const a = { id: 1 };
    const b = { id: 1 };
    expect(uniq([a, b, a])).toEqual([a, b]);
  });
});
