import { describe, it, expect } from 'vitest';
import prop from './prop';

describe('prop', () => {
  it('gets a property', () => {
    const user = { id: 1, name: 'A' };
    expect(prop<typeof user>('name', user)).toBe('A');
  });
});
