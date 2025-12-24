import { describe, it, expect } from 'vitest';
import sub from './sub';

describe('sub', () => {
  it('subtracts two numbers', () => {
    expect(sub(5, 3)).toBe(2);
    expect(sub(1, 2)).toBe(-1);
  });
});
