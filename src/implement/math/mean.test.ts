import { describe, it, expect } from 'vitest';
import mean from './mean';

describe('mean', () => {
  it('returns the average of numbers', () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
  });

  it('returns NaN for empty arrays', () => {
    expect(Number.isNaN(mean([]))).toBe(true);
  });
});
