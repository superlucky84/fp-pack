import pipeSideEffect from './pipeSideEffect';

/**
 * @deprecated `pipeSideEffect` now checks every step and tracks precise effect types since 0.15.0 — use `pipeSideEffect` instead.
 * Kept as an alias for backward compatibility; will be removed in 1.0.
 */
const pipeSideEffectStrict = ((...args: Array<any>) => (pipeSideEffect as (...a: Array<any>) => any)(...args)) as unknown as typeof pipeSideEffect & {
  readonly __pipe_side_effect_strict: true;
};
Object.defineProperty(pipeSideEffectStrict, '__pipe_side_effect_strict', { value: true });

export default pipeSideEffectStrict;
