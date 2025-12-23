import { describe, it, expect, vi } from 'vitest';
import debounceLeading from './debounceLeading';

describe('debounceLeading', () => {
  it('runs only on the first call within the window', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounceLeading(fn, 100);

    debounced('a');
    debounced('b');
    debounced('c');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a');

    vi.advanceTimersByTime(100);
    debounced('d');
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith('d');

    vi.useRealTimers();
  });
});
