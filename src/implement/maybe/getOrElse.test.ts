import { describe, it, expect } from 'vitest';
import getOrElse from './getOrElse';

describe('getOrElse', () => {
  it('returns default for nullish values', () => {
    const fallback = getOrElse('default');

    expect(fallback(null)).toBe('default');
    expect(fallback(undefined)).toBe('default');
  });

  it('returns the value when present', () => {
    const fallback = getOrElse('default');

    expect(fallback('value')).toBe('value');
  });
});
