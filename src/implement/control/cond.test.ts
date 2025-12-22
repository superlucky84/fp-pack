import { describe, it, expect } from 'vitest';
import cond from './cond';

describe('cond', () => {
  it('returns the first matching branch', () => {
    const fn = cond<number, string>([
      [(n) => n > 10, () => 'big'],
      [(n) => n > 0, () => 'small'],
    ]);

    expect(fn(5)).toBe('small');
    expect(fn(11)).toBe('big');
  });

  it('returns undefined when no predicate matches', () => {
    const fn = cond<number, string>([
      [(n) => n < 0, () => 'neg'],
      [(n) => n > 5, () => 'gt5'],
    ]);

    expect(fn(0)).toBeUndefined();
  });

  it('passes the original value to handler', () => {
    const fn = cond<number, number>([
      [(n) => n % 2 === 0, (n) => n * 2],
      [() => true, (n) => n + 1],
    ]);

    expect(fn(4)).toBe(8);
    expect(fn(3)).toBe(4);
  });
});
