import { describe, it, expect } from 'vitest';
import has from './has';

describe('has', () => {
  it('checks for own properties', () => {
    const user = { id: 1 };
    const hasId = has<typeof user>('id');

    expect(hasId(user)).toBe(true);
    expect(hasId({ id: 2 })).toBe(true);
  });
});
