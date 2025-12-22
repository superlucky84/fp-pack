import { describe, it, expect } from 'vitest';
import sort from './sort';

describe('sort', () => {
  it('sorts numbers using comparator', () => {
    const asc = (a: number, b: number) => a - b;
    expect(sort(asc, [3, 1, 2])).toEqual([1, 2, 3]);
  });

  it('does not mutate the original array', () => {
    const data = [2, 1, 3];
    sort((a, b) => a - b, data);
    expect(data).toEqual([2, 1, 3]);
  });

  it('sorts objects by field with custom comparator', () => {
    const items = [
      { id: 1, score: 30 },
      { id: 2, score: 10 },
      { id: 3, score: 20 },
    ];
    const result = sort((a, b) => a.score - b.score, items);
    expect(result.map((x) => x.id)).toEqual([2, 3, 1]);
  });
});
