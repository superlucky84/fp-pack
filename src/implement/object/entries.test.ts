import { describe, it, expect } from 'vitest';
import entries from './entries';

describe('entries', () => {
  it('returns entries', () => {
    const user = { id: 1, name: 'A' };
    expect(entries(user)).toEqual([
      ['id', 1],
      ['name', 'A'],
    ]);
  });
});
