import { describe, it, expect, vi } from 'vitest';
import debounceLeadingTrailing from './debounceLeadingTrailing';

describe('debounceLeadingTrailing', () => {
  it('runs on the first call and the last call in the window', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounceLeadingTrailing(fn, 100);

    debounced('a');
    debounced('b');
    debounced('c');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a');

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith('c');

    vi.useRealTimers();
  });

  it('does not run trailing if there is only one call', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounceLeadingTrailing(fn, 100);

    debounced('x');
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('x');

    vi.useRealTimers();
  });
});
