import { describe, it, expect } from 'vitest';
import clamp from './clamp';

describe('clamp', () => {
  it('returns value within bounds', () => {
    expect(clamp(0, 10, 5)).toBe(5);
  });

  it('clips below min', () => {
    expect(clamp(0, 10, -3)).toBe(0);
  });

  it('clips above max', () => {
    expect(clamp(0, 10, 15)).toBe(10);
  });
});
