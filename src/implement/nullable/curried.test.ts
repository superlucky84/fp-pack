import { describe, it, expect } from 'vitest';
import fold from './fold';

describe('maybe (curried)', () => {
  it('supports direct and data-last currying', () => {
    expect(fold(() => 'none', (value: number) => `value:${value}`, null)).toBe('none');
    expect(fold(() => 'none', (value: number) => `value:${value}`, 3)).toBe('value:3');

    const toLabel = fold(() => 'none')((value: number) => `value:${value}`);
    expect(toLabel(null)).toBe('none');
    expect(toLabel(3)).toBe('value:3');
  });
});
