import { describe, it, expect } from 'vitest';
import path from './path';

describe('path', () => {
  it('gets nested values', () => {
    const user = { profile: { name: 'A' } };
    const getName = path<string>(['profile', 'name']);

    expect(getName(user)).toBe('A');
  });
});
