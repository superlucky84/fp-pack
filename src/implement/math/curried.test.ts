import { describe, it, expect } from 'vitest';
import add from './add';
import sub from './sub';
import mul from './mul';
import div from './div';
import randomInt from './randomInt';

describe('math (curried)', () => {
  it('supports direct and data-last currying', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(1)(2)).toBe(3);

    expect(sub(5, 2)).toBe(3);
    expect(sub(5)(2)).toBe(3);

    expect(mul(2, 3)).toBe(6);
    expect(mul(2)(3)).toBe(6);

    expect(div(6, 2)).toBe(3);
    expect(div(6)(2)).toBe(3);

    const directValue = randomInt(1, 3);
    expect(directValue).toBeGreaterThanOrEqual(1);
    expect(directValue).toBeLessThanOrEqual(3);

    const curriedValue = randomInt(1)(3);
    expect(curriedValue).toBeGreaterThanOrEqual(1);
    expect(curriedValue).toBeLessThanOrEqual(3);
  });
});
