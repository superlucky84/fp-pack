import { describe, it, expect, vi } from 'vitest';
import once from './once';

describe('once', () => {
  it('only calls the function once', () => {
    const spy = vi.fn((n: number) => n * 2);
    const o = once(spy);

    expect(o(2)).toBe(4);
    expect(o(3)).toBe(4);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('preserves this binding', () => {
    const ctx = { base: 5, fn(this: { base: number }, v: number) { return this.base + v; } };
    const o = once(ctx.fn);

    expect(o.call(ctx, 2)).toBe(7);
    expect(o.call(ctx, 100)).toBe(7);
  });

  it('memoizes the first return value even if it is undefined', () => {
    const spy = vi.fn(() => undefined);
    const o = once(spy);

    expect(o()).toBeUndefined();
    expect(o()).toBeUndefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
