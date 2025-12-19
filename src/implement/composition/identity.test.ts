import { describe, it, expect } from 'vitest';
import identity from './identity';

describe('identity', () => {
  it('returns the same value', () => {
    expect(identity(5)).toBe(5);
    expect(identity('fp')).toBe('fp');
  });

  it('preserves reference identity', () => {
    const obj = { a: 1 };
    expect(identity(obj)).toBe(obj);
  });
});
