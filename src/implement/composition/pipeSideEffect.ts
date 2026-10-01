import type { FromFn } from './from';
import SideEffect, { isSideEffect } from './sideEffect';

type PipeError<From, To> = { __pipe_side_effect_error: ['pipeSideEffect', From, '->', To] };
type NoInfer<T> = [T][T extends any ? 0 : never];
type AnyFn = (...args: any[]) => any;
type NonFunction<T> = T extends AnyFn ? never : T;

type MaybeSideEffect<T, E> = [E] extends [never] ? T : T | SideEffect<E>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type UnaryFn<A, R> = (a: A) => R;
type ZeroFn<R> = () => R;

type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnReturn<F> = F extends (...args: any[]) => infer R ? R : never;
type FnValue<F> = NonSideEffect<FnReturn<F>>;

type ValidateFn<Fn extends UnaryFn<any, any>, Expected> =
  ([Expected] extends [FnInput<Fn>] ? Fn : Fn & PipeError<Expected, FnInput<Fn>>) &
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

type EffectResult<FLast, Fns extends AnyFn[]> = MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns>>;
type EffectResultWithInput<FLast, Fns extends AnyFn[], EIn> = MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns> | EIn>;
type EffectResultValueChain<AOut, Values extends any[]> = MaybeSideEffect<NonSideEffect<AOut>, EffectsOfValues<Values>>;
type EffectResultValueChainWithInput<AOut, Values extends any[], EIn> = MaybeSideEffect<
  NonSideEffect<AOut>,
  EffectsOfValues<Values> | EIn
>;
// Resolved eagerly (conditional on E) so hovers show the call signatures instead of an alias.
type EffectUnarySignatures<A, R, E> = [E] extends [never]
  ? { (input: A): R; <EIn>(input: A | SideEffect<EIn>): R | SideEffect<EIn> }
  : { (input: A): R | SideEffect<E>; <EIn>(input: A | SideEffect<EIn>): R | SideEffect<E | EIn> };
type EffectUnarySignaturesOptional<A, R, E> = [E] extends [never]
  ? { (input?: A): R; <EIn>(input?: A | SideEffect<EIn>): R | SideEffect<EIn> }
  : { (input?: A): R | SideEffect<E>; <EIn>(input?: A | SideEffect<EIn>): R | SideEffect<E | EIn> };
type EffectUnaryReturn<A, FLast, Fns extends AnyFn[]> = EffectUnarySignatures<A, FnValue<FLast>, EffectsOf<Fns>>;
type EffectUnaryReturnOptional<A, FLast, Fns extends AnyFn[]> = EffectUnarySignaturesOptional<A, FnValue<FLast>, EffectsOf<Fns>>;

type PipeInput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<infer A, any>, ...UnaryFn<any, any>[]]
  ? A
  : never;
type LastFn<Fns extends AnyFn[]> = Fns extends [...any[], infer L] ? L : never;

type PipeSideEffect<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]> = EffectUnaryReturn<
  PipeInput<Fns>,
  LastFn<Fns>,
  Fns
>;
type PipeSideEffectFrom<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]> = EffectUnaryReturnOptional<
  unknown,
  LastFn<Fns>,
  Fns
>;

type PipeCheckFrom<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<[() => Input, ...Fns]> extends true ? unknown : PipeCheckResult<[() => Input, ...Fns]>);

