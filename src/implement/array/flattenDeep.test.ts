import { describe, it, expect } from 'vitest';
import flattenDeep from './flattenDeep';

describe('flattenDeep', () => {
  it('flattens nested arrays of any depth', () => {
    const input = [1, [2, [3, 4], 5], [[6]]];
    expect(flattenDeep(input)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('handles empty arrays', () => {
    expect(flattenDeep([])).toEqual([]);
  });
});
