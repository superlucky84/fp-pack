import { describe, it, expect } from 'vitest';
import partition from './partition';

describe('partition', () => {
  it('splits items by predicate', () => {
    const [even, odd] = partition((value: number) => value % 2 === 0, [1, 2, 3, 4, 5]);
    expect(even).toEqual([2, 4]);
    expect(odd).toEqual([1, 3, 5]);
  });

  it('returns empty groups for empty arrays', () => {
    expect(partition((value: number) => value > 0, [])).toEqual([[], []]);
  });
});