function pipeSideEffect<A>(input: NonFunction<A>): A;
function pipeSideEffect<A, EIn>(input: NonFunction<A> | SideEffect<EIn>): A | SideEffect<EIn>;
function pipeSideEffect<A, B>(
  input: NonFunction<A>,
  ab: UnaryFn<NoInfer<A>, B>
): EffectResultValueChain<B, [B]>;
function pipeSideEffect<A, EIn, B>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: UnaryFn<NoInfer<A>, B>
): EffectResultValueChainWithInput<B, [B], EIn>;
function pipeSideEffect<A, B, C>(
  input: NonFunction<A>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>
): EffectResultValueChain<C, [B, C]>;
function pipeSideEffect<A, EIn, B, C>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>
): EffectResultValueChainWithInput<C, [B, C], EIn>;
function pipeSideEffect<A, B, C, D>(
  input: NonFunction<A>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>
): EffectResultValueChain<D, [B, C, D]>;
function pipeSideEffect<A, EIn, B, C, D>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>
): EffectResultValueChainWithInput<D, [B, C, D], EIn>;
function pipeSideEffect<A, B, C, D, E>(
  input: NonFunction<A>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>
): EffectResultValueChain<E, [B, C, D, E]>;
function pipeSideEffect<A, EIn, B, C, D, E>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>
): EffectResultValueChainWithInput<E, [B, C, D, E], EIn>;
function pipeSideEffect<A, B, C, D, E, F>(
  input: NonFunction<A>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>
): EffectResultValueChain<F, [B, C, D, E, F]>;
function pipeSideEffect<A, EIn, B, C, D, E, F>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>
): EffectResultValueChainWithInput<F, [B, C, D, E, F], EIn>;
function pipeSideEffect<A, B, C, D, E, F, G>(
  input: NonFunction<A>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>,
  fg: UnaryFn<NonSideEffect<F>, G>
): EffectResultValueChain<G, [B, C, D, E, F, G]>;
function pipeSideEffect<A, EIn, B, C, D, E, F, G>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>,
  fg: UnaryFn<NonSideEffect<F>, G>
): EffectResultValueChainWithInput<G, [B, C, D, E, F, G], EIn>;
function pipeSideEffect<A, B, C, D, E, F, G, H>(
  input: NonFunction<A>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>,
  fg: UnaryFn<NonSideEffect<F>, G>,
  gh: UnaryFn<NonSideEffect<G>, H>
): EffectResultValueChain<H, [B, C, D, E, F, G, H]>;
function pipeSideEffect<A, EIn, B, C, D, E, F, G, H>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>,
  fg: UnaryFn<NonSideEffect<F>, G>,
  gh: UnaryFn<NonSideEffect<G>, H>
): EffectResultValueChainWithInput<H, [B, C, D, E, F, G, H], EIn>;
function pipeSideEffect<A, B, C, D, E, F, G, H, I>(
  input: NonFunction<A>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>,
  fg: UnaryFn<NonSideEffect<F>, G>,
  gh: UnaryFn<NonSideEffect<G>, H>,
  hi: UnaryFn<NonSideEffect<H>, I>
): EffectResultValueChain<I, [B, C, D, E, F, G, H, I]>;
function pipeSideEffect<A, EIn, B, C, D, E, F, G, H, I>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>,
  fg: UnaryFn<NonSideEffect<F>, G>,
  gh: UnaryFn<NonSideEffect<G>, H>,
  hi: UnaryFn<NonSideEffect<H>, I>
): EffectResultValueChainWithInput<I, [B, C, D, E, F, G, H, I], EIn>;
function pipeSideEffect<A, B, C, D, E, F, G, H, I, J>(
  input: NonFunction<A>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>,
  fg: UnaryFn<NonSideEffect<F>, G>,
  gh: UnaryFn<NonSideEffect<G>, H>,
  hi: UnaryFn<NonSideEffect<H>, I>,
  ij: UnaryFn<NonSideEffect<I>, J>
): EffectResultValueChain<J, [B, C, D, E, F, G, H, I, J]>;
function pipeSideEffect<A, EIn, B, C, D, E, F, G, H, I, J>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>,
  fg: UnaryFn<NonSideEffect<F>, G>,
  gh: UnaryFn<NonSideEffect<G>, H>,
  hi: UnaryFn<NonSideEffect<H>, I>,
  ij: UnaryFn<NonSideEffect<I>, J>
): EffectResultValueChainWithInput<J, [B, C, D, E, F, G, H, I, J], EIn>;
function pipeSideEffect<A, B, C, D, E, F, G, H, I, J, K>(
  input: NonFunction<A>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>,
  fg: UnaryFn<NonSideEffect<F>, G>,
  gh: UnaryFn<NonSideEffect<G>, H>,
  hi: UnaryFn<NonSideEffect<H>, I>,
  ij: UnaryFn<NonSideEffect<I>, J>,
  jk: UnaryFn<NonSideEffect<J>, K>
): EffectResultValueChain<K, [B, C, D, E, F, G, H, I, J, K]>;
function pipeSideEffect<A, EIn, B, C, D, E, F, G, H, I, J, K>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: UnaryFn<NoInfer<A>, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, F>,
  fg: UnaryFn<NonSideEffect<F>, G>,
  gh: UnaryFn<NonSideEffect<G>, H>,
  hi: UnaryFn<NonSideEffect<H>, I>,
  ij: UnaryFn<NonSideEffect<I>, J>,
  jk: UnaryFn<NonSideEffect<J>, K>
): EffectResultValueChainWithInput<K, [B, C, D, E, F, G, H, I, J, K], EIn>;

function pipeSideEffect<R>(ab: ZeroFn<R>): () => EffectResult<ZeroFn<R>, [ZeroFn<R>]>;
function pipeSideEffect<B, F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>
): () => EffectResult<F2, [ZeroFn<B>, F2]>;
function pipeSideEffect<
  B,
  F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>
): () => EffectResult<F3, [ZeroFn<B>, F2, F3]>;
function pipeSideEffect<
  B,
  F2 extends UnaryFn<FnValue<ZeroFn<B>>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): () => EffectResult<F4, [ZeroFn<B>, F2, F3, F4]>;
