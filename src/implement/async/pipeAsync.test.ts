import { describe, it, expect } from 'vitest';
import pipeAsync from './pipeAsync';

describe('pipeAsync', () => {
  it('composes async functions left-to-right', async () => {
    const fn = pipeAsync(
      async (n: number) => n + 1,
      async (n) => n * 2
    );

    await expect(fn(2)).resolves.toBe(6);
  });

  it('allows sync functions in the chain', async () => {
    const fn = pipeAsync(
      (n: number) => n + 1,
      async (n) => n * 3
    );

    await expect(fn(1)).resolves.toBe(6);
  });

});
