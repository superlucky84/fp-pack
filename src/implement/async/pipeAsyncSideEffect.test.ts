import { describe, it, expect } from 'vitest';
import pipeAsyncSideEffect from './pipeAsyncSideEffect';
import SideEffect from '../composition/sideEffect';

describe('pipeAsyncSideEffect', () => {
  it('short-circuits when SideEffect is returned', async () => {
    const effect = new SideEffect(() => 'effect');
    const stop = async (_value: number) => effect;
    const after = async (_value: number) => _value + 1;

    const fn = pipeAsyncSideEffect(async (n: number) => n + 1, stop, after);
    const result = await fn(1);

    expect(result).toBe(effect);
  });

  it('returns SideEffect inputs without executing the pipeline', async () => {
    const effect = new SideEffect(() => 'effect');
    const fn = pipeAsyncSideEffect(async (n: number) => n + 1);

    await expect(fn(effect)).resolves.toBe(effect);
  });
});
