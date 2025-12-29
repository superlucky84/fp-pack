import { describe, it, expect } from 'vitest';
import last from './last';

describe('last', () => {
  it('returns the last element', () => {
    expect(last([1, 2, 3])).toBe(3);
  });

  it('returns undefined for empty arrays', () => {
    expect(last([])).toBeUndefined();
  });
});
