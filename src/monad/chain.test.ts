import { describe, it, expect } from 'vitest';
import chain from './chain';

const Box = <T>(value: T) => ({
  value,
  chain<R>(fn: (value: T) => { value: R }) {
    return fn(value);
  },
});

describe('chain', () => {
  it('delegates to chain when provided', () => {
    const result = chain((n: number) => Box(n * 2))(Box(2));
    expect((result as { value: number }).value).toBe(4);
  });

  it('falls back to flatMap when chain is missing', () => {
    const flatMapBox = {
      value: 3,
      flatMap(fn: (value: number) => { value: number }) {
        return fn(this.value);
      },
    };
    const result = chain((n: number) => Box(n + 1))(flatMapBox);
    expect((result as { value: number }).value).toBe(4);
  });
});
