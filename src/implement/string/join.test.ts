import { describe, it, expect } from 'vitest';
import join from './join';

describe('join', () => {
  it('joins array with separator', () => {
    expect(join(',', ['a', 'b', 'c'])).toBe('a,b,c');
  });

  it('handles empty arrays', () => {
    expect(join(',', [])).toBe('');
  });

  it('works with single element', () => {
    expect(join('-', ['solo'])).toBe('solo');
  });
});
