import { describe, it, expect } from 'vitest';
import replace from './replace';

describe('replace', () => {
  it('replaces substring occurrences', () => {
    expect(replace('foo', 'bar', 'foo foo')).toBe('bar foo');
  });

  it('supports regex replacements', () => {
    expect(replace(/a./g, 'x', 'abcdab')).toBe('xcdx');
  });
});
