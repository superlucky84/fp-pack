import { describe, it, expect } from 'vitest';
import gt from './gt';

describe('gt', () => {
  it('returns true when greater', () => {
    expect(gt(3)(5)).toBe(true);
  });

  it('returns false when equal or less', () => {
    expect(gt(3)(3)).toBe(false);
    expect(gt(3)(2)).toBe(false);
  });
});
