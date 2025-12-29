import { describe, it, expect } from 'vitest';
import tail from './tail';

describe('tail', () => {
  it('returns all elements except the first', () => {
    expect(tail([1, 2, 3])).toEqual([2, 3]);
  });

  it('returns empty array for arrays with 0 or 1 element', () => {
    expect(tail([])).toEqual([]);
    expect(tail([1])).toEqual([]);
  });
});
