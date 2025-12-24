import { describe, it, expect } from 'vitest';
import div from './div';

describe('div', () => {
  it('divides two numbers', () => {
    expect(div(6, 3)).toBe(2);
    expect(div(1, 2)).toBe(0.5);
  });
});
