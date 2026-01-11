import type { FromFn } from './from';

type PipeError<From, To> = { __pipe_strict_error: ['pipeStrict', From, '->', To] };
type NoInfer<T> = [T][T extends any ? 0 : never];
type UnaryFn<A, R> = (a: A) => R;
type ZeroFn<R> = () => R;
type AnyFn = (...args: any[]) => any;
type NonFunction<T> = T extends AnyFn ? never : T;
type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnOutput<F> = F extends (...args: any[]) => infer R ? R : never;
type ValidateFn<Fn extends UnaryFn<any, any>, Expected> =
  ([Expected] extends [FnInput<Fn>] ? Fn : Fn & PipeError<Expected, FnInput<Fn>>) &
    ((a: NoInfer<Expected>) => any);
type PipeCheckResult<Fns extends [AnyFn, ...AnyFn[]]> =
  Fns extends [infer F, infer G, ...infer Rest]
    ? F extends AnyFn
      ? G extends AnyFn
        ? [FnOutput<F>] extends [FnInput<G>]
          ? Rest extends AnyFn[]
            ? PipeCheckResult<[G, ...Rest]>
            : true
          : PipeError<FnOutput<F>, FnInput<G>>
        : PipeError<FnOutput<F>, FnInput<G>>
      : PipeError<unknown, unknown>
    : true;
type PipeCheck<Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<Fns> extends true ? unknown : PipeCheckResult<Fns>);

type PipeInput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<infer A, any>, ...UnaryFn<any, any>[]]
  ? A
  : never;
type PipeOutput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<any, infer R>]
  ? R
  : Fns extends [UnaryFn<any, infer R>, ...infer Rest]
    ? Rest extends [UnaryFn<R, any>, ...UnaryFn<any, any>[]]
      ? PipeOutput<Rest>
      : never
    : never;
type Pipe<Fns extends UnaryFn<any, any>[]> = (input: PipeInput<Fns>) => PipeOutput<Fns>;

type PipeFns11 = [
  UnaryFn<any, any>,
  UnaryFn<any, any>,
  UnaryFn<any, any>,
  UnaryFn<any, any>,
  UnaryFn<any, any>,
  UnaryFn<any, any>,
  UnaryFn<any, any>,
  UnaryFn<any, any>,
  UnaryFn<any, any>,
  UnaryFn<any, any>,
  UnaryFn<any, any>,
  ...UnaryFn<any, any>[]
];

type PipeCheckWithInput<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns extends [infer F, ...infer Rest]
    ? F extends UnaryFn<any, any>
      ? Rest extends AnyFn[]
        ? PipeCheck<[ValidateFn<F, Input>, ...Rest]>
        : PipeCheck<[ValidateFn<F, Input>]>
      : PipeError<Input, unknown>
    : PipeError<unknown, unknown>;

