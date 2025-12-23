import { describe, it, expect } from 'vitest';
import toLower from './toLower';

describe('toLower', () => {
  it('converts a string to lowercase', () => {
    expect(toLower('HELLO')).toBe('hello');
    expect(toLower('HeLLo')).toBe('hello');
  });

  it('returns the same string when already lowercase', () => {
    expect(toLower('fp-kit')).toBe('fp-kit');
  });
});
