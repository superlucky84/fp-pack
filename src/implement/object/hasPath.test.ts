import { describe, it, expect } from 'vitest';
import hasPath from './hasPath';

describe('hasPath', () => {
  it('checks for nested path', () => {
    const user = { profile: { name: 'A' } };
    const hasName = hasPath(['profile', 'name']);
    const hasAge = hasPath(['profile', 'age']);

    expect(hasName(user)).toBe(true);
    expect(hasAge(user)).toBe(false);
  });
});
