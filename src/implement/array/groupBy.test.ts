import { describe, it, expect } from 'vitest';
import groupBy from './groupBy';

describe('groupBy', () => {
  it('groups items by key function', () => {
    const result = groupBy((n: number) => (n % 2 === 0 ? 'even' : 'odd'), [1, 2, 3, 4]);
    expect(result).toEqual({ odd: [1, 3], even: [2, 4] });
  });

  it('returns empty object for empty arrays', () => {
    expect(groupBy((n: number) => String(n), [])).toEqual({});
  });
});
