import { describe, it, expect, vi } from 'vitest';
import SideEffect, { matchSideEffect, runPipeResult } from './sideEffect';

describe('SideEffect', () => {
  it('does not execute effect automatically', () => {
    const effect = vi.fn(() => 'done');
    const sideEffect = new SideEffect(effect);

    expect(effect).not.toHaveBeenCalled();
    expect(sideEffect).toBeInstanceOf(SideEffect);
  });

  it('matchSideEffect routes values', () => {
    const effect = new SideEffect(() => 'run');
    const valueResult = matchSideEffect(3, {
      value: (v) => v + 1,
      effect: () => 0,
    });
    const effectResult = matchSideEffect(effect, {
      value: () => 0,
      effect: (s) => s,
    });

    expect(valueResult).toBe(4);
    expect(effectResult).toBe(effect);
  });

  it('runPipeResult executes SideEffect explicitly', () => {
    const effect = vi.fn(() => 'ran');
    const sideEffect = new SideEffect(effect);

    expect(runPipeResult(sideEffect)).toBe('ran');
    expect(runPipeResult(5)).toBe(5);
    expect(effect).toHaveBeenCalledTimes(1);
  });
});
