import { describe, it, expect, vi } from 'vitest';
import delay from './delay';

describe('delay', () => {
  it('resolves after given milliseconds', async () => {
    vi.useFakeTimers();
    const spy = vi.fn();

    const promise = delay(100).then(spy);

    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(99);
    await Promise.resolve();
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    await promise;
    expect(spy).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
