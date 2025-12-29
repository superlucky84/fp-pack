import { describe, it, expect } from 'vitest';
import unless from './unless';

describe('unless', () => {
  it('applies fn when predicate is false', () => {
    const result = unless(
      (n: number) => n > 0,
      (n) => n * -1,
      -3
    );
    expect(result).toBe(3);
  });

  it('returns original value when predicate is true', () => {
    const result = unless(
      (n: number) => n > 0,
      (n) => n * -1,
      5
    );
    expect(result).toBe(5);
  });
});
