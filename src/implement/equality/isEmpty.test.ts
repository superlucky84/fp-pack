import { describe, it, expect } from 'vitest';
import isEmpty from './isEmpty';

describe('isEmpty', () => {
  it('returns true for null/undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it('checks strings and arrays', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty('a')).toBe(false);
    expect(isEmpty([1])).toBe(false);
  });

  it('checks objects and maps/sets', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty(new Map([['a', 1]]))).toBe(false);
  });
});
