import type { FromFn } from '../composition/from';

/** pipeAsync - 비동기 함수 합성 */
type PipeError<From, To> = { __pipe_async_error: ['pipeAsync', From, '->', To] };
type NoInfer<T> = [T][T extends any ? 0 : never];

type AsyncOrSync<A, R> = (a: A) => R | Promise<R>;
type ZeroFn<R> = () => R | Promise<R>;
type AnyFn = (...args: any[]) => any;
type NonFunction<T> = T extends AnyFn ? never : T;

type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnReturn<F> = F extends (...args: any[]) => infer R ? R : never;
type FnValue<F> = Awaited<FnReturn<F>>;

type ValidateFn<Fn extends AsyncOrSync<any, any>, Expected> =
  (Fn extends (a: NoInfer<Expected>) => any ? Fn : Fn & PipeError<Expected, FnInput<Fn>>) &
    ((a: NoInfer<Expected>) => any);
type PipeCheckResult<Fns extends [AnyFn, ...AnyFn[]]> =
  Fns extends [infer F, infer G, ...infer Rest]
    ? F extends AnyFn
      ? G extends AnyFn
        ? [FnValue<F>] extends [FnInput<G>]
          ? Rest extends AnyFn[]
            ? PipeCheckResult<[G, ...Rest]>
            : true
          : PipeError<FnValue<F>, FnInput<G>>
        : PipeError<FnValue<F>, FnInput<G>>
      : PipeError<unknown, unknown>
    : true;
type PipeCheck<Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<Fns> extends true ? unknown : PipeCheckResult<Fns>);

type PipeInput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [AsyncOrSync<infer A, any>, ...AsyncOrSync<any, any>[]]
  ? A
  : never;
type PipeOutput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [infer F]
  ? F extends AsyncOrSync<any, any>
    ? FnValue<F>
    : never
  : Fns extends [infer F, ...infer Rest]
    ? F extends AsyncOrSync<any, any>
      ? Rest extends [AsyncOrSync<FnValue<F>, any>, ...AsyncOrSync<any, any>[]]
        ? PipeOutput<Rest>
        : never
      : never
    : never;

type PipeAsync<Fns extends AsyncOrSync<any, any>[]> = (input: PipeInput<Fns>) => Promise<PipeOutput<Fns>>;
type PipeAsyncFrom<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]> = (
  input?: PipeInput<Fns>
) => Promise<PipeOutput<Fns>>;

type PipeCheckFrom<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<[() => Input, ...Fns]> extends true ? unknown : PipeCheckResult<[() => Input, ...Fns]>);

function pipeAsync<A>(input: NonFunction<A>): Promise<A>;
function pipeAsync<A, B>(
  input: NonFunction<A>,
  ab: AsyncOrSync<NoInfer<A>, B>
): Promise<B>;
function pipeAsync<A, B, C>(
  input: NonFunction<A>,
  ab: AsyncOrSync<NoInfer<A>, B>,
  bc: AsyncOrSync<B, C>
): Promise<C>;
function pipeAsync<A, B, C, D>(
  input: NonFunction<A>,
  ab: AsyncOrSync<NoInfer<A>, B>,
  bc: AsyncOrSync<B, C>,
  cd: AsyncOrSync<C, D>
): Promise<D>;
function pipeAsync<A, B, C, D, E>(
  input: NonFunction<A>,
  ab: AsyncOrSync<NoInfer<A>, B>,
  bc: AsyncOrSync<B, C>,
  cd: AsyncOrSync<C, D>,
  de: AsyncOrSync<D, E>
): Promise<E>;
function pipeAsync<A, B, C, D, E, F>(
  input: NonFunction<A>,
  ab: AsyncOrSync<NoInfer<A>, B>,
  bc: AsyncOrSync<B, C>,
  cd: AsyncOrSync<C, D>,
  de: AsyncOrSync<D, E>,
  ef: AsyncOrSync<E, F>
): Promise<F>;
function pipeAsync<A, B, C, D, E, F, G>(
  input: NonFunction<A>,
  ab: AsyncOrSync<NoInfer<A>, B>,
  bc: AsyncOrSync<B, C>,
  cd: AsyncOrSync<C, D>,
  de: AsyncOrSync<D, E>,
  ef: AsyncOrSync<E, F>,
  fg: AsyncOrSync<F, G>
): Promise<G>;
function pipeAsync<A, B, C, D, E, F, G, H>(
  input: NonFunction<A>,
  ab: AsyncOrSync<NoInfer<A>, B>,
  bc: AsyncOrSync<B, C>,
  cd: AsyncOrSync<C, D>,
  de: AsyncOrSync<D, E>,
  ef: AsyncOrSync<E, F>,
  fg: AsyncOrSync<F, G>,
  gh: AsyncOrSync<G, H>
): Promise<H>;
function pipeAsync<A, B, C, D, E, F, G, H, I>(
  input: NonFunction<A>,
  ab: AsyncOrSync<NoInfer<A>, B>,
  bc: AsyncOrSync<B, C>,
  cd: AsyncOrSync<C, D>,
  de: AsyncOrSync<D, E>,
  ef: AsyncOrSync<E, F>,
  fg: AsyncOrSync<F, G>,
  gh: AsyncOrSync<G, H>,
  hi: AsyncOrSync<H, I>
): Promise<I>;
function pipeAsync<A, B, C, D, E, F, G, H, I, J>(
  input: NonFunction<A>,
  ab: AsyncOrSync<NoInfer<A>, B>,
  bc: AsyncOrSync<B, C>,
  cd: AsyncOrSync<C, D>,
  de: AsyncOrSync<D, E>,
  ef: AsyncOrSync<E, F>,
  fg: AsyncOrSync<F, G>,
  gh: AsyncOrSync<G, H>,
  hi: AsyncOrSync<H, I>,
  ij: AsyncOrSync<I, J>
): Promise<J>;
function pipeAsync<A, B, C, D, E, F, G, H, I, J, K>(
  input: NonFunction<A>,
  ab: AsyncOrSync<NoInfer<A>, B>,
  bc: AsyncOrSync<B, C>,
  cd: AsyncOrSync<C, D>,
  de: AsyncOrSync<D, E>,
  ef: AsyncOrSync<E, F>,
  fg: AsyncOrSync<F, G>,
  gh: AsyncOrSync<G, H>,
  hi: AsyncOrSync<H, I>,
  ij: AsyncOrSync<I, J>,
  jk: AsyncOrSync<J, K>
): Promise<K>;

