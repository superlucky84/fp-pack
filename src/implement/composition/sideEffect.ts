/**
 * SideEffect - side effect container (never auto-executed)
 */
export class SideEffect<T = unknown> {
  readonly effect: () => T;
  readonly label?: string;

  constructor(effect: () => T, label?: string) {
    this.effect = effect;
    this.label = label;
  }

  static of<T>(effect: () => T, label?: string): SideEffect<T> {
    return new SideEffect(effect, label);
  }
}

export type MatchHandlers<T, RValue, REffect> = {
  value: (value: T) => RValue;
  effect: (sideEffect: SideEffect) => REffect;
};

export function matchSideEffect<T, RValue, REffect = any>(
  result: T | SideEffect,
  handlers: MatchHandlers<T, RValue, REffect>
): RValue | REffect {
  if (result instanceof SideEffect) {
    return handlers.effect(result);
  }
  return handlers.value(result as T);
}

export function runPipeResult<T, R>(result: SideEffect<R>): R;
export function runPipeResult<T>(result: T): T extends SideEffect<infer R> ? R : T;
export function runPipeResult<T, R=any>(result: T | SideEffect<R>): T | R;
export function runPipeResult<T, R=any>(result: T | SideEffect<R>): T | R {
  if (isSideEffect(result)) {
    return result.effect() as R;
  }
  return result as T;
}

export function isSideEffect(value: unknown): value is SideEffect<any> {
  return value instanceof SideEffect;
}

export default SideEffect;
