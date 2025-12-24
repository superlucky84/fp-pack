import { describe, it, expect } from 'vitest';
import timeout from './timeout';

describe('timeout', () => {
  it('resolves when promise finishes before timeout', async () => {
    const result = await timeout<string>(50, Promise.resolve('ok'));
    expect(result).toBe('ok');
  });

  it('rejects when promise exceeds timeout', async () => {
    await expect(
      timeout(
        10,
        new Promise((resolve) => {
          setTimeout(() => resolve('late'), 30);
        })
      )
    ).rejects.toThrow('Timed out after 10ms');
  });
});
