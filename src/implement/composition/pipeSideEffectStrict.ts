import type { FromFn } from './from';
import SideEffect, { isSideEffect } from './sideEffect';

type PipeError<From, To> = { __pipe_side_effect_strict_error: ['pipeSideEffectStrict', From, '->', To] };
type NoInfer<T> = [T][T extends any ? 0 : never];
type AnyFn = (...args: any[]) => any;
type NonFunction<T> = T extends AnyFn ? never : T;

type MaybeSideEffect<T, E> = T | SideEffect<E>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type UnaryFn<A, R> = (a: A) => R;
type ZeroFn<R> = () => R;

type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnReturn<F> = F extends (...args: any[]) => infer R ? R : never;
type FnValue<F> = NonSideEffect<FnReturn<F>>;

type ValidateFn<Fn extends UnaryFn<any, any>, Expected> =
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

type EffectOfReturn<R> = R extends SideEffect<infer E> ? E : never;
type EffectOfFn<F> = EffectOfReturn<FnReturn<F>>;
type EffectsOf<Fns extends AnyFn[]> = EffectOfFn<Fns[number]>;
type EffectOfValue<T> = T extends SideEffect<infer E> ? E : never;
type EffectsOfValues<Values extends any[]> = EffectOfValue<Values[number]>;

type StrictResult<FLast, Fns extends AnyFn[]> = MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns>>;
type StrictResultWithInput<FLast, Fns extends AnyFn[], EIn> = MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns> | EIn>;
type StrictResultValueChain<AOut, Values extends any[]> = MaybeSideEffect<NonSideEffect<AOut>, EffectsOfValues<Values>>;
type StrictResultValueChainWithInput<AOut, Values extends any[], EIn> = MaybeSideEffect<
  NonSideEffect<AOut>,
  EffectsOfValues<Values> | EIn
>;
type StrictUnaryReturn<A, FLast, Fns extends AnyFn[]> = {
  (input: A): StrictResult<FLast, Fns>;
  <EIn>(input: A | SideEffect<EIn>): MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns> | EIn>;
};
type StrictUnaryReturnOptional<A, FLast, Fns extends AnyFn[]> = {
  (input?: A): StrictResult<FLast, Fns>;
  <EIn>(input?: A | SideEffect<EIn>): MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns> | EIn>;
};

type PipeInput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<infer A, any>, ...UnaryFn<any, any>[]]
  ? A
  : never;
type LastFn<Fns extends AnyFn[]> = Fns extends [...any[], infer L] ? L : never;

type PipeSideEffectStrict<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]> = StrictUnaryReturn<
  PipeInput<Fns>,
  LastFn<Fns>,
  Fns
>;
type PipeSideEffectStrictFrom<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]> = StrictUnaryReturnOptional<
  unknown,
  LastFn<Fns>,
  Fns
>;

type PipeCheckWithInput<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns extends [infer F, ...infer Rest]
    ? F extends UnaryFn<any, any>
      ? Rest extends AnyFn[]
        ? PipeCheck<[ValidateFn<F, Input>, ...Rest]>
        : PipeCheck<[ValidateFn<F, Input>]>
      : PipeError<Input, unknown>
    : PipeError<unknown, unknown>;

