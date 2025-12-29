import { describe, it, expect } from 'vitest';
import merge from './merge';

describe('merge', () => {
  it('merges objects shallowly', () => {
    const base = { id: 1, name: 'A' };
    const patch = { name: 'B' };

    expect(merge(base, patch)).toEqual({ id: 1, name: 'B' });
    expect(base).toEqual({ id: 1, name: 'A' }); // immutability check
  });

  it('preserves combined types (compile-time)', () => {
    const a = { id: 1, name: 'Ada' };
    const b = { active: true };
    const result = merge(a, b);
    // TypeScript should allow accessing both sets of properties
    expect(result.id).toBe(1);
    expect(result.name).toBe('Ada');
    expect(result.active).toBe(true);
  });
});
