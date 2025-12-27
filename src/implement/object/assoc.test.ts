import { describe, it, expect } from 'vitest';
import assoc from './assoc';

describe('assoc', () => {
  it('sets a property immutably', () => {
    const user = { id: 1, name: 'A' };
    const updated = assoc('name', 'B', user);

    expect(updated).toEqual({ id: 1, name: 'B' });
    expect(user).toEqual({ id: 1, name: 'A' });
  });

  it('adds a new key', () => {
    const user = { id: 1, name: 'A' };
    const updated = assoc('age', 20, user);

    expect(updated).toEqual({ id: 1, name: 'A', age: 20 });
  });

  it('updates array indices immutably', () => {
    const items = ['a', 'b'];
    const updated = assoc(1, 'c', items);

    expect(updated).toEqual(['a', 'c']);
    expect(items).toEqual(['a', 'b']);
  });
});
