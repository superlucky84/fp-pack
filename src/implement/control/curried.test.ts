import { describe, it, expect } from 'vitest';
import guard from './guard';
import ifElse from './ifElse';
import tryCatch from './tryCatch';
import unless from './unless';
import when from './when';

describe('control (curried)', () => {
  it('supports data-last currying', () => {
    const guardPositive = guard((value: number) => value > 0)(0);
    expect(guardPositive(-1)).toBe(0);
    expect(guardPositive(2)).toBe(2);

    const choose = ifElse((value: number) => value > 0)((value: number) => value * 2)((value: number) => value - 2);
    expect(choose(2)).toBe(4);
    expect(choose(-1)).toBe(-3);

    const safeParse = tryCatch((value: string) => JSON.parse(value) as { ok: boolean })(() => ({ ok: false }));
    expect(safeParse('{"ok":true}')).toEqual({ ok: true });
    expect(safeParse('bad')).toEqual({ ok: false });

    const applyUnless = unless((value: number) => value > 10)((value: number) => value + 1);
    expect(applyUnless(5)).toBe(6);
    expect(applyUnless(20)).toBe(20);

    const applyWhen = when((value: number) => value > 10)((value: number) => value + 1);
    expect(applyWhen(5)).toBe(5);
    expect(applyWhen(20)).toBe(21);
  });
});
