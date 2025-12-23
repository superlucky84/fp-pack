import { describe, it, expect } from 'vitest';
import lt from './lt';

describe('lt', () => {
  it('returns true when less', () => {
    expect(lt(3)(2)).toBe(true);
  });

  it('returns false when equal or greater', () => {
    expect(lt(3)(3)).toBe(false);
    expect(lt(3)(4)).toBe(false);
  });
});
