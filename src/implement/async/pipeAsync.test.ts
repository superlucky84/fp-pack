import { describe, it, expect } from 'vitest';
import pipeAsync from './pipeAsync';
import SideEffect from '../composition/sideEffect';

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

  it('short-circuits when SideEffect is returned', async () => {
    const effect = new SideEffect(() => 'effect');
    const stop = async (value: number) => effect;
    const after = async (value: number) => value + 1;

    const fn = pipeAsync(async (n: number) => n + 1, stop, after);
    const result = await fn(1);

    expect(result).toBe(effect);
  });
});
