import { describe, expect, it } from 'vitest';
import {
  evolve,
  merge,
  mergeDeep,
  pipe,
  prop,
  pick,
  omit,
  path,
  assocPath,
  flattenDeep,
  getOrElse,
  map
} from '../../index';

describe('inference usability: data contracts', () => {
  it('uses transformed property values and preserves untouched fields', () => {
    const input = { count: 1, label: 'one' };
    const output = pipe(input, evolve({ count: (n) => n.toFixed() }), (x) => x.count.toUpperCase() + x.label);
    expect(output).toBe('1one');
    expect(input).toEqual({ count: 1, label: 'one' });
  });

  it('keeps runtime right precedence for shallow and deep overwrites', () => {
    expect(merge({ count: 'old' }, { count: 1 })).toEqual({ count: 1 });
    expect(mergeDeep({ nested: { count: 'old', keep: true } }, { nested: { count: 1 } })).toEqual({
      nested: { count: 1, keep: true }
    });
    expect(merge({ count: 'old' }, { count: undefined })).toEqual({ count: undefined });
  });

  it('handles optional properties and missing path segments consistently', () => {
    const user: { name: string; nickname?: string } = { name: 'Ada' };
    expect(pipe(user, prop('name'))).toBe('Ada');
    expect(pipe(user, prop('nickname'))).toBeUndefined();
    expect(pipe(user, pick(['nickname']))).toEqual({});
    expect(pipe(user, omit(['nickname']))).toEqual(user);
    expect(path(['nickname', 'length'], user)).toBeUndefined();
  });

  it('does not mutate readonly data while following nested transformations', () => {
    const input = { user: { id: 1, name: 'Ada' } };
    const output = assocPath(['user', 'name'], 42, input);
    expect(path(['user', 'name'], output)).toBe(42);
    expect(input.user.name).toBe('Ada');
    expect(flattenDeep([1, [2, [3]]] as const)).toEqual([1, 2, 3]);
    const rows: readonly { name: string }[] = [{ name: 'Ada' }];
    expect(
      pipe(
        rows,
        map((x) => x.name)
      )
    ).toEqual(['Ada']);
  });

  it('uses fallback only for nullish values', () => {
    expect(getOrElse('fallback')('')).toBe('');
    expect(getOrElse(9)(0)).toBe(0);
    expect(getOrElse(true)(false)).toBe(false);
    expect(getOrElse(null)(undefined)).toBeNull();
    const values: { name: string }[] | undefined = undefined;
    expect(
      pipe(
        values,
        getOrElse([]),
        map((x) => x)
      )
    ).toEqual([]);
  });

  it('preserves source values when an optional transformer is absent', () => {
    const transformations: { count?: (n: number) => string } = {};
    expect(evolve(transformations, { count: 1 })).toEqual({ count: 1 });
    transformations.count = (n) => n.toFixed();
    expect(evolve(transformations, { count: 1 })).toEqual({ count: '1' });
  });

  it('deeply merges own enumerable symbol keys', () => {
    const key = Symbol('nested');
    const left = { [key]: { count: 'old', keep: true } };
    const right = { [key]: { count: 2 } };
    expect(mergeDeep(left, right)).toEqual({ [key]: { count: 2, keep: true } });
    expect(left[key].count).toBe('old');
  });
});
