import { describe, expect, it } from 'vitest';
import { pipe } from '../index';
import { take, map, filter, flatMap, reduce, toAsync, toArray, zip, zipWith, flattenDeep } from './index';

describe('stream inference contracts', () => {
  it('reuses the same partial application for sync and async sources', async () => {
    const firstTwo = take(2);
    expect([...firstTwo([1, 2, 3])]).toEqual([1, 2]);
    expect(await toArray(firstTwo(Promise.resolve([1, 2, 3])))).toEqual([1, 2]);
  });

  it('awaits predicates, mappings and accumulators at the async input boundary', async () => {
    expect(
      await pipe(
        [1, 2, 3],
        toAsync,
        filter(async (n) => n > 1),
        toArray
      )
    ).toEqual([2, 3]);
    expect(
      await pipe(
        [1, 2],
        toAsync,
        flatMap(async (n) => [n, n * 10]),
        toArray
      )
    ).toEqual([1, 10, 2, 20]);
    expect(
      await pipe(
        [1, 2, 3],
        toAsync,
        reduce(async (sum, n) => sum + n, 0)
      )
    ).toBe(6);
  });

  it('rejects Promise predicates from untyped synchronous callers', () => {
    // Deliberately simulate a JS caller violating the static contract.
    const untyped = filter as unknown as (fn: (n: number) => Promise<boolean>, values: number[]) => Iterable<number>;
    expect(() => [...untyped(async (n) => n > 1, [1, 2, 3])]).toThrow('toAsync');
  });

  it('accepts strings and terminates deep flattening at string leaves', async () => {
    expect(await toArray(map((x) => x.toUpperCase(), 'abc'))).toEqual(['A', 'B', 'C']);
    expect([...flattenDeep(['ab', ['cd']])]).toEqual(['ab', 'cd']);
  });

  it('closes both inputs of a zipped stream on early termination', async () => {
    const closed: string[] = [];
    function* source(name: string) {
      try {
        yield 1;
        yield 2;
      } finally {
        closed.push(name);
      }
    }
    expect([...take(1, zip(source('right'), source('left')))]).toEqual([[1, 1]]);
    expect(closed.sort()).toEqual(['left', 'right']);
    closed.length = 0;
    expect(
      await toArray(
        take(
          1,
          zipWith((a, b) => a + b, toAsync(source('right')), source('left'))
        )
      )
    ).toEqual([2]);
    expect(closed.sort()).toEqual(['left', 'right']);
    closed.length = 0;
    expect([
      ...take(
        1,
        zipWith((a, b) => a + b, source('right'), source('left'))
      )
    ]).toEqual([2]);
    expect(closed.sort()).toEqual(['left', 'right']);
    closed.length = 0;
    expect(await toArray(take(1, zip(toAsync(source('right')), source('left'))))).toEqual([[1, 1]]);
    expect(closed.sort()).toEqual(['left', 'right']);
  });

  it('closes the second input even when closing the first input throws', () => {
    const closed: string[] = [];
    function* source(name: string, fail: boolean) {
      try {
        yield 1;
        yield 2;
      } finally {
        closed.push(name);
        if (fail) throw new Error('close failed');
      }
    }
    expect(() => [...take(1, zip(source('right', false), source('left', true)))]).toThrow('close failed');
    expect(closed).toEqual(['left', 'right']);
  });

  it('resolves Promise elements only when the source is asynchronous', async () => {
    const value = Promise.resolve('a');
    expect([...zip([value], [1])]).toEqual([[1, value]]);
    expect(await toArray(zip([value], Promise.resolve([1])))).toEqual([[1, 'a']]);
    const predicate = (n: number): PromiseLike<boolean> => Promise.resolve(n > 1);
    expect(await toArray(filter(predicate, toAsync([1, 2])))).toEqual([2]);
  });
});
