import { describe, it, expect } from 'vitest';
import isType from './isType';

describe('isType', () => {
  it('checks primitives', () => {
    expect(isType('string')('hello')).toBe(true);
    expect(isType('number')(123)).toBe(true);
    expect(isType('boolean')(false)).toBe(true);
    expect(isType('symbol')(Symbol('x'))).toBe(true);
    expect(isType('bigint')(BigInt(1))).toBe(true);
  });

  it('checks null and undefined explicitly', () => {
    expect(isType('null')(null)).toBe(true);
    expect(isType('undefined')(undefined)).toBe(true);
  });

  it('checks objects by toString tag', () => {
    expect(isType('array')([])).toBe(true);
    expect(isType('date')(new Date())).toBe(true);
    expect(isType('map')(new Map())).toBe(true);
    expect(isType('set')(new Set())).toBe(true);
  });

  it('is case-insensitive on target type', () => {
    expect(isType('ArRaY')([])).toBe(true);
  });
});
