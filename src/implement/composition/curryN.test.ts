import { describe, expect, it, vi } from 'vitest';
import { curryN, pipe, pipeAsync } from '../../index';

describe('curryN', () => {
  it('chooses when default arguments are used', () => {
    const add = (a: number, b = 10) => a + b;
    expect(curryN(1, add)(2)).toBe(12);
    expect(curryN(2, add)(2)(3)).toBe(5);
    expect(curryN(2, add)(2, undefined)).toBe(12);
    expect(curryN(1, add)(2, 3)).toBe(5);
  });

  it('handles optional parameters without guessing from function.length', () => {
    const format = (value: number, unit?: string) => value.toFixed() + (unit ?? '');
    expect(curryN(1, format)(2)).toBe('2');
    expect(curryN(2, format)(2)('kg')).toBe('2kg');
    expect(curryN(2, format)(2)(undefined)).toBe('2');
  });

  it('forwards rest arguments beyond the execution threshold', () => {
    const sum = (...values: number[]) => values.reduce((a, b) => a + b, 0);
    expect(curryN(3, sum)(1)(2, 3, 4)).toBe(10);
    const labeled = (label: string, ...values: number[]) => label + sum(...values);
    expect(curryN(3, labeled)('sum:')(1, 2, 3)).toBe('sum:6');
    expect(curryN(1, labeled)('sum:')).toBe('sum:0');
  });

  it('keeps grouped, empty and reusable partial applications independent', () => {
    const collect = curryN(4, (a: number, b: string, c: boolean, d: number) => [a, b, c, d]);
    const first = collect(1);
    expect(first()('x', true)(2)).toEqual([1, 'x', true, 2]);
    expect(first('y')(false, 3)).toEqual([1, 'y', false, 3]);
    expect(collect()(2, 'z', true, 4)).toEqual([2, 'z', true, 4]);
  });

  it('defers zero-arity invocation until the returned function is called', () => {
    const effect = vi.fn(() => 42);
    const run = curryN(0, effect);
    expect(effect).not.toHaveBeenCalled();
    expect(run()).toBe(42);
    expect(run()).toBe(42);
    expect(effect).toHaveBeenCalledTimes(2);
    expect(curryN(0, (value = 10) => value)(3)).toBe(3);
  });

  it('only runs callbacks and propagates their errors at completion', () => {
    const work = vi.fn((_a: number, _b: number): never => {
      throw new Error('work failed');
    });
    const partial = curryN(2, work)(1);
    expect(work).not.toHaveBeenCalled();
    expect(() => partial(2)).toThrow('work failed');
    expect(work).toHaveBeenCalledOnce();
  });

  it('preserves Promise results and composes with pipelines', async () => {
    const add = curryN(2, async (a: number, b = 10) => a + b);
    expect(add(1)(2)).toBeInstanceOf(Promise);
    expect(await pipeAsync(2, add(1))).toBe(3);
    expect(pipe(2, curryN(2, (a: number, b: number) => a + b)(1))).toBe(3);
  });

  it('supports the maximum count without eager evaluation', () => {
    const work = vi.fn((...values: number[]) => values.length);
    const almost = curryN(32, work)(
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31
    );
    expect(work).not.toHaveBeenCalled();
    expect(almost(32)).toBe(32);
  });

  it('rejects invalid runtime counts and nonfunction input from JavaScript', () => {
    for (const count of [-1, 0.5, 33, NaN, Infinity, -Infinity, '2', null]) {
      expect(() => Reflect.apply(curryN, undefined, [count, () => 1])).toThrow(RangeError);
    }
    expect(() => Reflect.apply(curryN, undefined, [1, null])).toThrow(TypeError);
  });

  it('counts a default slot before a later required argument', () => {
    const repeat = (count = 1, label: string) => label.repeat(count);
    expect(curryN(2, repeat)(undefined)('x')).toBe('x');
    expect(curryN(2, repeat)(3, 'x')).toBe('xxx');
  });

  it('combines optional heads, rest values and explicit undefined', () => {
    const format = (label?: string, ...values: number[]) => (label ?? 'sum:') + values.reduce((a, b) => a + b, 0);
    expect(curryN(2, format)(undefined)(1, 2)).toBe('sum:3');
    expect(curryN(0, format)()).toBe('sum:0');
    const pair: readonly [number, number] = [1, 2];
    expect(curryN(2, (...values: number[]) => values.length)(...pair)).toBe(2);
  });
});
