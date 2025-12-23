import { describe, it, expect } from 'vitest';
import startsWith from './startsWith';

describe('startsWith', () => {
  it('returns true when the string starts with the prefix', () => {
    expect(startsWith('he', 'hello')).toBe(true);
  });

  it('returns false when the string does not start with the prefix', () => {
    expect(startsWith('no', 'hello')).toBe(false);
  });

  it('treats empty prefix as true', () => {
    expect(startsWith('', 'hello')).toBe(true);
  });

  it('supports array prefix checks', () => {
    expect(startsWith([1, 2], [1, 2, 3])).toBe(true);
    expect(startsWith([2, 3], [1, 2, 3])).toBe(false);
  });
});
