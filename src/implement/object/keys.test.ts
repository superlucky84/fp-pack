import { describe, it, expect } from 'vitest';
import keys from './keys';

describe('keys', () => {
  it('returns object keys', () => {
    const user = { id: 1, name: 'A' };
    expect(keys(user)).toEqual(['id', 'name']);
  });
});
