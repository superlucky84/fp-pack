import { describe, it, expect } from 'vitest';
import chunk from './chunk';
import drop from './drop';
import every from './every';
import filter from './filter';
import find from './find';
import flatMap from './flatMap';
import groupBy from './groupBy';
import map from './map';
import reduce from './reduce';
import some from './some';
import sort from './sort';
import sortBy from './sortBy';
import take from './take';
import uniqBy from './uniqBy';
import zip from './zip';

describe('array (curried)', () => {
  it('supports data-last currying', () => {
    expect(chunk(2)([1, 2, 3, 4, 5])).toEqual([[1, 2], [3, 4], [5]]);
    expect(drop(2)([1, 2, 3, 4])).toEqual([3, 4]);
    expect(take(2)([1, 2, 3, 4])).toEqual([1, 2]);
    expect(map((n: number) => n * 2)([1, 2])).toEqual([2, 4]);
    expect(filter((n: number) => n % 2 === 0)([1, 2, 3, 4])).toEqual([2, 4]);
    expect(find((n: number) => n > 2)([1, 2, 3, 4])).toBe(3);
    expect(flatMap((n: number) => [n, n * 2])([1, 2])).toEqual([1, 2, 2, 4]);
    expect(reduce((acc: number, n: number) => acc + n)(0)([1, 2, 3])).toBe(6);
    expect(some((n: number) => n > 2)([1, 2, 3])).toBe(true);
    expect(every((n: number) => n > 0)([1, 2, 3])).toBe(true);
    expect(sort((a: number, b: number) => a - b)([3, 1, 2])).toEqual([1, 2, 3]);
    expect(sortBy((item: { n: number }) => item.n)([{ n: 3 }, { n: 1 }, { n: 2 }])).toEqual([
      { n: 1 },
      { n: 2 },
      { n: 3 },
    ]);
    expect(groupBy((n: number) => (n % 2 === 0 ? 'even' : 'odd'))([1, 2, 3, 4])).toEqual({
      odd: [1, 3],
      even: [2, 4],
    });
    expect(uniqBy((item: { id: number }) => item.id)([{ id: 1 }, { id: 1 }, { id: 2 }])).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
    expect(zip(['a', 'b', 'c'])([1, 2])).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });
});
