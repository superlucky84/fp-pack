import { describe, it, expect } from 'vitest';
import match from './match';

describe('match', () => {
  it('returns matches for regex', () => {
    const result = match(/ba./g, 'banana');
    expect(result).toEqual(['ban']);
  });

  it('returns null when no match', () => {
    expect(match(/xyz/, 'banana')).toBeNull();
  });
});
