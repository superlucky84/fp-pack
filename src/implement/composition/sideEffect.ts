/**
 * SideEffect - side effect container (never auto-executed)
 */
export class SideEffect<T = unknown> {
  readonly effect: () => T;

  constructor(effect: () => T) {
    this.effect = effect;
  }
}

type MatchHandlers<T, RValue, REffect> = {
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

export function runPipeResult<T, R>(result: T | SideEffect<R>): T | R {
  if (result instanceof SideEffect) {
    return result.effect();
  }
  return result;
}

export default SideEffect;
