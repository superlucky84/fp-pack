import { describe, it, expect } from 'vitest';
import merge from './merge';

describe('merge', () => {
  it('merges objects shallowly', () => {
    const base = { id: 1, name: 'A' };
    const patch = { name: 'B' };

    expect(merge(patch)(base)).toEqual({ id: 1, name: 'B' });
  });
});
