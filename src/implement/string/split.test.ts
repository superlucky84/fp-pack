import { describe, it, expect } from 'vitest';
import split from './split';

describe('split', () => {
  it('splits by separator', () => {
    expect(split(',', 'a,b,c')).toEqual(['a', 'b', 'c']);
  });

  it('handles missing separator occurrences', () => {
    expect(split(',', 'abc')).toEqual(['abc']);
  });
});
