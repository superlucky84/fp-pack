import { describe, it, expect } from 'vitest';
import add from './add';

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
  });
});
