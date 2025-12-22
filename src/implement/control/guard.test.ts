import { describe, it, expect } from 'vitest';
import guard from './guard';

describe('guard', () => {
  it('returns value when predicate passes', () => {
    const fn = guard((n: number) => n > 0, 0);
    expect(fn(5)).toBe(5);
  });

  it('returns default when predicate fails', () => {
    const fn = guard((n: number) => n > 0, 0);
    expect(fn(-3)).toBe(0);
  });

  it('works with objects', () => {
    const fn = guard<{ ok?: boolean }>((v) => v.ok === true, { ok: false });
    expect(fn({ ok: true })).toEqual({ ok: true });
    expect(fn({ ok: false })).toEqual({ ok: false });
  });
});
