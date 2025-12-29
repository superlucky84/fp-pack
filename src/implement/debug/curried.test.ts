import { describe, it, expect } from 'vitest';
import assert from './assert';
import invariant from './invariant';

describe('debug (curried)', () => {
  it('supports data-last currying', () => {
    expect(() => assert(true)('ok')).not.toThrow();
    expect(() => assert(false)('fail')).toThrow('fail');
    expect(() => invariant(true)('ok')).not.toThrow();
    expect(() => invariant(false)('bad')).toThrow('bad');
  });
});
