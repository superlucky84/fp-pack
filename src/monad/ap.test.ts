import { describe, it, expect } from 'vitest';
import ap from './ap';

const Box = <T>(value: T) => ({
  value,
  map<R>(fn: (value: T) => R) {
    return Box(fn(value));
  },
  ap<R>(this: { value: (v: unknown) => R }, other: { value: unknown }) {
    return Box(this.value(other.value));
  },
});

describe('ap', () => {
  it('delegates to ap on the function container', () => {
    const add1 = Box((n: number) => n + 1);
    const result = ap(add1)(Box(2));
    expect((result as { value: number }).value).toBe(3);
  });
});
