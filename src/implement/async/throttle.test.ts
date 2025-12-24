import { describe, it, expect, vi } from 'vitest';
import throttle from './throttle';

describe('throttle', () => {
  it('invokes immediately and then throttles', async () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const fn = throttle(spy, 100);

    fn();
    fn();
    expect(spy).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    await Promise.resolve();
    expect(spy).toHaveBeenCalledTimes(2); // trailing
    vi.useRealTimers();
  });

  it('drops intermediate calls and runs trailing once', async () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const fn = throttle(spy, 50);

    fn(1);
    fn(2);
    fn(3);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);

    vi.advanceTimersByTime(50);
    await Promise.resolve();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(3); // trailing call

    vi.useRealTimers();
  });
});