function pipeSideEffectStrict<A>(input: NonFunction<A>): A;
function pipeSideEffectStrict<A, EIn>(input: NonFunction<A> | SideEffect<EIn>): A | SideEffect<EIn>;
function pipeSideEffectStrict<A, B>(
  input: NonFunction<A>,
  ab: (value: A) => B
): StrictResultValueChain<B, [B]>;
function pipeSideEffectStrict<A, EIn, B>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: (value: A) => B
): StrictResultValueChainWithInput<B, [B], EIn>;
function pipeSideEffectStrict<A, B, C>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C
): StrictResultValueChain<C, [B, C]>;
function pipeSideEffectStrict<A, EIn, B, C>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C
): StrictResultValueChainWithInput<C, [B, C], EIn>;
function pipeSideEffectStrict<A, B, C, D>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D
): StrictResultValueChain<D, [B, C, D]>;
function pipeSideEffectStrict<A, EIn, B, C, D>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D
): StrictResultValueChainWithInput<D, [B, C, D], EIn>;
function pipeSideEffectStrict<A, B, C, D, E>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E
): StrictResultValueChain<E, [B, C, D, E]>;
function pipeSideEffectStrict<A, EIn, B, C, D, E>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E
): StrictResultValueChainWithInput<E, [B, C, D, E], EIn>;
function pipeSideEffectStrict<A, B, C, D, E, F>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F
): StrictResultValueChain<F, [B, C, D, E, F]>;
function pipeSideEffectStrict<A, EIn, B, C, D, E, F>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F
): StrictResultValueChainWithInput<F, [B, C, D, E, F], EIn>;
function pipeSideEffectStrict<A, B, C, D, E, F, G>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F,
  fg: (value: NonSideEffect<F>) => G
): StrictResultValueChain<G, [B, C, D, E, F, G]>;
function pipeSideEffectStrict<A, EIn, B, C, D, E, F, G>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F,
  fg: (value: NonSideEffect<F>) => G
): StrictResultValueChainWithInput<G, [B, C, D, E, F, G], EIn>;
function pipeSideEffectStrict<A, B, C, D, E, F, G, H>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F,
  fg: (value: NonSideEffect<F>) => G,
  gh: (value: NonSideEffect<G>) => H
): StrictResultValueChain<H, [B, C, D, E, F, G, H]>;
function pipeSideEffectStrict<A, EIn, B, C, D, E, F, G, H>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F,
  fg: (value: NonSideEffect<F>) => G,
  gh: (value: NonSideEffect<G>) => H
): StrictResultValueChainWithInput<H, [B, C, D, E, F, G, H], EIn>;
function pipeSideEffectStrict<A, B, C, D, E, F, G, H, I>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F,
  fg: (value: NonSideEffect<F>) => G,
  gh: (value: NonSideEffect<G>) => H,
  hi: (value: NonSideEffect<H>) => I
): StrictResultValueChain<I, [B, C, D, E, F, G, H, I]>;
function pipeSideEffectStrict<A, EIn, B, C, D, E, F, G, H, I>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F,
  fg: (value: NonSideEffect<F>) => G,
  gh: (value: NonSideEffect<G>) => H,
  hi: (value: NonSideEffect<H>) => I
): StrictResultValueChainWithInput<I, [B, C, D, E, F, G, H, I], EIn>;
function pipeSideEffectStrict<A, B, C, D, E, F, G, H, I, J>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F,
  fg: (value: NonSideEffect<F>) => G,
  gh: (value: NonSideEffect<G>) => H,
  hi: (value: NonSideEffect<H>) => I,
  ij: (value: NonSideEffect<I>) => J
): StrictResultValueChain<J, [B, C, D, E, F, G, H, I, J]>;
function pipeSideEffectStrict<A, EIn, B, C, D, E, F, G, H, I, J>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F,
  fg: (value: NonSideEffect<F>) => G,
  gh: (value: NonSideEffect<G>) => H,
  hi: (value: NonSideEffect<H>) => I,
  ij: (value: NonSideEffect<I>) => J
): StrictResultValueChainWithInput<J, [B, C, D, E, F, G, H, I, J], EIn>;
function pipeSideEffectStrict<A, B, C, D, E, F, G, H, I, J, K>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F,
  fg: (value: NonSideEffect<F>) => G,
  gh: (value: NonSideEffect<G>) => H,
  hi: (value: NonSideEffect<H>) => I,
  ij: (value: NonSideEffect<I>) => J,
  jk: (value: NonSideEffect<J>) => K
): StrictResultValueChain<K, [B, C, D, E, F, G, H, I, J, K]>;
function pipeSideEffectStrict<A, EIn, B, C, D, E, F, G, H, I, J, K>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: (value: A) => B,
  bc: (value: NonSideEffect<B>) => C,
  cd: (value: NonSideEffect<C>) => D,
  de: (value: NonSideEffect<D>) => E,
  ef: (value: NonSideEffect<E>) => F,
  fg: (value: NonSideEffect<F>) => G,
  gh: (value: NonSideEffect<G>) => H,
  hi: (value: NonSideEffect<H>) => I,
  ij: (value: NonSideEffect<I>) => J,
  jk: (value: NonSideEffect<J>) => K
): StrictResultValueChainWithInput<K, [B, C, D, E, F, G, H, I, J, K], EIn>;
function pipeSideEffectStrict<A, Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(
  input: NonFunction<A>,
  ...funcs: PipeCheckWithInput<A, Fns>
): StrictResult<LastFn<Fns>, Fns>;
function pipeSideEffectStrict<A, EIn, Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(
  input: NonFunction<A> | SideEffect<EIn>,
  ...funcs: PipeCheckWithInput<A, Fns>
): StrictResultWithInput<LastFn<Fns>, Fns, EIn>;

function pipeSideEffectStrict<R>(ab: ZeroFn<R>): () => StrictResult<ZeroFn<R>, [ZeroFn<R>]>;
function pipeSideEffectStrict<B, F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>
): () => StrictResult<F2, [ZeroFn<B>, F2]>;
function pipeSideEffectStrict<
  B,
  F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>
): () => StrictResult<F3, [ZeroFn<B>, F2, F3]>;
function pipeSideEffectStrict<
  B,
  F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): () => StrictResult<F4, [ZeroFn<B>, F2, F3, F4]>;
