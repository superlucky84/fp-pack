import { describe, it, expect } from 'vitest';
import fold from './fold';

describe('maybe (curried)', () => {
  it('supports data-last currying', () => {
    const toLabel = fold(() => 'none')((value: number) => `value:${value}`);

    expect(toLabel(null)).toBe('none');
    expect(toLabel(3)).toBe('value:3');
  });
});
