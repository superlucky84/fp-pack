import { describe, it, expect, vi } from 'vitest';
import retry from './retry';

describe('retry', () => {
  it('retries until success', async () => {
    let count = 0;
    const fn = vi.fn(async () => {
      count += 1;
      if (count < 3) throw new Error('fail');
      return 'ok';
    });

    await expect(retry<string>(5, fn)).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('fails after max retries', async () => {
    const fn = vi.fn(async () => {
      throw new Error('always');
    });

    await expect(retry(2, fn)).rejects.toThrow('always');
    expect(fn).toHaveBeenCalledTimes(3); // initial + 2 retries
  });

  it('waits between retries when delayMs is provided', async () => {
    vi.useFakeTimers();
    const fn = vi
      .fn(async () => 'ok' as const)
      .mockRejectedValueOnce(new Error('fail1'))
      .mockRejectedValueOnce(new Error('fail2'));

    const promise = retry(2, fn, 50);

    // first call, then schedule delay before second attempt
    expect(fn).toHaveBeenCalledTimes(1);

    // finish first delay -> second attempt
    await vi.advanceTimersByTimeAsync(50);
    expect(fn).toHaveBeenCalledTimes(2);

    // finish second delay -> third attempt (success)
    await vi.advanceTimersByTimeAsync(50);
    await promise;
    expect(fn).toHaveBeenCalledTimes(3);

    vi.useRealTimers();
  });
});
