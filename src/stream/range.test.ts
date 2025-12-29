import { describe, it, expect } from 'vitest';
import range from './range';

describe('stream range', () => {
  it('creates an ascending range excluding end', () => {
    expect(Array.from(range(0, 4))).toEqual([0, 1, 2, 3]);
  });

  it('creates a descending range excluding end', () => {
    expect(Array.from(range(4, 0))).toEqual([4, 3, 2, 1]);
  });

  it('returns empty when start equals end', () => {
    expect(Array.from(range(2, 2))).toEqual([]);
  });
});
