import { describe, it, expect } from 'vitest';
import fmap from './fmap';

const Box = <T>(value: T) => ({
  value,
  map<R>(fn: (value: T) => R) {
    return Box(fn(value));
  },
});

describe('fmap', () => {
  it('delegates to the functor map implementation', () => {
    const result = fmap((n: number) => n + 1)(Box(1));
    expect((result as { value: number }).value).toBe(2);
  });
});
