import { describe, it, expect } from 'vitest';
import fold from './fold';

describe('fold', () => {
  it('returns onNone for nullish values', () => {
    expect(
      fold(
        () => 'none',
        (value: number) => `value:${value}`,
        null
      )
    ).toBe('none');
    expect(
      fold(
        () => 'none',
        (value: number) => `value:${value}`,
        undefined
      )
    ).toBe('none');
  });

  it('returns onSome for non-null values', () => {
    expect(
      fold(
        () => 'none',
        (value: number) => `value:${value}`,
        3
      )
    ).toBe('value:3');
  });
});
