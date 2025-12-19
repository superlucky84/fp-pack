import { describe, it, expect } from 'vitest';
import tap from './tap';

describe('tap', () => {
  it('passes through the value unchanged', () => {
    const result = tap(() => {})(42);
    expect(result).toBe(42);
  });

  it('runs the side effect with the value', () => {
    const spy = vi.fn();
    const result = tap(spy)('hello');

    expect(spy).toHaveBeenCalledWith('hello');
    expect(result).toBe('hello');
  });
});
