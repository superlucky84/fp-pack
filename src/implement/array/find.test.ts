import { describe, it, expect } from 'vitest';
import find from './find';

describe('find', () => {
  it('returns the first matching element', () => {
    expect(find((n: number) => n > 2, [1, 2, 3, 4])).toBe(3);
  });

  it('returns undefined when no items match', () => {
    expect(find((n: number) => n > 10, [1, 2, 3])).toBeUndefined();
  });

  it('returns undefined for empty arrays', () => {
    expect(find((n: number) => n > 0, [])).toBeUndefined();
  });
});
