import { describe, it, expect } from 'vitest';
import toUpper from './toUpper';

describe('toUpper', () => {
  it('converts a string to uppercase', () => {
    expect(toUpper('hello')).toBe('HELLO');
    expect(toUpper('HeLLo')).toBe('HELLO');
  });

  it('returns the same string when already uppercase', () => {
    expect(toUpper('FP-PACK')).toBe('FP-PACK');
  });
});
