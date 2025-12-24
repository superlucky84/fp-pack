import { describe, it, expect } from 'vitest';
import floor from './floor';

describe('floor', () => {
  it('rounds down to nearest integer', () => {
    expect(floor(1.9)).toBe(1);
    expect(floor(-1.1)).toBe(-2);
    expect(floor(2)).toBe(2);
  });
});
