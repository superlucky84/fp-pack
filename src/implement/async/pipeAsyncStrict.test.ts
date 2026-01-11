import { describe, it, expect } from 'vitest';
import pipeAsyncStrict from './pipeAsyncStrict';

describe('pipeAsyncStrict', () => {
  it('composes async functions left-to-right', async () => {
    const fn = pipeAsyncStrict(
      async (n: number) => n + 1,
      async (n) => n * 2
    );

    await expect(fn(2)).resolves.toBe(6);
  });

  it('supports data-first invocation', async () => {
    await expect(
      pipeAsyncStrict(
        2,
        async (n: number) => n + 1,
        (n) => n * 2
      )
    ).resolves.toBe(6);
  });

  it('allows sync functions in the chain', async () => {
    const fn = pipeAsyncStrict(
      (n: number) => n + 1,
      async (n) => n * 3
    );

    await expect(fn(1)).resolves.toBe(6);
  });
});
