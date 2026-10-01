import type { FromFn } from './from';
import SideEffect, { isSideEffect } from './sideEffect';

type PipeError<From, To> = { __pipe_side_effect_error: ['pipeSideEffect', From, '->', To] };
type AnyFn = (...args: any[]) => any;
type NonFunction<T> = T extends AnyFn ? never : T;

type MaybeSideEffect<T, E> = [E] extends [never] ? T : T | SideEffect<E>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type UnaryFn<A, R> = (a: A) => R;

type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnReturn<F> = F extends (...args: any[]) => infer R ? R : never;
type FnValue<F> = NonSideEffect<FnReturn<F>>;

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

// Function-first entry: from() and zero-arg first steps keep their own call shapes.
// Rest-only functions such as `(...args: any[]) => R` are not zero-arg.
type IsZeroArg<F> = F extends (...args: infer P) => any ? (P extends [] ? true : false) : false;
type EffectEntry<F1, R, Values extends any[]> = F1 extends { readonly __from: true }
  ? EffectUnarySignaturesOptional<unknown, NonSideEffect<R>, EffectsOfValues<Values>>
  : IsZeroArg<F1> extends true
    ? () => MaybeSideEffect<NonSideEffect<R>, EffectsOfValues<Values>>
    : EffectUnarySignatures<FnInput<F1>, NonSideEffect<R>, EffectsOfValues<Values>>;
// One signature per arity serves both call styles (data-first and function-first),
// so no overload can pre-type the other style's lambdas. See research/pipe-soundness/unified.py.
// `any` input is data, not a function-first step.
type IsFn<I> = 0 extends 1 & I ? false : [I] extends [AnyFn] ? true : false;
type Last<Rs extends any[], Fallback> = Rs extends [...any[], infer L] ? L : Fallback;
type Head<I> = IsFn<I> extends true ? NonSideEffect<FnReturn<I>> : NonSideEffect<I>;
type Result<I, Rs extends any[]> = IsFn<I> extends true
  ? EffectEntry<I, Last<Rs, FnReturn<I>>, [FnReturn<I>, ...Rs]>
  : MaybeSideEffect<NonSideEffect<Last<Rs, I>>, EffectsOfValues<[I, ...Rs]>>;
type PipeCheckFrom<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<[() => Input, ...Fns]> extends true ? unknown : PipeCheckResult<[() => Input, ...Fns]>);

function pipeSideEffect<I>(first: I): Result<I, []>;
function pipeSideEffect<I, R1>(
  first: I,
  s1: UnaryFn<Head<I>, R1>
): Result<I, [R1]>;
function pipeSideEffect<I, R1, R2>(
  first: I,
  s1: UnaryFn<Head<I>, R1>,
  s2: UnaryFn<NonSideEffect<R1>, R2>
): Result<I, [R1, R2]>;
function pipeSideEffect<I, R1, R2, R3>(
  first: I,
  s1: UnaryFn<Head<I>, R1>,
  s2: UnaryFn<NonSideEffect<R1>, R2>,
  s3: UnaryFn<NonSideEffect<R2>, R3>
): Result<I, [R1, R2, R3]>;
function pipeSideEffect<I, R1, R2, R3, R4>(
  first: I,
  s1: UnaryFn<Head<I>, R1>,
  s2: UnaryFn<NonSideEffect<R1>, R2>,
  s3: UnaryFn<NonSideEffect<R2>, R3>,
  s4: UnaryFn<NonSideEffect<R3>, R4>
): Result<I, [R1, R2, R3, R4]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5>(
  first: I,
  s1: UnaryFn<Head<I>, R1>,
  s2: UnaryFn<NonSideEffect<R1>, R2>,
  s3: UnaryFn<NonSideEffect<R2>, R3>,
  s4: UnaryFn<NonSideEffect<R3>, R4>,
  s5: UnaryFn<NonSideEffect<R4>, R5>
): Result<I, [R1, R2, R3, R4, R5]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6>(
  first: I,
  s1: UnaryFn<Head<I>, R1>,
  s2: UnaryFn<NonSideEffect<R1>, R2>,
  s3: UnaryFn<NonSideEffect<R2>, R3>,
  s4: UnaryFn<NonSideEffect<R3>, R4>,
  s5: UnaryFn<NonSideEffect<R4>, R5>,
  s6: UnaryFn<NonSideEffect<R5>, R6>
): Result<I, [R1, R2, R3, R4, R5, R6]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7>(
  first: I,
  s1: UnaryFn<Head<I>, R1>,
  s2: UnaryFn<NonSideEffect<R1>, R2>,
  s3: UnaryFn<NonSideEffect<R2>, R3>,
  s4: UnaryFn<NonSideEffect<R3>, R4>,
  s5: UnaryFn<NonSideEffect<R4>, R5>,
  s6: UnaryFn<NonSideEffect<R5>, R6>,
  s7: UnaryFn<NonSideEffect<R6>, R7>
): Result<I, [R1, R2, R3, R4, R5, R6, R7]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8>(
  first: I,
  s1: UnaryFn<Head<I>, R1>,
  s2: UnaryFn<NonSideEffect<R1>, R2>,
  s3: UnaryFn<NonSideEffect<R2>, R3>,
  s4: UnaryFn<NonSideEffect<R3>, R4>,
  s5: UnaryFn<NonSideEffect<R4>, R5>,
  s6: UnaryFn<NonSideEffect<R5>, R6>,
  s7: UnaryFn<NonSideEffect<R6>, R7>,
  s8: UnaryFn<NonSideEffect<R7>, R8>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  first: I,
  s1: UnaryFn<Head<I>, R1>,
  s2: UnaryFn<NonSideEffect<R1>, R2>,
  s3: UnaryFn<NonSideEffect<R2>, R3>,
  s4: UnaryFn<NonSideEffect<R3>, R4>,
  s5: UnaryFn<NonSideEffect<R4>, R5>,
  s6: UnaryFn<NonSideEffect<R5>, R6>,
  s7: UnaryFn<NonSideEffect<R6>, R7>,
  s8: UnaryFn<NonSideEffect<R7>, R8>,
  s9: UnaryFn<NonSideEffect<R8>, R9>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  first: I,
  s1: UnaryFn<Head<I>, R1>,
  s2: UnaryFn<NonSideEffect<R1>, R2>,
  s3: UnaryFn<NonSideEffect<R2>, R3>,
  s4: UnaryFn<NonSideEffect<R3>, R4>,
  s5: UnaryFn<NonSideEffect<R4>, R5>,
  s6: UnaryFn<NonSideEffect<R5>, R6>,
  s7: UnaryFn<NonSideEffect<R6>, R7>,
  s8: UnaryFn<NonSideEffect<R7>, R8>,
  s9: UnaryFn<NonSideEffect<R8>, R9>,
  s10: UnaryFn<NonSideEffect<R9>, R10>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>;

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