function pipeAsync<R>(ab: ZeroFn<R>): () => Promise<FnValue<ZeroFn<R>>>;
function pipeAsync<B, F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>
): () => Promise<FnValue<F2>>;
function pipeAsync<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>
): () => Promise<FnValue<F3>>;
function pipeAsync<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): () => Promise<FnValue<F4>>;
function pipeAsync<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): () => Promise<FnValue<F5>>;
function pipeAsync<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): () => Promise<FnValue<F6>>;
function pipeAsync<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): () => Promise<FnValue<F7>>;
function pipeAsync<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): () => Promise<FnValue<F8>>;
function pipeAsync<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>
): () => Promise<FnValue<F9>>;
function pipeAsync<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>,
  F10 extends AsyncOrSync<FnValue<F9>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>,
  jk: ValidateFn<F10, FnValue<F9>>
): () => Promise<FnValue<F10>>;

function pipeAsync<F1 extends FromFn<any>>(ab: F1): (input?: unknown) => Promise<FnValue<F1>>;
function pipeAsync<F1 extends FromFn<any>, F2 extends AsyncOrSync<FnValue<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>
): (input?: unknown) => Promise<FnValue<F2>>;
function pipeAsync<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): (input?: unknown) => Promise<FnValue<F3>>;
function pipeAsync<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): (input?: unknown) => Promise<FnValue<F4>>;
function pipeAsync<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): (input?: unknown) => Promise<FnValue<F5>>;
function pipeAsync<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): (input?: unknown) => Promise<FnValue<F6>>;
function pipeAsync<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): (input?: unknown) => Promise<FnValue<F7>>;
function pipeAsync<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): (input?: unknown) => Promise<FnValue<F8>>;
function pipeAsync<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>
): (input?: unknown) => Promise<FnValue<F9>>;
function pipeAsync<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>,
  F10 extends AsyncOrSync<FnValue<F9>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>,
  jk: ValidateFn<F10, FnValue<F9>>
): (input?: unknown) => Promise<FnValue<F10>>;

function pipeAsync<F1 extends AsyncOrSync<any, any>>(ab: F1): (a: FnInput<F1>) => Promise<FnValue<F1>>;
function pipeAsync<F1 extends AsyncOrSync<any, any>, F2 extends AsyncOrSync<FnValue<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>
): (a: FnInput<F1>) => Promise<FnValue<F2>>;
function pipeAsync<
  F1 extends AsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): (a: FnInput<F1>) => Promise<FnValue<F3>>;
function pipeAsync<
  F1 extends AsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): (a: FnInput<F1>) => Promise<FnValue<F4>>;
function pipeAsync<
  F1 extends AsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): (a: FnInput<F1>) => Promise<FnValue<F5>>;
function pipeAsync<
  F1 extends AsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): (a: FnInput<F1>) => Promise<FnValue<F6>>;
function pipeAsync<
  F1 extends AsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): (a: FnInput<F1>) => Promise<FnValue<F7>>;
function pipeAsync<
  F1 extends AsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): (a: FnInput<F1>) => Promise<FnValue<F8>>;
function pipeAsync<
  F1 extends AsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>
): (a: FnInput<F1>) => Promise<FnValue<F9>>;
function pipeAsync<
  F1 extends AsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>,
  F10 extends AsyncOrSync<FnValue<F9>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>,
  jk: ValidateFn<F10, FnValue<F9>>
): (a: FnInput<F1>) => Promise<FnValue<F10>>;

function pipeAsync<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]>(...funcs: PipeCheck<Fns>): PipeAsyncFrom<Fns>;
function pipeAsync<Fns extends [AsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(...funcs: PipeCheck<Fns>): PipeAsync<Fns>;
function pipeAsync<A, Fns extends [AsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(
  input: NonFunction<A>,
  ...funcs: PipeCheckFrom<A, Fns>
): Promise<PipeOutput<Fns>>;
function pipeAsync(...args: Array<any>) {
  const run = async (value: any, funcs: Array<(arg: any) => any>) => {
    let acc = value;
    for (const fn of funcs) {
      acc = await fn(acc);
    }
    return acc;
  };

  if (args.length === 0) {
    return Promise.resolve(undefined);
  }
  const [input, ...rest] = args as [any, ...Array<(arg: any) => any>];
  if (typeof input === 'function') {
    const funcs = [input, ...rest];
    return (value: any) => run(value, funcs);
  }

  return run(input, rest);
}

const pipeAsyncWithBrand = pipeAsync as typeof pipeAsync & { readonly __pipe_async: true };
Object.defineProperty(pipeAsyncWithBrand, '__pipe_async', { value: true });

export default pipeAsyncWithBrand;