function pipeSideEffectStrict<
  B,
  F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): () => StrictResult<F5, [ZeroFn<B>, F2, F3, F4, F5]>;
function pipeSideEffectStrict<
  B,
  F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): () => StrictResult<F6, [ZeroFn<B>, F2, F3, F4, F5, F6]>;
function pipeSideEffectStrict<
  B,
  F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): () => StrictResult<F7, [ZeroFn<B>, F2, F3, F4, F5, F6, F7]>;
function pipeSideEffectStrict<
  B,
  F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): () => StrictResult<F8, [ZeroFn<B>, F2, F3, F4, F5, F6, F7, F8]>;
function pipeSideEffectStrict<
  B,
  F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>
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
): () => StrictResult<F9, [ZeroFn<B>, F2, F3, F4, F5, F6, F7, F8, F9]>;
function pipeSideEffectStrict<
  B,
  F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>,
  F10 extends UnaryFn<FnValue<F9>, any>
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
): () => StrictResult<F10, [ZeroFn<B>, F2, F3, F4, F5, F6, F7, F8, F9, F10]>;

function pipeSideEffectStrict<F1 extends FromFn<any>>(ab: F1): StrictUnaryReturnOptional<unknown, F1, [F1]>;
function pipeSideEffectStrict<F1 extends FromFn<any>, F2 extends UnaryFn<FnValue<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>
): StrictUnaryReturnOptional<unknown, F2, [F1, F2]>;
function pipeSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): StrictUnaryReturnOptional<unknown, F3, [F1, F2, F3]>;
function pipeSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): StrictUnaryReturnOptional<unknown, F4, [F1, F2, F3, F4]>;
function pipeSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): StrictUnaryReturnOptional<unknown, F5, [F1, F2, F3, F4, F5]>;
function pipeSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): StrictUnaryReturnOptional<unknown, F6, [F1, F2, F3, F4, F5, F6]>;
function pipeSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): StrictUnaryReturnOptional<unknown, F7, [F1, F2, F3, F4, F5, F6, F7]>;
function pipeSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): StrictUnaryReturnOptional<unknown, F8, [F1, F2, F3, F4, F5, F6, F7, F8]>;
function pipeSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>
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
): StrictUnaryReturnOptional<unknown, F9, [F1, F2, F3, F4, F5, F6, F7, F8, F9]>;
function pipeSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>,
  F10 extends UnaryFn<FnValue<F9>, any>
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
): StrictUnaryReturnOptional<unknown, F10, [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>;

function pipeSideEffectStrict<F1 extends UnaryFn<any, any>>(
  ab: F1
): StrictUnaryReturn<FnInput<F1>, F1, [F1]>;
function pipeSideEffectStrict<F1 extends UnaryFn<any, any>, F2 extends UnaryFn<FnValue<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>
): StrictUnaryReturn<FnInput<F1>, F2, [F1, F2]>;
function pipeSideEffectStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): StrictUnaryReturn<FnInput<F1>, F3, [F1, F2, F3]>;
function pipeSideEffectStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): StrictUnaryReturn<FnInput<F1>, F4, [F1, F2, F3, F4]>;
function pipeSideEffectStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): StrictUnaryReturn<FnInput<F1>, F5, [F1, F2, F3, F4, F5]>;
function pipeSideEffectStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): StrictUnaryReturn<FnInput<F1>, F6, [F1, F2, F3, F4, F5, F6]>;
function pipeSideEffectStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): StrictUnaryReturn<FnInput<F1>, F7, [F1, F2, F3, F4, F5, F6, F7]>;
function pipeSideEffectStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): StrictUnaryReturn<FnInput<F1>, F8, [F1, F2, F3, F4, F5, F6, F7, F8]>;
function pipeSideEffectStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>
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
): StrictUnaryReturn<FnInput<F1>, F9, [F1, F2, F3, F4, F5, F6, F7, F8, F9]>;
function pipeSideEffectStrict<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>,
  F10 extends UnaryFn<FnValue<F9>, any>
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
): StrictUnaryReturn<FnInput<F1>, F10, [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>;

function pipeSideEffectStrict<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeSideEffectStrictFrom<Fns>;
function pipeSideEffectStrict<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeSideEffectStrict<Fns>;
function pipeSideEffectStrict(...args: Array<any>) {
  const run = (init: any, funcs: Array<(input: any) => any>) => {
    let acc = init;
    for (const fn of funcs) {
      if (isSideEffect(acc)) {
        return acc;
      }
      acc = fn(acc);
    }
    return acc;
  };

  if (args.length === 0) {
    return undefined;
  }
  const [input, ...rest] = args as [any, ...Array<(input: any) => any>];
  if (typeof input === 'function') {
    const funcs = [input, ...rest];
    return (init?: any) => run(init, funcs);
  }

  return run(input, rest);
}

export default pipeSideEffectStrict;
