import pipe from './pipe';

/**
 * @deprecated `pipe` is strict by default since 0.15.0 — use `pipe` instead.
 * Kept as an alias for backward compatibility; will be removed in 1.0.
 */
const pipeStrict = ((...args: Array<any>) => (pipe as (...a: Array<any>) => any)(...args)) as unknown as typeof pipe & {
  readonly __pipe_strict: true;
};
Object.defineProperty(pipeStrict, '__pipe_strict', { value: true });

export default pipeStrict;
