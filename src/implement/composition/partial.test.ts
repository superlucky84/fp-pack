import { describe, it, expect } from 'vitest';
import partial from './partial';

describe('partial', () => {
  it('binds leading arguments', () => {
    const add = (a: number, b: number, c: number) => a + b + c;
    const addOne = partial(add, 1);
    const addOneTwo = partial(add, 1, 2);

    expect(addOne(2, 3)).toBe(6);
    expect(addOneTwo(3)).toBe(6);
  });

  it('preserves this binding', () => {
    const ctx = { base: 10, fn(this: { base: number }, a: number, b: number) { return this.base + a + b; } };
    const addWithBase = partial(ctx.fn, 1);
    expect(addWithBase.call(ctx, 2)).toBe(13);
  });

  it('works with no preset arguments', () => {
    const mul = (a: number, b: number) => a * b;
    const same = partial(mul);
    expect(same(2, 4)).toBe(8);
  });
});
