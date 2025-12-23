import { describe, it, expect } from 'vitest';
import trim from './trim';

describe('trim', () => {
  it('removes whitespace from both ends', () => {
    expect(trim('  hello  ')).toBe('hello');
  });

  it('returns the same string when no trim needed', () => {
    expect(trim('fp-kit')).toBe('fp-kit');
  });
});
