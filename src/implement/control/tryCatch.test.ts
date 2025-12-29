import { describe, it, expect } from 'vitest';
import tryCatch from './tryCatch';

describe('tryCatch', () => {
  it('returns tryFn result when no error', () => {
    const result = tryCatch(
      (n: number) => n * 2,
      () => -1,
      3
    );
    expect(result).toBe(6);
  });

  it('calls catchFn on thrown error', () => {
    const result = tryCatch(
      () => {
        throw new Error('boom');
      },
      (err) => err.message,
      0
    );
    expect(result).toBe('boom');
  });

  it('wraps non-Error throw values', () => {
    const result = tryCatch(
      () => {
        throw 'oops';
      },
      (err) => err.message,
      0
    );
    expect(result).toBe('oops');
  });
});
