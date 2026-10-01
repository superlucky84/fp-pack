import pipeAsync from './pipeAsync';

/**
 * @deprecated `pipeAsync` is strict by default since 0.15.0 — use `pipeAsync` instead.
 * Kept as an alias for backward compatibility; will be removed in 1.0.
 */
const pipeAsyncStrict = ((...args: Array<any>) => (pipeAsync as (...a: Array<any>) => any)(...args)) as unknown as typeof pipeAsync & {
  readonly __pipe_async_strict: true;
};
Object.defineProperty(pipeAsyncStrict, '__pipe_async_strict', { value: true });

export default pipeAsyncStrict;
