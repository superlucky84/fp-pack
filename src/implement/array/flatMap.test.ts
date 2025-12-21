import { describe, it, expect } from 'vitest';
import flatMap from './flatMap';

describe('flatMap', () => {
  it('maps and flattens one level', () => {
    const result = flatMap((n: number) => [n, n * 2], [1, 2, 3]);
    expect(result).toEqual([1, 2, 2, 4, 3, 6]);
  });

  it('returns empty array for empty input', () => {
    expect(flatMap((n: number) => [n], [])).toEqual([]);
  });
});
