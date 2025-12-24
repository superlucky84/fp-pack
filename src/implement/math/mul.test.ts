import { describe, it, expect } from 'vitest';
import mul from './mul';

describe('mul', () => {
  it('multiplies two numbers', () => {
    expect(mul(2, 3)).toBe(6);
    expect(mul(-1, 5)).toBe(-5);
  });
});
