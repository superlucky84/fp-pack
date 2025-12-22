import { describe, it, expect } from 'vitest';
import unless from './unless';

describe('unless', () => {
  it('applies fn when predicate is false', () => {
    const fn = unless(
      (n: number) => n > 0,
      (n) => n * -1
    );
    expect(fn(-3)).toBe(3);
  });

  it('returns original value when predicate is true', () => {
    const fn = unless(
      (n: number) => n > 0,
      (n) => n * -1
    );
    expect(fn(5)).toBe(5);
  });
});
