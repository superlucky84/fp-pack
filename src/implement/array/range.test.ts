import { describe, it, expect } from 'vitest';
import range from './range';

describe('range', () => {
  it('creates an ascending range excluding the end', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  it('creates a descending range excluding the end', () => {
    expect(range(5, 0)).toEqual([5, 4, 3, 2, 1]);
  });

  it('returns empty array when start equals end', () => {
    expect(range(3, 3)).toEqual([]);
  });
});
