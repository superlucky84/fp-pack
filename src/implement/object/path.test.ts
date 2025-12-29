import { describe, it, expect } from 'vitest';
import path from './path';

describe('path', () => {
  it('gets nested values', () => {
    const user = { profile: { name: 'A' } };
    expect(path<string>(['profile', 'name'], user)).toBe('A');
  });
});
