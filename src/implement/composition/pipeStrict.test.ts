import { describe, it, expect } from 'vitest';
import pipeStrict from './pipeStrict';

describe('pipeStrict', () => {
  it('applies functions left-to-right', () => {
    const addOne = (n: number) => n + 1;
    const double = (n: number) => n * 2;
    const toString = (n: number) => `${n}`;

    const fn = pipeStrict(addOne, double, toString);
    expect(fn(3)).toBe('8');
  });

  it('supports data-first invocation', () => {
    const addOne = (n: number) => n + 1;
    const double = (n: number) => n * 2;

    expect(pipeStrict(3, addOne, double)).toBe(8);
  });

  it('supports mixed types through the chain', () => {
    const trim = (s: string) => s.trim();
    const splitComma = (s: string) => s.split(',');
    const count = (arr: string[]) => arr.length;
    const isMoreThanTwo = (n: number) => n > 2;

    const fn = pipeStrict(trim, splitComma, count, isMoreThanTwo);
    expect(fn('a, b, c')).toBe(true);
    expect(fn('x, y')).toBe(false);
  });

  it('works with a single function', () => {
    const square = (n: number) => n * n;
    const fn = pipeStrict(square);

    expect(fn(5)).toBe(25);
  });

  it('supports zero-arity starts', () => {
    const start = () => 3;
    const addOne = (n: number) => n + 1;
    const fn = pipeStrict(start, addOne);

    expect(fn()).toBe(4);
  });
});
