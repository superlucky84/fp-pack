import { describe, it, expect } from 'vitest';
import fold from './fold';

describe('fold', () => {
  it('returns onNone for nullish values', () => {
    const toFallback = fold(
      () => 'none',
      (value: number) => `value:${value}`
    );

    expect(toFallback(null)).toBe('none');
    expect(toFallback(undefined)).toBe('none');
  });

  it('returns onSome for non-null values', () => {
    const toResult = fold(
      () => 'none',
      (value: number) => `value:${value}`
    );

    expect(toResult(3)).toBe('value:3');
  });
});
