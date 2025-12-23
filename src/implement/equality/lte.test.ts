import { describe, it, expect } from 'vitest';
import lte from './lte';

describe('lte', () => {
  it('returns true when less or equal', () => {
    expect(lte(3)(2)).toBe(true);
    expect(lte(3)(3)).toBe(true);
  });

  it('returns false when greater', () => {
    expect(lte(3)(4)).toBe(false);
  });
});
