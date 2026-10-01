import type { FromFn } from '../composition/from';
import SideEffect, { isSideEffect } from '../composition/sideEffect';

type PipeError<From, To> = { __pipe_async_side_effect_error: ['pipeAsyncSideEffect', From, '->', To] };
type AnyFn = (...args: any[]) => any;
type NonFunction<T> = T extends AnyFn ? never : T;

type MaybeSideEffect<T, E> = [E] extends [never] ? T : T | SideEffect<E>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type AsyncOrSync<A, R> = (a: A) => R | Promise<R>;
type FirstAsyncOrSync<A, R> = AsyncOrSync<A, R> & { __from?: never };

type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnReturn<F> = F extends (...args: any[]) => infer R ? R : never;
type FnValue<F> = NonSideEffect<Awaited<FnReturn<F>>>;

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
type EffectOfFn<F> = EffectOfReturn<Awaited<FnReturn<F>>>;
type EffectsOf<Fns extends AnyFn[]> = EffectOfFn<Fns[number]>;
type EffectOfValue<T> = T extends SideEffect<infer E> ? E : never;
type EffectsOfValues<Values extends any[]> = EffectOfValue<Values[number]>;

type EffectResult<FLast, Fns extends AnyFn[]> = MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns>>;
type EffectResultWithInput<FLast, Fns extends AnyFn[], EIn> = MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns> | EIn>;
// Resolved eagerly (conditional on E) so hovers show the call signatures instead of an alias.
type EffectUnarySignatures<A, R, E> = [E] extends [never]
  ? { (input: A): Promise<R>; <EIn>(input: A | SideEffect<EIn>): Promise<R | SideEffect<EIn>> }
  : { (input: A): Promise<R | SideEffect<E>>; <EIn>(input: A | SideEffect<EIn>): Promise<R | SideEffect<E | EIn>> };
type EffectUnarySignaturesOptional<A, R, E> = [E] extends [never]
  ? { (input?: A): Promise<R>; <EIn>(input?: A | SideEffect<EIn>): Promise<R | SideEffect<EIn>> }
  : { (input?: A): Promise<R | SideEffect<E>>; <EIn>(input?: A | SideEffect<EIn>): Promise<R | SideEffect<E | EIn>> };
type EffectUnaryReturn<A, FLast, Fns extends AnyFn[]> = EffectUnarySignatures<A, FnValue<FLast>, EffectsOf<Fns>>;
type EffectUnaryReturnOptional<A, FLast, Fns extends AnyFn[]> = EffectUnarySignaturesOptional<A, FnValue<FLast>, EffectsOf<Fns>>;

type PipeInput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [
  AsyncOrSync<infer A, any>,
  ...AsyncOrSync<any, any>[]
]
  ? A
  : never;
type LastFn<Fns extends AnyFn[]> = Fns extends [...any[], infer L] ? L : never;

type PipeAsyncSideEffect<Fns extends [FirstAsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]> = EffectUnaryReturn<
  PipeInput<Fns>,
  LastFn<Fns>,
  Fns
>;
type PipeAsyncSideEffectFrom<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]> = EffectUnaryReturnOptional<
  unknown,
  LastFn<Fns>,
  Fns
>;

// Function-first entry: from() and zero-arg first steps keep their own call shapes.
// Rest-only functions such as `(...args: any[]) => R` are not zero-arg.
type IsZeroArg<F> = F extends (...args: infer P) => any ? (P extends [] ? true : false) : false;
type EffectEntry<F1, R, Values extends any[]> = F1 extends { readonly __from: true }
  ? EffectUnarySignaturesOptional<unknown, NonSideEffect<R>, EffectsOfValues<Values>>
  : IsZeroArg<F1> extends true
    ? () => Promise<MaybeSideEffect<NonSideEffect<R>, EffectsOfValues<Values>>>
    : EffectUnarySignatures<FnInput<F1>, NonSideEffect<R>, EffectsOfValues<Values>>;
// One signature per arity serves both call styles (data-first and function-first),
// so no overload can pre-type the other style's lambdas. See research/pipe-soundness/unified.py.
// `any` input is data, not a function-first step.
type IsFn<I> = 0 extends 1 & I ? false : [I] extends [AnyFn] ? true : false;
type Last<Rs extends any[], Fallback> = Rs extends [...any[], infer L] ? L : Fallback;
type Head<I> = IsFn<I> extends true ? NonSideEffect<Awaited<FnReturn<I>>> : NonSideEffect<I>;
type Result<I, Rs extends any[]> = IsFn<I> extends true
  ? EffectEntry<I, Awaited<Last<Rs, FnReturn<I>>>, [Awaited<FnReturn<I>>, ...Rs]>
  : Promise<MaybeSideEffect<NonSideEffect<Awaited<Last<Rs, I>>>, EffectsOfValues<[I, ...Rs]>>>;
type PipeCheckFrom<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<[() => Input, ...Fns]> extends true ? unknown : PipeCheckResult<[() => Input, ...Fns]>);

