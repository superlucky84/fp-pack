import { describe, it, expect } from 'vitest';
import gte from './gte';

describe('gte', () => {
  it('returns true when greater or equal', () => {
    expect(gte(3)(3)).toBe(true);
    expect(gte(3)(4)).toBe(true);
  });

  it('returns false when less', () => {
    expect(gte(3)(2)).toBe(false);
  });
});
