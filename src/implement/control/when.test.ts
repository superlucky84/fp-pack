import { describe, it, expect } from 'vitest';
import when from './when';

describe('when', () => {
  it('applies fn when predicate is true', () => {
    const result = when(
      (n: number) => n > 0,
      (n) => n * 2,
      3
    );
    expect(result).toBe(6);
  });

  it('returns original value when predicate is false', () => {
    const result = when(
      (n: number) => n > 0,
      (n) => n * 2,
      -2
    );
    expect(result).toBe(-2);
  });
});
