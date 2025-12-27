import { describe, it, expect } from 'vitest';
import values from './values';

describe('values', () => {
  it('returns object values', () => {
    const user = { id: 1, name: 'A' };
    expect(values(user)).toEqual([1, 'A']);
  });
});
