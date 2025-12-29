import { describe, it, expect } from 'vitest';
import head from './head';

describe('head', () => {
  it('returns the first element', () => {
    expect(head([1, 2, 3])).toBe(1);
  });

  it('returns undefined for empty arrays', () => {
    expect(head([])).toBeUndefined();
  });
});
