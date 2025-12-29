import { describe, it, expect, vi } from 'vitest';
import debounce from './debounce';
import debounceLeading from './debounceLeading';
import debounceLeadingTrailing from './debounceLeadingTrailing';
import retry from './retry';
import throttle from './throttle';
import timeout from './timeout';

describe('async (curried)', () => {
  it('supports debounce currying', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn)(50);

    debounced('a');
    debounced('b');

    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('b');

    vi.useRealTimers();
  });

  it('supports debounceLeading currying', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounceLeading(fn)(50);

    debounced('a');
    debounced('b');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a');

    vi.advanceTimersByTime(50);
    debounced('c');
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith('c');

    vi.useRealTimers();
  });

  it('supports debounceLeadingTrailing currying', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounceLeadingTrailing(fn)(50);

    debounced('a');
    debounced('b');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a');

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith('b');

    vi.useRealTimers();
  });

  it('supports throttle currying', () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);

    const fn = vi.fn();
    const throttled = throttle(fn)(50);

    throttled('a');
    throttled('b');

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith('b');

    vi.useRealTimers();
  });

  it('supports retry and timeout currying', async () => {
    let attempts = 0;
    const task = () => {
      attempts += 1;
      return attempts > 1 ? Promise.resolve('ok') : Promise.reject(new Error('fail'));
    };

    const result = await retry(1)(task);
    expect(result).toBe('ok');

    const resolved = await timeout(10)(Promise.resolve('done'));
    expect(resolved).toBe('done');
  });
});
