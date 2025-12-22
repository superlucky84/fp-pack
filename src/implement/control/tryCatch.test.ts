import { describe, it, expect } from 'vitest';
import tryCatch from './tryCatch';

describe('tryCatch', () => {
  it('returns tryFn result when no error', () => {
    const fn = tryCatch(
      (n: number) => n * 2,
      () => -1
    );
    expect(fn(3)).toBe(6);
  });

  it('calls catchFn on thrown error', () => {
    const fn = tryCatch(
      () => {
        throw new Error('boom');
      },
      (err) => err.message
    );
    expect(fn(0)).toBe('boom');
  });

  it('wraps non-Error throw values', () => {
    const fn = tryCatch(
      () => {
        throw 'oops';
      },
      (err) => err.message
    );
    expect(fn(0)).toBe('oops');
  });
});
