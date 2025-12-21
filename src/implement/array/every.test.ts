import { describe, it, expect } from 'vitest';
import every from './every';

describe('every', () => {
  it('returns true when all items satisfy the predicate', () => {
    expect(every((n: number) => n > 0, [1, 2, 3])).toBe(true);
  });

  it('returns false when any item fails the predicate', () => {
    expect(every((n: number) => n > 2, [1, 2, 3])).toBe(false);
  });

  it('returns true for empty arrays', () => {
    expect(every((n: number) => n > 0, [])).toBe(true);
  });
});
