import { describe, it, expect } from 'vitest';
import maybe from './maybe';

describe('maybe', () => {
  it('applies the function when value exists', () => {
    const toUpper = maybe((value: string) => value.toUpperCase());
    expect(toUpper('fp')).toBe('FP');
  });

  it('returns null for null or undefined', () => {
    const toUpper = maybe((value: string) => value.toUpperCase());
    expect(toUpper(null)).toBeNull();
    expect(toUpper(undefined)).toBeNull();
  });
});
