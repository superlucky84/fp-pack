import { describe, it, expect } from 'vitest';
import pipe from './pipe';
import SideEffect from './sideEffect';

describe('pipe', () => {
  it('applies functions left-to-right', () => {
    const addOne = (n: number) => n + 1;
    const double = (n: number) => n * 2;
    const toString = (n: number) => `${n}`;

    const fn = pipe(addOne, double, toString);
    expect(fn(3)).toBe('8'); // (3 + 1) * 2 => 8
  });

  it('supports mixed types through the chain', () => {
    const trim = (s: string) => s.trim();
    const splitComma = (s: string) => s.split(',');
    const count = (arr: any[]) => arr.length;
    const isMoreThanTwo = (n: number) => n > 2;

    const fn = pipe(trim, splitComma, count, isMoreThanTwo);
    expect(fn('a, b, c')).toBe(true);
    expect(fn('x, y')).toBe(false);
  });

  it('works with a single function', () => {
    const square = (n: number) => n * n;
    const fn = pipe(square);
    expect(fn(5)).toBe(25);
  });

  it('short-circuits when SideEffect is returned', () => {
    const effect = new SideEffect(() => 'effect');
    const stop = (value: number) => effect;
    const after = (value: number) => value + 1;

    const fn = pipe((n: number) => n + 1, stop, after);
    const result = fn(1);

    expect(result).toBe(effect);
  });
});
