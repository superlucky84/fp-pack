import { describe, it, expect } from 'vitest';
import of from './of';

const Box = {
  of<T>(value: T) {
    return { value };
  },
};

describe('of', () => {
  it('delegates to the type of implementation', () => {
    const result = of(Box)(123);
    expect((result as { value: number }).value).toBe(123);
  });

  it('uses the typeRep function when no of is provided', () => {
    const Factory = <T>(value: T) => ({ value });
    const result = of(Factory)('fp');
    expect((result as { value: string }).value).toBe('fp');
  });
});
