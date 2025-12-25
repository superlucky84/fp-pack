import { describe, it, expect } from 'vitest';
import round from './round';

describe('round', () => {
  it('rounds to the nearest integer', () => {
    expect(round(1.4)).toBe(1);
    expect(round(1.5)).toBe(2);
    expect(round(-1.5)).toBe(-1);
  });
});
