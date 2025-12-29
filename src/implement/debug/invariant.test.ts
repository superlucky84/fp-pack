import { describe, it, expect } from 'vitest';
import invariant from './invariant';

describe('invariant', () => {
  it('does nothing when condition is true', () => {
    expect(() => invariant(true)(undefined)).not.toThrow();
  });

  it('throws when condition is false', () => {
    expect(() => invariant(false)(undefined)).toThrow('Invariant failed');
  });

  it('uses a custom message when provided', () => {
    expect(() => invariant(false)('broken')).toThrow('broken');
  });
});
