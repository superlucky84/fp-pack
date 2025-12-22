import { describe, it, expect } from 'vitest';
import when from './when';

describe('when', () => {
  it('applies fn when predicate is true', () => {
    const fn = when(
      (n: number) => n > 0,
      (n) => n * 2
    );
    expect(fn(3)).toBe(6);
  });

  it('returns original value when predicate is false', () => {
    const fn = when(
      (n: number) => n > 0,
      (n) => n * 2
    );
    expect(fn(-2)).toBe(-2);
  });
});
