import { describe, it, expect } from 'vitest';
import some from './some';

describe('some', () => {
  it('returns true if any element matches', () => {
    const isEven = (n: number) => n % 2 === 0;
    expect(some(isEven, [1, 3, 4])).toBe(true);
  });

  it('returns false if no element matches', () => {
    const gtTen = (n: number) => n > 10;
    expect(some(gtTen, [3, 5, 7])).toBe(false);
  });

  it('stops early on first match', () => {
    const spy: number[] = [];
    const track = (n: number) => {
      spy.push(n);
      return n === 3;
    };

    expect(some(track, [1, 2, 3, 4, 5])).toBe(true);
    expect(spy).toEqual([1, 2, 3]); // 이후 요소는 검사 안 함
  });
});
