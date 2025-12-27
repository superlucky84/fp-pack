import { describe, it, expect } from 'vitest';
import dissoc from './dissoc';

describe('dissoc', () => {
  it('removes a key immutably', () => {
    const user = { id: 1, name: 'A' };
    const updated = dissoc<typeof user>('name')(user);

    expect(updated).toEqual({ id: 1 });
    expect(user).toEqual({ id: 1, name: 'A' });
  });

  it('removes an array index immutably', () => {
    const list = ['a', 'b', 'c'];
    const updated = dissoc<string[]>(1)(list);

    expect(updated).toEqual(['a', 'c']);
    expect(list).toEqual(['a', 'b', 'c']);
  });
});
