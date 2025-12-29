import { describe, it, expect } from 'vitest';
import mapMaybe from './mapMaybe';

describe('mapMaybe', () => {
  it('filters out nullish mapped values', () => {
    const users = [
      { id: 1, name: 'A' },
      { id: 2 },
      { id: 3, name: 'C' },
    ];

    const names = mapMaybe((user: { name?: string }) => user.name)(users);

    expect(names).toEqual(['A', 'C']);
  });

  it('returns an empty array when nothing matches', () => {
    const values = [1, 2, 3];
    const odds = mapMaybe((value: number) => (value % 2 === 0 ? null : undefined))(values);

    expect(odds).toEqual([]);
  });
});
