import { describe, it, expect } from 'vitest';
import min from './min';

describe('min', () => {
  it('returns the minimum value in an array', () => {
    expect(min([3, 1, 5])).toBe(1);
  });

  it('returns Infinity for empty arrays', () => {
    expect(min([])).toBe(Infinity);
  });
});
