import { describe, it, expect } from 'vitest';
import uniqBy from './uniqBy';

describe('uniqBy', () => {
  it('removes duplicates based on key selector', () => {
    const items = [
      { id: 1, v: 'a' },
      { id: 2, v: 'b' },
      { id: 3, v: 'a' },
    ];
    expect(uniqBy((x) => x.v, items)).toEqual([
      { id: 1, v: 'a' },
      { id: 2, v: 'b' },
    ]);
  });

  it('preserves first occurrence order', () => {
    const arr = ['aa', 'ab', 'ba', 'bb'];
    const result = uniqBy((s) => s[0], arr); // key: first letter
    expect(result).toEqual(['aa', 'ba']);
  });
});
