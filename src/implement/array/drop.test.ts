import { describe, it, expect } from 'vitest';
import drop from './drop';

describe('drop', () => {
  it('drops the first n items', () => {
    expect(drop(2, [1, 2, 3, 4])).toEqual([3, 4]);
  });

  it('returns an empty array when n exceeds length', () => {
    expect(drop(10, [1, 2, 3])).toEqual([]);
  });

  it('returns the same array for non-positive n', () => {
    const arr = [1, 2, 3];
    expect(drop(0, arr)).toBe(arr);
    expect(drop(-1, arr)).toBe(arr);
  });

  it('handles empty arrays', () => {
    expect(drop(3, [])).toEqual([]);
  });
});
