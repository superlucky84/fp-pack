import pipeAsyncSideEffect from './pipeAsyncSideEffect';

/**
 * @deprecated `pipeAsyncSideEffect` now checks every step and tracks precise effect types since 0.15.0 — use `pipeAsyncSideEffect` instead.
 * Kept as an alias for backward compatibility; will be removed in 1.0.
 */
const pipeAsyncSideEffectStrict = ((...args: Array<any>) => (pipeAsyncSideEffect as (...a: Array<any>) => any)(...args)) as unknown as typeof pipeAsyncSideEffect & {
  readonly __pipe_async_side_effect_strict: true;
};
Object.defineProperty(pipeAsyncSideEffectStrict, '__pipe_async_side_effect_strict', { value: true });

export default pipeAsyncSideEffectStrict;
