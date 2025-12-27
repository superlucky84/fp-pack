import { describe, it, expect } from 'vitest';
import result from './result';

describe('result', () => {
  it('wraps success', () => {
    const wrapped = result(() => 1 + 1);
    expect(wrapped).toEqual({ ok: true, value: 2 });
  });

  it('wraps failures', () => {
    const wrapped = result(() => {
      throw new Error('fail');
    });

    expect(wrapped.ok).toBe(false);
  });
});