function pipeSideEffect<
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
): () => EffectResult<F5, [ZeroFn<B>, F2, F3, F4, F5]>;
function pipeSideEffect<
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
): () => EffectResult<F6, [ZeroFn<B>, F2, F3, F4, F5, F6]>;
function pipeSideEffect<
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
): () => EffectResult<F7, [ZeroFn<B>, F2, F3, F4, F5, F6, F7]>;
function pipeSideEffect<
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
): () => EffectResult<F8, [ZeroFn<B>, F2, F3, F4, F5, F6, F7, F8]>;
function pipeSideEffect<
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
): () => EffectResult<F9, [ZeroFn<B>, F2, F3, F4, F5, F6, F7, F8, F9]>;
function pipeSideEffect<
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
): () => EffectResult<F10, [ZeroFn<B>, F2, F3, F4, F5, F6, F7, F8, F9, F10]>;

function pipeSideEffect<F1 extends FromFn<any>>(ab: F1): EffectUnaryReturnOptional<unknown, F1, [F1]>;
function pipeSideEffect<F1 extends FromFn<any>, F2 extends UnaryFn<FnValue<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>
): EffectUnaryReturnOptional<unknown, F2, [F1, F2]>;
function pipeSideEffect<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): EffectUnaryReturnOptional<unknown, F3, [F1, F2, F3]>;
function pipeSideEffect<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): EffectUnaryReturnOptional<unknown, F4, [F1, F2, F3, F4]>;
function pipeSideEffect<
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
): EffectUnaryReturnOptional<unknown, F5, [F1, F2, F3, F4, F5]>;
function pipeSideEffect<
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
): EffectUnaryReturnOptional<unknown, F6, [F1, F2, F3, F4, F5, F6]>;
function pipeSideEffect<
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
): EffectUnaryReturnOptional<unknown, F7, [F1, F2, F3, F4, F5, F6, F7]>;
function pipeSideEffect<
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
): EffectUnaryReturnOptional<unknown, F8, [F1, F2, F3, F4, F5, F6, F7, F8]>;
function pipeSideEffect<
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
): EffectUnaryReturnOptional<unknown, F9, [F1, F2, F3, F4, F5, F6, F7, F8, F9]>;
function pipeSideEffect<
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
): EffectUnaryReturnOptional<unknown, F10, [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>;

function pipeSideEffect<F1 extends UnaryFn<any, any>>(
  ab: F1
): EffectUnaryReturn<FnInput<F1>, F1, [F1]>;
function pipeSideEffect<F1 extends UnaryFn<any, any>, F2 extends UnaryFn<FnValue<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>
): EffectUnaryReturn<FnInput<F1>, F2, [F1, F2]>;
function pipeSideEffect<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): EffectUnaryReturn<FnInput<F1>, F3, [F1, F2, F3]>;
function pipeSideEffect<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): EffectUnaryReturn<FnInput<F1>, F4, [F1, F2, F3, F4]>;
function pipeSideEffect<
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
): EffectUnaryReturn<FnInput<F1>, F5, [F1, F2, F3, F4, F5]>;
function pipeSideEffect<
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
): EffectUnaryReturn<FnInput<F1>, F6, [F1, F2, F3, F4, F5, F6]>;
function pipeSideEffect<
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
): EffectUnaryReturn<FnInput<F1>, F7, [F1, F2, F3, F4, F5, F6, F7]>;
function pipeSideEffect<
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
): EffectUnaryReturn<FnInput<F1>, F8, [F1, F2, F3, F4, F5, F6, F7, F8]>;
function pipeSideEffect<
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
): EffectUnaryReturn<FnInput<F1>, F9, [F1, F2, F3, F4, F5, F6, F7, F8, F9]>;
function pipeSideEffect<
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
): EffectUnaryReturn<FnInput<F1>, F10, [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>;

function pipeSideEffect<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeSideEffectFrom<Fns>;
function pipeSideEffect<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeSideEffect<Fns>;
function pipeSideEffect<A, Fns extends [AnyFn, ...AnyFn[]]>(
  input: NonFunction<A>,
  ...funcs: PipeCheckFrom<A, Fns>
): EffectResult<LastFn<Fns>, Fns>;
function pipeSideEffect<A, EIn, Fns extends [AnyFn, ...AnyFn[]]>(
  input: NonFunction<A> | SideEffect<EIn>,
  ...funcs: PipeCheckFrom<A, Fns>
): EffectResultWithInput<LastFn<Fns>, Fns, EIn>;
function pipeSideEffect(...args: Array<any>) {
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

const pipeSideEffectWithBrand = pipeSideEffect as typeof pipeSideEffect & { readonly __pipe_side_effect: true };
Object.defineProperty(pipeSideEffectWithBrand, '__pipe_side_effect', { value: true });

export default pipeSideEffectWithBrand;
