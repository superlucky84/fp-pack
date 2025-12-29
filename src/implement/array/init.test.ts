import { describe, it, expect } from 'vitest';
import init from './init';

describe('init', () => {
  it('returns all elements except the last', () => {
    expect(init([1, 2, 3])).toEqual([1, 2]);
  });

  it('returns empty array for arrays with 0 or 1 element', () => {
    expect(init([])).toEqual([]);
    expect(init([1])).toEqual([]);
  });
});
