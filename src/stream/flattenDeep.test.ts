import { describe, it, expect } from 'vitest';
import flattenDeep from './flattenDeep';
import toArray from './toArray';

describe('stream flattenDeep', () => {
  it('flattens sync iterables deeply', () => {
    const result = Array.from(flattenDeep([1, [2, [3, 4], 5], [[6]]]));
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('flattens async inputs deeply', async () => {
    const result = await toArray(
      flattenDeep(Promise.resolve([1, [2, [3]], [[4]]]))
    );
    expect(result).toEqual([1, 2, 3, 4]);
  });
});
