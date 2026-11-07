import { describe, expect, it } from 'vitest';
import { presets, runScenario, sameValue } from './scenarios';
import { createRunGate } from './session';

describe('playground real-library scenarios', () => {
  for (const preset of presets) {
    it(preset.id, async () => {
      const state = structuredClone(preset.state);
      const before = structuredClone(state);
      expect((await runScenario(state)).value).toEqual(preset.expected);
      expect(state).toEqual(before);
      expect((await runScenario(state)).value).toEqual(preset.expected);
    });
  }
  it('waits for an asynchronous source and keeps a later run authoritative', async () => {
    const gate = createRunGate();
    const preset = presets.find(item => item.id === 'async')!;
    const old = gate.next();
    const pending = runScenario(preset.state, 1);
    const active = gate.next();
    expect((await pending).value).toEqual(preset.expected);
    expect(gate.current(old)).toBe(false);
    expect(gate.current(active)).toBe(true);
    gate.invalidate();
    expect(gate.current(active)).toBe(false);
  });
  it('the visible regression verdict can fail', () => {
    expect(sameValue({ value: 1 }, { value: 2 })).toBe(false);
    expect(sameValue([1, 2], [1, 2])).toBe(true);
  });
});
