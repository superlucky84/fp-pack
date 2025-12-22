import { describe, it, expect } from 'vitest';
import sortBy from './sortBy';

describe('sortBy', () => {
  it('sorts numbers by identity', () => {
    expect(sortBy((n: number) => n, [3, 1, 2])).toEqual([1, 2, 3]);
  });

  it('sorts objects by computed key', () => {
    const users = [
      { name: 'alice', age: 30 },
      { name: 'bob', age: 20 },
      { name: 'carol', age: 25 },
    ];
    const result = sortBy((u) => u.age, users);
    expect(result.map((u) => u.name)).toEqual(['bob', 'carol', 'alice']);
  });

  it('is stable with equal keys', () => {
    const items = [
      { id: 1, group: 'a' },
      { id: 2, group: 'b' },
      { id: 3, group: 'a' },
    ];
    const result = sortBy((x) => x.group, items);
    expect(result.map((x) => x.id)).toEqual([1, 3, 2]); // 원래 순서 유지
  });
});
