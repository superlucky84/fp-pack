import { describe, it, expect } from 'vitest';
import unzip from './unzip';

describe('unzip', () => {
  it('splits pairs into two arrays', () => {
    const input: Array<[number, string]> = [
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ];

    const [nums, strs] = unzip(input);
    expect(nums).toEqual([1, 2, 3]);
    expect(strs).toEqual(['a', 'b', 'c']);
  });

  it('handles empty arrays', () => {
    const [nums, strs] = unzip([]);
    expect(nums).toEqual([]);
    expect(strs).toEqual([]);
  });
});
