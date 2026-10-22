import { describe, it, expect } from 'vitest';
import assocPath from './assocPath';

describe('assocPath', () => {
  it('updates a nested value', () => {
    const data = { a: { b: { c: 0 } } };
    const updated = assocPath(['a', 'b', 'c'], 42, data);

    expect(updated).toEqual({ a: { b: { c: 42 } } });
    expect(data).toEqual({ a: { b: { c: 0 } } });
  });

  it('overrides non-object values on the path', () => {
    const data = { a: 5 };
    const updated = assocPath(['a', 'b', 'c'], 42, data);

    expect(updated).toEqual({ a: { b: { c: 42 } } });
  });

  it('handles array indices and creates missing entries', () => {
    const data = { a: [] as Array<{ c: number }> };
    const updated = assocPath(['a', 1, 'c'], 42, data);

    expect(updated).toEqual({ a: [undefined, { c: 42 }] });
  });

  it('supports negative array indices', () => {
    const data = { a: [1, 2] };
    const updated = assocPath(['a', -1], 42, data);

    expect(updated).toEqual({ a: [1, 42] });
  });
});