function pipeAsyncSideEffect<I>(first: I): Result<I, []>;
function pipeAsyncSideEffect<I, R1>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>
): Result<I, [R1]>;
function pipeAsyncSideEffect<I, R1, R2>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<NonSideEffect<Awaited<R1>>, R2>
): Result<I, [R1, R2]>;
function pipeAsyncSideEffect<I, R1, R2, R3>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<NonSideEffect<Awaited<R1>>, R2>,
  s3: AsyncOrSync<NonSideEffect<Awaited<R2>>, R3>
): Result<I, [R1, R2, R3]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<NonSideEffect<Awaited<R1>>, R2>,
  s3: AsyncOrSync<NonSideEffect<Awaited<R2>>, R3>,
  s4: AsyncOrSync<NonSideEffect<Awaited<R3>>, R4>
): Result<I, [R1, R2, R3, R4]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<NonSideEffect<Awaited<R1>>, R2>,
  s3: AsyncOrSync<NonSideEffect<Awaited<R2>>, R3>,
  s4: AsyncOrSync<NonSideEffect<Awaited<R3>>, R4>,
  s5: AsyncOrSync<NonSideEffect<Awaited<R4>>, R5>
): Result<I, [R1, R2, R3, R4, R5]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<NonSideEffect<Awaited<R1>>, R2>,
  s3: AsyncOrSync<NonSideEffect<Awaited<R2>>, R3>,
  s4: AsyncOrSync<NonSideEffect<Awaited<R3>>, R4>,
  s5: AsyncOrSync<NonSideEffect<Awaited<R4>>, R5>,
  s6: AsyncOrSync<NonSideEffect<Awaited<R5>>, R6>
): Result<I, [R1, R2, R3, R4, R5, R6]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<NonSideEffect<Awaited<R1>>, R2>,
  s3: AsyncOrSync<NonSideEffect<Awaited<R2>>, R3>,
  s4: AsyncOrSync<NonSideEffect<Awaited<R3>>, R4>,
  s5: AsyncOrSync<NonSideEffect<Awaited<R4>>, R5>,
  s6: AsyncOrSync<NonSideEffect<Awaited<R5>>, R6>,
  s7: AsyncOrSync<NonSideEffect<Awaited<R6>>, R7>
): Result<I, [R1, R2, R3, R4, R5, R6, R7]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<NonSideEffect<Awaited<R1>>, R2>,
  s3: AsyncOrSync<NonSideEffect<Awaited<R2>>, R3>,
  s4: AsyncOrSync<NonSideEffect<Awaited<R3>>, R4>,
  s5: AsyncOrSync<NonSideEffect<Awaited<R4>>, R5>,
  s6: AsyncOrSync<NonSideEffect<Awaited<R5>>, R6>,
  s7: AsyncOrSync<NonSideEffect<Awaited<R6>>, R7>,
  s8: AsyncOrSync<NonSideEffect<Awaited<R7>>, R8>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<NonSideEffect<Awaited<R1>>, R2>,
  s3: AsyncOrSync<NonSideEffect<Awaited<R2>>, R3>,
  s4: AsyncOrSync<NonSideEffect<Awaited<R3>>, R4>,
  s5: AsyncOrSync<NonSideEffect<Awaited<R4>>, R5>,
  s6: AsyncOrSync<NonSideEffect<Awaited<R5>>, R6>,
  s7: AsyncOrSync<NonSideEffect<Awaited<R6>>, R7>,
  s8: AsyncOrSync<NonSideEffect<Awaited<R7>>, R8>,
  s9: AsyncOrSync<NonSideEffect<Awaited<R8>>, R9>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<NonSideEffect<Awaited<R1>>, R2>,
  s3: AsyncOrSync<NonSideEffect<Awaited<R2>>, R3>,
  s4: AsyncOrSync<NonSideEffect<Awaited<R3>>, R4>,
  s5: AsyncOrSync<NonSideEffect<Awaited<R4>>, R5>,
  s6: AsyncOrSync<NonSideEffect<Awaited<R5>>, R6>,
  s7: AsyncOrSync<NonSideEffect<Awaited<R6>>, R7>,
  s8: AsyncOrSync<NonSideEffect<Awaited<R7>>, R8>,
  s9: AsyncOrSync<NonSideEffect<Awaited<R8>>, R9>,
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>;

function pipeAsyncSideEffect<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeAsyncSideEffectFrom<Fns>;
function pipeAsyncSideEffect<Fns extends [FirstAsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeAsyncSideEffect<Fns>;
function pipeAsyncSideEffect<A, Fns extends [AnyFn, ...AnyFn[]]>(
  input: NonFunction<A>,
  ...funcs: PipeCheckFrom<A, Fns>
): Promise<EffectResult<LastFn<Fns>, Fns>>;
function pipeAsyncSideEffect<A, EIn, Fns extends [AnyFn, ...AnyFn[]]>(
  input: NonFunction<A> | SideEffect<EIn>,
  ...funcs: PipeCheckFrom<A, Fns>
): Promise<EffectResultWithInput<LastFn<Fns>, Fns, EIn>>;
function pipeAsyncSideEffect(...args: Array<any>) {
  const run = async (init: any, funcs: Array<(input: any) => any>) => {
    let acc = init;
    for (const fn of funcs) {
      if (isSideEffect(acc)) {
        return acc;
      }
      acc = await fn(acc);
    }
    return acc;
  };

  if (args.length === 0) {
    return Promise.resolve(undefined);
  }
  const [input, ...rest] = args as [any, ...Array<(input: any) => any>];
  if (typeof input === 'function') {
    const funcs = [input, ...rest];
    return (init?: any) => run(init, funcs);
  }

  return run(input, rest);
}

const pipeAsyncSideEffectWithBrand = pipeAsyncSideEffect as typeof pipeAsyncSideEffect & { readonly __pipe_async_side_effect: true };
Object.defineProperty(pipeAsyncSideEffectWithBrand, '__pipe_async_side_effect', { value: true });

export default pipeAsyncSideEffectWithBrand;
