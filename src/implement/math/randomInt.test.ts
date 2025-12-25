import { describe, it, expect, vi } from 'vitest';
import randomInt from './randomInt';

describe('randomInt', () => {
  it('returns lower bound when random is 0', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(randomInt(1, 3)).toBe(1);
    expect(randomInt(1.2, 3.8)).toBe(2);

    spy.mockRestore();
  });

  it('returns upper bound when random is near 1', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0.999999);

    expect(randomInt(1, 3)).toBe(3);
    expect(randomInt(1.2, 3.8)).toBe(3);

    spy.mockRestore();
  });
});
