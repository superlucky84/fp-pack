import { describe, it, expect } from 'vitest';
import sum from './sum';

describe('sum', () => {
  it('sums array values', () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([-1, 2, -3])).toBe(-2);
    expect(sum([])).toBe(0);
  });
});
