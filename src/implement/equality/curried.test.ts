import { describe, it, expect } from 'vitest';
import clamp from './clamp';
import equals from './equals';

describe('equality (curried)', () => {
  it('supports data-last currying', () => {
    expect(clamp(0)(10)(15)).toBe(10);
    expect(equals({ a: 1 })({ a: 1 })).toBe(true);
  });
});
