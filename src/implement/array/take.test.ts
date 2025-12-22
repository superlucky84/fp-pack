import { describe, it, expect } from 'vitest';
import take from './take';

describe('take', () => {
  it('takes first n elements', () => {
    expect(take(2, [1, 2, 3, 4])).toEqual([1, 2]);
  });

  it('returns empty when n <= 0', () => {
    expect(take(0, [1, 2, 3])).toEqual([]);
    expect(take(-1, [1, 2, 3])).toEqual([]);
  });

  it('returns copy when n >= length', () => {
    const arr = [1, 2];
    const result = take(5, arr);
    expect(result).toEqual([1, 2]);
    expect(result).not.toBe(arr); // 불변성
  });
});
