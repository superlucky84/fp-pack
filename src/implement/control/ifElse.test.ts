import { describe, it, expect, vi } from 'vitest';
import ifElse from './ifElse';

describe('ifElse', () => {
  it('runs onTrue when predicate is true', () => {
    const result = ifElse(
      (n: number) => n > 0,
      (n) => `positive ${n}`,
      (n) => `non-positive ${n}`,
      3
    );
    expect(result).toBe('positive 3');
  });

  it('runs onFalse when predicate is false', () => {
    const result = ifElse(
      (n: number) => n > 0,
      () => 'yes',
      () => 'no',
      -1
    );
    expect(result).toBe('no');
  });

  it('supports different return types for onTrue/onFalse', () => {
    const trueResult = ifElse(
      (flag: boolean) => flag,
      () => ({ ok: true }),
      () => 'nope',
      true
    );

    const falseResult = ifElse(
      (flag: boolean) => flag,
      () => ({ ok: true }),
      () => 'nope',
      false
    );

    expect(trueResult).toEqual({ ok: true });
    expect(falseResult).toBe('nope');
  });

  it('passes the original value to handlers', () => {
    const spyTrue = vi.fn((n: number) => n * 2);
    const spyFalse = vi.fn((n: number) => n * -1);
    const trueResult = ifElse(
      (n: number) => n % 2 === 0,
      spyTrue,
      spyFalse,
      4
    );

    expect(trueResult).toBe(8);
    expect(spyTrue).toHaveBeenCalledWith(4);
    expect(spyFalse).not.toHaveBeenCalled();

    const falseResult = ifElse(
      (n: number) => n % 2 === 0,
      spyTrue,
      spyFalse,
      3
    );

    expect(falseResult).toBe(-3);
    expect(spyFalse).toHaveBeenCalledWith(3);
  });
});
