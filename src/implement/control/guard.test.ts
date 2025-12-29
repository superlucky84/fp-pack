import { describe, it, expect } from 'vitest';
import guard from './guard';

describe('guard', () => {
  it('returns value when predicate passes', () => {
    expect(guard((n: number) => n > 0, 0, 5)).toBe(5);
  });

  it('returns default when predicate fails', () => {
    expect(guard((n: number) => n > 0, 0, -3)).toBe(0);
  });

  it('works with objects', () => {
    expect(guard((v: { ok?: boolean }) => v.ok === true, { ok: false }, { ok: true })).toEqual({ ok: true });
    expect(guard((v: { ok?: boolean }) => v.ok === true, { ok: false }, { ok: false })).toEqual({ ok: false });
  });
});