function pipeStrict<A>(input: NonFunction<A>): A;
function pipeStrict<A, B>(
  input: NonFunction<A>,
  ab: (value: A) => B
): B;
function pipeStrict<A, B, C>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NoInfer<B>) => C
): C;
function pipeStrict<A, B, C, D>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NoInfer<B>) => C,
  cd: (value: NoInfer<C>) => D
): D;
function pipeStrict<A, B, C, D, E>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NoInfer<B>) => C,
  cd: (value: NoInfer<C>) => D,
  de: (value: NoInfer<D>) => E
): E;
function pipeStrict<A, B, C, D, E, F>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NoInfer<B>) => C,
  cd: (value: NoInfer<C>) => D,
  de: (value: NoInfer<D>) => E,
  ef: (value: NoInfer<E>) => F
): F;
function pipeStrict<A, B, C, D, E, F, G>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NoInfer<B>) => C,
  cd: (value: NoInfer<C>) => D,
  de: (value: NoInfer<D>) => E,
  ef: (value: NoInfer<E>) => F,
  fg: (value: NoInfer<F>) => G
): G;
function pipeStrict<A, B, C, D, E, F, G, H>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NoInfer<B>) => C,
  cd: (value: NoInfer<C>) => D,
  de: (value: NoInfer<D>) => E,
  ef: (value: NoInfer<E>) => F,
  fg: (value: NoInfer<F>) => G,
  gh: (value: NoInfer<G>) => H
): H;
function pipeStrict<A, B, C, D, E, F, G, H, I>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NoInfer<B>) => C,
  cd: (value: NoInfer<C>) => D,
  de: (value: NoInfer<D>) => E,
  ef: (value: NoInfer<E>) => F,
  fg: (value: NoInfer<F>) => G,
  gh: (value: NoInfer<G>) => H,
  hi: (value: NoInfer<H>) => I
): I;
function pipeStrict<A, B, C, D, E, F, G, H, I, J>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NoInfer<B>) => C,
  cd: (value: NoInfer<C>) => D,
  de: (value: NoInfer<D>) => E,
  ef: (value: NoInfer<E>) => F,
  fg: (value: NoInfer<F>) => G,
  gh: (value: NoInfer<G>) => H,
  hi: (value: NoInfer<H>) => I,
  ij: (value: NoInfer<I>) => J
): J;
function pipeStrict<A, B, C, D, E, F, G, H, I, J, K>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NoInfer<B>) => C,
  cd: (value: NoInfer<C>) => D,
  de: (value: NoInfer<D>) => E,
  ef: (value: NoInfer<E>) => F,
  fg: (value: NoInfer<F>) => G,
  gh: (value: NoInfer<G>) => H,
  hi: (value: NoInfer<H>) => I,
  ij: (value: NoInfer<I>) => J,
  jk: (value: NoInfer<J>) => K
): K;
function pipeStrict<A, Fns extends PipeFns11>(
  input: NonFunction<A>,
  ...funcs: PipeCheckWithInput<A, Fns>
): PipeOutput<Fns>;

function pipeStrict<R>(ab: ZeroFn<R>): () => R;
function pipeStrict<B, F2 extends UnaryFn<B, any>>(ab: ZeroFn<B>, bc: ValidateFn<F2, B>): () => FnOutput<F2>;
function pipeStrict<B, F2 extends UnaryFn<B, any>, F3 extends UnaryFn<FnOutput<F2>, any>>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnOutput<F2>>
): () => FnOutput<F3>;
function pipeStrict<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>
): () => FnOutput<F4>;
function pipeStrict<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>
): () => FnOutput<F5>;
function pipeStrict<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>
): () => FnOutput<F6>;
function pipeStrict<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>
): () => FnOutput<F7>;
function pipeStrict<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>,
  F8 extends UnaryFn<FnOutput<F7>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>,
  hi: ValidateFn<F8, FnOutput<F7>>
): () => FnOutput<F8>;
function pipeStrict<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>,
  F8 extends UnaryFn<FnOutput<F7>, any>,
  F9 extends UnaryFn<FnOutput<F8>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>,
  hi: ValidateFn<F8, FnOutput<F7>>,
  ij: ValidateFn<F9, FnOutput<F8>>
): () => FnOutput<F9>;
function pipeStrict<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>,
  F8 extends UnaryFn<FnOutput<F7>, any>,
  F9 extends UnaryFn<FnOutput<F8>, any>,
  F10 extends UnaryFn<FnOutput<F9>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>,
  hi: ValidateFn<F8, FnOutput<F7>>,
  ij: ValidateFn<F9, FnOutput<F8>>,
  jk: ValidateFn<F10, FnOutput<F9>>
): () => FnOutput<F10>;

