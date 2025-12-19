import { describe, it, expect, vi } from 'vitest';
import memoize from './memoize';

describe('memoize', () => {
  it('caches results for identical args', () => {
    const spy = vi.fn((a: number, b: number) => a + b);
    const m = memoize(spy);

    expect(m(1, 2)).toBe(3);
    expect(m(1, 2)).toBe(3);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('distinguishes different args', () => {
    const spy = vi.fn((a: number, b: number) => a * b);
    const m = memoize(spy);

    expect(m(2, 3)).toBe(6);
    expect(m(3, 2)).toBe(6);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('respects reference equality for object args', () => {
    const spy = vi.fn((obj: { v: number }) => obj.v * 2);
    const m = memoize(spy);

    const ref = { v: 5 };
    expect(m(ref)).toBe(10);
    expect(m(ref)).toBe(10);
    expect(m({ v: 5 })).toBe(10);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('preserves this binding', () => {
    const ctx = {
      factor: 10,
      fn(this: { factor: number }, x: number) {
        return this.factor + x;
      },
    };

    const m = memoize(ctx.fn);
    expect(m.call(ctx, 5)).toBe(15);
    expect(m.call(ctx, 5)).toBe(15);
  });
});
