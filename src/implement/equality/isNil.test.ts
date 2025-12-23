import { describe, it, expect } from 'vitest';
import isNil from './isNil';

describe('isNil', () => {
  it('returns true for null or undefined', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });

  it('returns false for other values', () => {
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil(false)).toBe(false);
    expect(isNil({})).toBe(false);
  });
});
