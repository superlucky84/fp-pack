import { describe, it, expect } from 'vitest';
import ceil from './ceil';

describe('ceil', () => {
  it('rounds up to nearest integer', () => {
    expect(ceil(1.1)).toBe(2);
    expect(ceil(-1.1)).toBe(-1);
    expect(ceil(2)).toBe(2);
  });
});
