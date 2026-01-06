import type { FromFn } from './from';

type PipeError<From, To> = { __pipe_error: ['pipe', From, '->', To] };
type NoInfer<T> = [T][T extends any ? 0 : never];
type UnaryFn<A, R> = (a: A) => R;
type ZeroFn<R> = () => R;
type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnOutput<F> = F extends (...args: any[]) => infer R ? R : never;
type ValidateFn<Fn extends UnaryFn<any, any>, Expected> =
  NoInfer<Expected> extends FnInput<Fn> ? Fn : Fn & PipeError<Expected, FnInput<Fn>>;

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

function pipe<R>(ab: ZeroFn<R>): () => R;
function pipe<B, F2 extends UnaryFn<B, any>>(ab: ZeroFn<B>, bc: ValidateFn<F2, B>): () => FnOutput<F2>;
function pipe<B, F2 extends UnaryFn<B, any>, F3 extends UnaryFn<FnOutput<F2>, any>>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnOutput<F2>>
): () => FnOutput<F3>;
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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

function pipe<F1 extends FromFn<any>>(ab: F1): (input?: unknown) => FnOutput<F1>;
function pipe<F1 extends FromFn<any>, F2 extends UnaryFn<FnOutput<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>
): (input?: unknown) => FnOutput<F2>;
function pipe<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>
): (input?: unknown) => FnOutput<F3>;
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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

function pipe<F1 extends UnaryFn<any, any>>(ab: F1): (a: FnInput<F1>) => FnOutput<F1>;
function pipe<F1 extends UnaryFn<any, any>, F2 extends UnaryFn<FnOutput<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>
): (a: FnInput<F1>) => FnOutput<F2>;
function pipe<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnOutput<F1>, any>,
  F3 extends UnaryFn<FnOutput<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>,
  cd: ValidateFn<F3, FnOutput<F2>>
): (a: FnInput<F1>) => FnOutput<F3>;
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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
function pipe<
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

function pipe<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(...funcs: Fns): Pipe<Fns>;
function pipe(...funcs: Array<UnaryFn<any, any>>): (input: any) => any;
function pipe(...funcs: Array<(input: any) => any>) {
  return (init: any) => {
    return funcs.reduce((acc, fn) => fn(acc), init);
  };
}

export default pipe;
