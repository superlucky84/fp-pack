import { describe, it, expect } from 'vitest';
import max from './max';

describe('max', () => {
  it('returns maximum value in array', () => {
    expect(max([1, 5, 3])).toBe(5);
    expect(max([-10, -5, -7])).toBe(-5);
  });

  it('returns -Infinity for empty array', () => {
    expect(max([])).toBe(-Infinity);
  });
});
