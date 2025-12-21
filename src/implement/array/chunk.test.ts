import { describe, it, expect } from 'vitest';
import chunk from './chunk';

describe('chunk', () => {
  it('splits an array into chunks of the given size', () => {
    const result = chunk(2, [1, 2, 3, 4, 5]);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('returns a single chunk when size exceeds length', () => {
    const result = chunk(10, [1, 2, 3]);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it('returns an empty array for non-positive sizes', () => {
    expect(chunk(0, [1, 2, 3])).toEqual([]);
    expect(chunk(-1, [1, 2, 3])).toEqual([]);
  });

  it('handles empty arrays', () => {
    expect(chunk(3, [])).toEqual([]);
  });
});
