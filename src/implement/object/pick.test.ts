import { describe, it, expect } from 'vitest';
import pick from './pick';

describe('pick', () => {
  it('picks keys', () => {
    const user = { id: 1, name: 'A', active: true };
    const picked = pick<typeof user>(['id', 'name'], user);

    expect(picked).toEqual({ id: 1, name: 'A' });
    expect(user).toEqual({ id: 1, name: 'A', active: true }); // immutability
  });
});
