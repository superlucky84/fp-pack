import { describe, it, expect } from 'vitest';
import evolve from './evolve';

describe('evolve', () => {
  it('transforms values by schema', () => {
    const user = { id: 1, name: 'A' };
    const updated = evolve<{ id: number; name: string }>({
      id: (value) => value + 1,
      name: (value) => value.toLowerCase(),
    })(user);

    expect(updated).toEqual({ id: 2, name: 'a' });
  });
});
