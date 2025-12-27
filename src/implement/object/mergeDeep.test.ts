import { describe, it, expect } from 'vitest';
import mergeDeep from './mergeDeep';

describe('mergeDeep', () => {
  it('merges nested objects', () => {
    const base = { user: { name: 'A', age: 20 }, meta: { id: 1 } };
    const patch = { user: { age: 21 } };

    expect(mergeDeep(patch)(base)).toEqual({ user: { name: 'A', age: 21 }, meta: { id: 1 } });
  });
});
