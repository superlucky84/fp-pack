import { describe, it, expect } from 'vitest';
import omit from './omit';

describe('omit', () => {
  it('removes keys', () => {
    const user = { id: 1, name: 'A', active: true };
    const updated = omit<typeof user>(['active'], user);

    expect(updated).toEqual({ id: 1, name: 'A' });
    expect(user).toEqual({ id: 1, name: 'A', active: true }); // immutability
  });
});
