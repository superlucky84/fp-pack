import { describe, it, expect } from 'vitest';
import mapValues from './mapValues';

describe('mapValues', () => {
  it('maps values', () => {
    const user = { id: 1, name: 'A' };
    const lengths = mapValues((value) => String(value).length)(user);

    expect(lengths).toEqual({ id: 1, name: 1 });
  });
});
