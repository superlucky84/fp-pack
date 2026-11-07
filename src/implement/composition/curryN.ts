type Callable = (...args: never[]) => unknown;

/** Counts supported by curryN's bounded tuple inference. */
export type CurryArity =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32;

type DropFirst<P extends unknown[]> = P extends unknown[]
  ? '0' extends keyof P
    ? P extends [unknown?, ...infer Rest]
      ? Rest
      : []
    : P
  : never;

// Tuple heads may be optional; a homogeneous rest array stays reusable.
type PrefixesOfOne<P extends unknown[]> = P extends []
  ? []
  : '0' extends keyof P
    ? [] | [P[0], ...PrefixesOfOne<DropFirst<P>>]
    : P;

// A union source must accept the supplied prefix in every possible branch.
type Prefixes<P extends unknown[]> = (P extends unknown[] ? (args: PrefixesOfOne<P>) => void : never) extends (
  args: infer Shared extends unknown[]
) => void
  ? Shared
  : never;

type Count<N extends CurryArity, C extends unknown[] = []> = C['length'] extends N ? C : Count<N, [...C, unknown]>;
type Counts<N extends CurryArity> = N extends CurryArity ? Count<N> : never;
type Take<P extends unknown[], C extends unknown[], Taken extends unknown[] = []> = C extends [unknown, ...infer Rest]
  ? Take<DropFirst<P>, Rest, [...Taken, P[0]]>
  : Taken;

type InvalidCount<N extends CurryArity, F extends Callable> = F extends Callable
  ? Take<Parameters<F>, Count<N>> extends Parameters<F>
    ? never
    : F
  : never;
type ValidCount<N extends CurryArity, F extends Callable> = N extends CurryArity
  ? [InvalidCount<N, F>] extends [never]
    ? N
    : never
  : never;
type InvalidReceiver<F> = F extends Callable ? (unknown extends ThisParameterType<F> ? never : F) : F;
type ValidFunction<F> = [InvalidReceiver<F>] extends [never] ? unknown : never;

/** A public stage name allows inferred exported partials to emit declarations. */
export interface CurriedArgs<P extends unknown[], N extends CurryArity, R> {
  <A extends Prefixes<P>>(...args: A): Apply<P, Counts<N>, R, A>;
}
type Apply<P extends unknown[], C extends unknown[], R, A extends unknown[]> = C extends []
  ? R
  : A extends [unknown, ...infer Rest]
    ? C extends [unknown, ...infer Remaining]
      ? Apply<DropFirst<P>, Remaining, R, Rest>
      : R
    : number extends A['length']
      ? unknown
      : CurriedArgs<P, C['length'] & CurryArity, R>;

/** Curried stages inferred from a function and an explicit execution threshold. */
export type CurriedN<F extends Callable, N extends CurryArity> = [N] extends [ValidCount<N, F>]
  ? [InvalidReceiver<F>] extends [never]
    ? CurriedArgs<Parameters<F>, N, ReturnType<F>>
    : never
  : never;

/**
 * curryN - collect arguments until the explicit count is reached.
 * Counts are integer literals from 0 to 32; defaults/optional/rest come from fn.
 * Extra valid arguments are forwarded, and zero waits for an explicit call.
 */
function curryN<const N extends CurryArity, F extends Callable>(
  arity: N & NoInfer<ValidCount<N, F> & ValidFunction<F>>,
  fn: F
): CurriedN<F, N>;
function curryN(arity: number, fn: Callable): (...args: unknown[]) => unknown {
  if (!Number.isInteger(arity) || arity < 0 || arity > 32) {
    throw new RangeError('curryN: arity must be an integer from 0 to 32');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('curryN: fn must be a function');
  }

  const collect =
    (previous: unknown[]): ((...args: unknown[]) => unknown) =>
    (...next: unknown[]) => {
      const supplied = [...previous, ...next];
      return supplied.length >= arity ? fn(...(supplied as never[])) : collect(supplied);
    };
  return collect([]);
}

export default curryN;