function pipeStrict<F1 extends FromFn<any>>(ab: F1): (input?: unknown) => FnOutput<F1>;
function pipeStrict<F1 extends FromFn<any>, F2 extends UnaryFn<FnOutput<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>
): (input?: unknown) => FnOutput<F2>;
function pipeStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>
): (input?: unknown) => FnOutput<F3>;
function pipeStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>
): (input?: unknown) => FnOutput<F4>;
function pipeStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>
): (input?: unknown) => FnOutput<F5>;
function pipeStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>
): (input?: unknown) => FnOutput<F6>;
function pipeStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>
): (input?: unknown) => FnOutput<F7>;
function pipeStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>,
  F8 extends UnaryFn<FnOutput<F7>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>,
  hi: ValidateFn<F8, FnOutput<F7>>
): (input?: unknown) => FnOutput<F8>;
function pipeStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>,
  F8 extends UnaryFn<FnOutput<F7>, any>,
  F9 extends UnaryFn<FnOutput<F8>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>,
  hi: ValidateFn<F8, FnOutput<F7>>,
  ij: ValidateFn<F9, FnOutput<F8>>
): (input?: unknown) => FnOutput<F9>;
function pipeStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>,
  F8 extends UnaryFn<FnOutput<F7>, any>,
  F9 extends UnaryFn<FnOutput<F8>, any>,
  F10 extends UnaryFn<FnOutput<F9>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>,
  hi: ValidateFn<F8, FnOutput<F7>>,
  ij: ValidateFn<F9, FnOutput<F8>>,
  jk: ValidateFn<F10, FnOutput<F9>>
): (input?: unknown) => FnOutput<F10>;

function pipeStrict<F1 extends UnaryFn<any, any>>(ab: F1): (a: FnInput<F1>) => FnOutput<F1>;
function pipeStrict<F1 extends UnaryFn<any, any>, F2 extends UnaryFn<FnOutput<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>
): (a: FnInput<F1>) => FnOutput<F2>;
function pipeStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>
): (a: FnInput<F1>) => FnOutput<F3>;
function pipeStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>
): (a: FnInput<F1>) => FnOutput<F4>;
function pipeStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>
): (a: FnInput<F1>) => FnOutput<F5>;
function pipeStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>
): (a: FnInput<F1>) => FnOutput<F6>;
function pipeStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>
): (a: FnInput<F1>) => FnOutput<F7>;
function pipeStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>,
  F8 extends UnaryFn<FnOutput<F7>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>,
  hi: ValidateFn<F8, FnOutput<F7>>
): (a: FnInput<F1>) => FnOutput<F8>;
function pipeStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>,
  F8 extends UnaryFn<FnOutput<F7>, any>,
  F9 extends UnaryFn<FnOutput<F8>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>,
  hi: ValidateFn<F8, FnOutput<F7>>,
  ij: ValidateFn<F9, FnOutput<F8>>
): (a: FnInput<F1>) => FnOutput<F9>;
function pipeStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>,
  F4 extends UnaryFn<FnOutput<F3>, any>,
  F5 extends UnaryFn<FnOutput<F4>, any>,
  F6 extends UnaryFn<FnOutput<F5>, any>,
  F7 extends UnaryFn<FnOutput<F6>, any>,
  F8 extends UnaryFn<FnOutput<F7>, any>,
  F9 extends UnaryFn<FnOutput<F8>, any>,
  F10 extends UnaryFn<FnOutput<F9>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>,
  de: ValidateFn<F4, FnOutput<F3>>,
  ef: ValidateFn<F5, FnOutput<F4>>,
  fg: ValidateFn<F6, FnOutput<F5>>,
  gh: ValidateFn<F7, FnOutput<F6>>,
  hi: ValidateFn<F8, FnOutput<F7>>,
  ij: ValidateFn<F9, FnOutput<F8>>,
  jk: ValidateFn<F10, FnOutput<F9>>
): (a: FnInput<F1>) => FnOutput<F10>;

function pipeStrict<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): (input?: unknown) => PipeOutput<Fns>;
function pipeStrict<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(...funcs: PipeCheck<Fns>): Pipe<Fns>;
function pipeStrict(...funcs: Array<UnaryFn<any, any>>): (input: any) => any;
function pipeStrict(...args: Array<any>) {
  if (args.length === 0) {
    return undefined;
  }
  const [input, ...rest] = args as [any, ...Array<(input: any) => any>];
  if (typeof input === 'function') {
    const funcs = [input, ...rest];
    return (init: any) => funcs.reduce((acc, fn) => fn(acc), init);
  }
  return rest.reduce((acc, fn) => fn(acc), input);
}

export default pipeStrict;
