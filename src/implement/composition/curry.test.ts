import { describe, it, expect } from 'vitest';
import curry from './curry';

describe('curry', () => {
  it('curries a binary function', () => {
    const add = (a: number, b: number) => a + b;
    const curriedAdd = curry(add);

    expect(curriedAdd(1, 2)).toBe(3);
    expect(curriedAdd(1)(2)).toBe(3);
  });

  it('curries a ternary function across multiple calls', () => {
    const combine = (a: string, b: string, c: string) => `${a}-${b}-${c}`;
    const curriedCombine = curry(combine);

    expect(curriedCombine('x')('y')('z')).toBe('x-y-z');
    expect(curriedCombine('x', 'y')('z')).toBe('x-y-z');
    expect(curriedCombine('x')('y', 'z')).toBe('x-y-z');
  });

  it('keeps grouped applications reusable through five arguments', () => {
    const sum = curry((a: number, b: number, c: number, d: number, e: number) => a + b + c + d + e);
    const withOne = sum(1);
    expect(withOne(2, 3)(4, 5)).toBe(15);
    expect(withOne(2)(3, 4, 6)).toBe(16);
  });

  it('reuses partial applications', () => {
    const sum3 = (a: number, b: number, c: number) => a + b + c;
    const curried = curry(sum3);

    const addOne = curried(1);
    const addOneAndTwo = addOne(2);

    expect(addOneAndTwo(3)).toBe(6);
    expect(addOneAndTwo(5)).toBe(8);
  });
});
