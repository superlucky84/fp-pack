import { describe, it, expect } from 'vitest';
import flip from './flip';

describe('flip', () => {
  it('swaps the first two arguments of a binary function', () => {
    const divide = (a: number, b: number) => a / b;
    const flipped = flip(divide);

    expect(flipped(2, 10)).toBe(5); // divide(10, 2)
  });

  it('reverses all arguments for variadic functions', () => {
    const concat = (...parts: Array<string | number>) => parts.join('-');
    const flipped = flip(concat);

    expect(flipped(1, 'b', 'a')).toBe('a-b-1');
  });

  it('preserves this binding when used with call/apply', () => {
    const obj = {
      base: 10,
      fn(this: { base: number }, a: number, b: number) {
        return this.base + a - b;
      },
    };

    const flipped = flip(obj.fn);
    expect(flipped.call(obj, 2, 5)).toBe(13); // base + 5 - 2
  });

  it('supports 4-5 arity with reversed order', () => {
    const format4 = (a: string, b: string, c: string, d: string) => `${a}-${b}-${c}-${d}`;
    const flipped4 = flip(format4);
    expect(flipped4('4', '3', '2', '1')).toBe('1-2-3-4');

    const format5 = (a: number, b: number, c: number, d: number, e: number) => a + b * 2 + c * 3 + d * 4 + e * 5;
    const flipped5 = flip(format5);
    // reversed args: 5,4,3,2,1 => 5 + 4*2 + 3*3 + 2*4 + 1*5 = 5 + 8 + 9 + 8 + 5 = 35
    expect(flipped5(1, 2, 3, 4, 5)).toBe(35);
  });
});
