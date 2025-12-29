import { describe, it, expect, vi } from 'vitest';
import debounce from './debounce';
import debounceLeading from './debounceLeading';
import debounceLeadingTrailing from './debounceLeadingTrailing';
import retry from './retry';
import throttle from './throttle';
import timeout from './timeout';

describe('async (curried)', () => {
  it('supports debounce direct and currying', () => {
    vi.useFakeTimers();
    const fnCurried = vi.fn();
    const fnDirect = vi.fn();
    const debounced = debounce(fnCurried)(50);
    const direct = debounce(fnDirect, 50);

    debounced('a');
    debounced('b');
    direct('c');
    direct('d');

    expect(fnCurried).not.toHaveBeenCalled();
    expect(fnDirect).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);
    expect(fnCurried).toHaveBeenCalledTimes(1);
    expect(fnCurried).toHaveBeenCalledWith('b');
    expect(fnDirect).toHaveBeenCalledTimes(1);
    expect(fnDirect).toHaveBeenCalledWith('d');

    vi.useRealTimers();
  });

  it('supports debounceLeading direct and currying', () => {
    vi.useFakeTimers();
    const fnCurried = vi.fn();
    const fnDirect = vi.fn();
    const debounced = debounceLeading(fnCurried)(50);
    const direct = debounceLeading(fnDirect, 50);

    debounced('a');
    debounced('b');
    direct('c');
    direct('d');

    expect(fnCurried).toHaveBeenCalledTimes(1);
    expect(fnCurried).toHaveBeenCalledWith('a');
    expect(fnDirect).toHaveBeenCalledTimes(1);
    expect(fnDirect).toHaveBeenCalledWith('c');

    vi.advanceTimersByTime(50);
    debounced('e');
    direct('f');
    expect(fnCurried).toHaveBeenCalledTimes(2);
    expect(fnCurried).toHaveBeenCalledWith('e');
    expect(fnDirect).toHaveBeenCalledTimes(2);
    expect(fnDirect).toHaveBeenCalledWith('f');

    vi.useRealTimers();
  });

  it('supports debounceLeadingTrailing direct and currying', () => {
    vi.useFakeTimers();
    const fnCurried = vi.fn();
    const fnDirect = vi.fn();
    const debounced = debounceLeadingTrailing(fnCurried)(50);
    const direct = debounceLeadingTrailing(fnDirect, 50);

    debounced('a');
    debounced('b');
    direct('c');
    direct('d');

    expect(fnCurried).toHaveBeenCalledTimes(1);
    expect(fnCurried).toHaveBeenCalledWith('a');
    expect(fnDirect).toHaveBeenCalledTimes(1);
    expect(fnDirect).toHaveBeenCalledWith('c');

    vi.advanceTimersByTime(50);
    expect(fnCurried).toHaveBeenCalledTimes(2);
    expect(fnCurried).toHaveBeenLastCalledWith('b');
    expect(fnDirect).toHaveBeenCalledTimes(2);
    expect(fnDirect).toHaveBeenLastCalledWith('d');

    vi.useRealTimers();
  });

  it('supports throttle direct and currying', () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);

    const fnCurried = vi.fn();
    const fnDirect = vi.fn();
    const throttled = throttle(fnCurried)(50);
    const direct = throttle(fnDirect, 50);

    throttled('a');
    throttled('b');
    direct('c');
    direct('d');

    expect(fnCurried).not.toHaveBeenCalled();
    expect(fnDirect).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fnCurried).toHaveBeenCalledTimes(1);
    expect(fnCurried).toHaveBeenCalledWith('b');
    expect(fnDirect).toHaveBeenCalledTimes(1);
    expect(fnDirect).toHaveBeenCalledWith('d');

    vi.useRealTimers();
  });

  it('supports retry and timeout direct and currying', async () => {
    let attempts = 0;
    const task = () => {
      attempts += 1;
      return attempts > 1 ? Promise.resolve('ok') : Promise.reject(new Error('fail'));
    };

    const directResult = await retry(1, task);
    expect(directResult).toBe('ok');

    attempts = 0;
    const curriedResult = await retry(1)(task);
    expect(curriedResult).toBe('ok');

    const directResolved = await timeout(10, Promise.resolve('done'));
    expect(directResolved).toBe('done');

    const curriedResolved = await timeout(10)(Promise.resolve('done'));
    expect(curriedResolved).toBe('done');
  });
});
