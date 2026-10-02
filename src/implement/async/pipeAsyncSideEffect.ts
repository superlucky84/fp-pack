import type { FromFn } from '../composition/from';
import SideEffect, { isSideEffect } from '../composition/sideEffect';

type PipeError<From, To> = { __pipe_async_side_effect_error: ['pipeAsyncSideEffect', From, '->', To] };
type AnyFn = (...args: any[]) => any;
// No contextual any beyond the generated inference signatures.
type FallbackFn = (value: never) => unknown;
type NonFunction<T> = T extends AnyFn ? never : T;

type MaybeSideEffect<T, E> = [E] extends [never] ? T : T | SideEffect<E>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type AsyncOrSync<A, R> = (a: A) => R | Promise<R>;

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

type EffectResultWithInput<FLast, Fns extends AnyFn[], EIn> = MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns> | EIn>;
// Resolved eagerly (conditional on E) so hovers show the call signatures instead of an alias.
type EffectUnarySignatures<A, R, E> = [E] extends [never]
  ? { (input: A): Promise<R>; <EIn>(input: A | SideEffect<EIn>): Promise<R | SideEffect<EIn>> }
  : { (input: A): Promise<R | SideEffect<E>>; <EIn>(input: A | SideEffect<EIn>): Promise<R | SideEffect<E | EIn>> };
type EffectUnarySignaturesOptional<A, R, E> = [E] extends [never]
  ? { (input?: A): Promise<R>; <EIn>(input?: A | SideEffect<EIn>): Promise<R | SideEffect<EIn>> }
  : { (input?: A): Promise<R | SideEffect<E>>; <EIn>(input?: A | SideEffect<EIn>): Promise<R | SideEffect<E | EIn>> };
type EffectUnaryReturnOptional<A, FLast, Fns extends AnyFn[]> = EffectUnarySignaturesOptional<A, FnValue<FLast>, EffectsOf<Fns>>;

type LastFn<Fns extends AnyFn[]> = Fns extends [...any[], infer L] ? L : never;

type PipeAsyncSideEffect<Fns extends [FallbackFn, ...FallbackFn[]]> = EffectEntry<Fns[0], FnValue<LastFn<Fns>>, { [K in keyof Fns]: Awaited<FnReturn<Fns[K]>> }>;
type PipeAsyncSideEffectFrom<Fns extends [FromFn<any>, ...AnyFn[]]> = EffectUnaryReturnOptional<
  unknown,
  LastFn<Fns>,
  Fns
>;

// Function-first entry: from() and zero-arg first steps keep their own call shapes.
// Rest-only functions such as `(...args: any[]) => R` are not zero-arg.
type IsZeroArg<F> = F extends (...args: infer P) => any ? (P extends [] ? true : false) : false;
type IsOptionalArg<F> = F extends (...args: infer P) => any
  ? number extends P["length"] ? false : [] extends P ? true : false
  : false;
type EffectEntry<F1, R, Values extends any[]> = F1 extends { readonly __from: true }
  ? EffectUnarySignaturesOptional<unknown, NonSideEffect<R>, EffectsOfValues<Values>>
  : IsZeroArg<F1> extends true
    ? () => Promise<MaybeSideEffect<NonSideEffect<R>, EffectsOfValues<Values>>>
    : IsOptionalArg<F1> extends true
      ? EffectUnarySignaturesOptional<FnInput<F1>, NonSideEffect<R>, EffectsOfValues<Values>>
      : EffectUnarySignatures<FnInput<F1>, NonSideEffect<R>, EffectsOfValues<Values>>;
// One signature per arity serves both call styles (data-first and function-first),
// so no overload can pre-type the other style's lambdas. Regenerate with scripts/generate-pipe-overloads.mjs.
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
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>,
  s22: AsyncOrSync<NonSideEffect<Awaited<R21>>, R22>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>,
  s22: AsyncOrSync<NonSideEffect<Awaited<R21>>, R22>,
  s23: AsyncOrSync<NonSideEffect<Awaited<R22>>, R23>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>,
  s22: AsyncOrSync<NonSideEffect<Awaited<R21>>, R22>,
  s23: AsyncOrSync<NonSideEffect<Awaited<R22>>, R23>,
  s24: AsyncOrSync<NonSideEffect<Awaited<R23>>, R24>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>,
  s22: AsyncOrSync<NonSideEffect<Awaited<R21>>, R22>,
  s23: AsyncOrSync<NonSideEffect<Awaited<R22>>, R23>,
  s24: AsyncOrSync<NonSideEffect<Awaited<R23>>, R24>,
  s25: AsyncOrSync<NonSideEffect<Awaited<R24>>, R25>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>,
  s22: AsyncOrSync<NonSideEffect<Awaited<R21>>, R22>,
  s23: AsyncOrSync<NonSideEffect<Awaited<R22>>, R23>,
  s24: AsyncOrSync<NonSideEffect<Awaited<R23>>, R24>,
  s25: AsyncOrSync<NonSideEffect<Awaited<R24>>, R25>,
  s26: AsyncOrSync<NonSideEffect<Awaited<R25>>, R26>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>,
  s22: AsyncOrSync<NonSideEffect<Awaited<R21>>, R22>,
  s23: AsyncOrSync<NonSideEffect<Awaited<R22>>, R23>,
  s24: AsyncOrSync<NonSideEffect<Awaited<R23>>, R24>,
  s25: AsyncOrSync<NonSideEffect<Awaited<R24>>, R25>,
  s26: AsyncOrSync<NonSideEffect<Awaited<R25>>, R26>,
  s27: AsyncOrSync<NonSideEffect<Awaited<R26>>, R27>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>,
  s22: AsyncOrSync<NonSideEffect<Awaited<R21>>, R22>,
  s23: AsyncOrSync<NonSideEffect<Awaited<R22>>, R23>,
  s24: AsyncOrSync<NonSideEffect<Awaited<R23>>, R24>,
  s25: AsyncOrSync<NonSideEffect<Awaited<R24>>, R25>,
  s26: AsyncOrSync<NonSideEffect<Awaited<R25>>, R26>,
  s27: AsyncOrSync<NonSideEffect<Awaited<R26>>, R27>,
  s28: AsyncOrSync<NonSideEffect<Awaited<R27>>, R28>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>,
  s22: AsyncOrSync<NonSideEffect<Awaited<R21>>, R22>,
  s23: AsyncOrSync<NonSideEffect<Awaited<R22>>, R23>,
  s24: AsyncOrSync<NonSideEffect<Awaited<R23>>, R24>,
  s25: AsyncOrSync<NonSideEffect<Awaited<R24>>, R25>,
  s26: AsyncOrSync<NonSideEffect<Awaited<R25>>, R26>,
  s27: AsyncOrSync<NonSideEffect<Awaited<R26>>, R27>,
  s28: AsyncOrSync<NonSideEffect<Awaited<R27>>, R28>,
  s29: AsyncOrSync<NonSideEffect<Awaited<R28>>, R29>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>,
  s22: AsyncOrSync<NonSideEffect<Awaited<R21>>, R22>,
  s23: AsyncOrSync<NonSideEffect<Awaited<R22>>, R23>,
  s24: AsyncOrSync<NonSideEffect<Awaited<R23>>, R24>,
  s25: AsyncOrSync<NonSideEffect<Awaited<R24>>, R25>,
  s26: AsyncOrSync<NonSideEffect<Awaited<R25>>, R26>,
  s27: AsyncOrSync<NonSideEffect<Awaited<R26>>, R27>,
  s28: AsyncOrSync<NonSideEffect<Awaited<R27>>, R28>,
  s29: AsyncOrSync<NonSideEffect<Awaited<R28>>, R29>,
  s30: AsyncOrSync<NonSideEffect<Awaited<R29>>, R30>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>,
  s22: AsyncOrSync<NonSideEffect<Awaited<R21>>, R22>,
  s23: AsyncOrSync<NonSideEffect<Awaited<R22>>, R23>,
  s24: AsyncOrSync<NonSideEffect<Awaited<R23>>, R24>,
  s25: AsyncOrSync<NonSideEffect<Awaited<R24>>, R25>,
  s26: AsyncOrSync<NonSideEffect<Awaited<R25>>, R26>,
  s27: AsyncOrSync<NonSideEffect<Awaited<R26>>, R27>,
  s28: AsyncOrSync<NonSideEffect<Awaited<R27>>, R28>,
  s29: AsyncOrSync<NonSideEffect<Awaited<R28>>, R29>,
  s30: AsyncOrSync<NonSideEffect<Awaited<R29>>, R30>,
  s31: AsyncOrSync<NonSideEffect<Awaited<R30>>, R31>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31]>;
function pipeAsyncSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32>(
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
  s10: AsyncOrSync<NonSideEffect<Awaited<R9>>, R10>,
  s11: AsyncOrSync<NonSideEffect<Awaited<R10>>, R11>,
  s12: AsyncOrSync<NonSideEffect<Awaited<R11>>, R12>,
  s13: AsyncOrSync<NonSideEffect<Awaited<R12>>, R13>,
  s14: AsyncOrSync<NonSideEffect<Awaited<R13>>, R14>,
  s15: AsyncOrSync<NonSideEffect<Awaited<R14>>, R15>,
  s16: AsyncOrSync<NonSideEffect<Awaited<R15>>, R16>,
  s17: AsyncOrSync<NonSideEffect<Awaited<R16>>, R17>,
  s18: AsyncOrSync<NonSideEffect<Awaited<R17>>, R18>,
  s19: AsyncOrSync<NonSideEffect<Awaited<R18>>, R19>,
  s20: AsyncOrSync<NonSideEffect<Awaited<R19>>, R20>,
  s21: AsyncOrSync<NonSideEffect<Awaited<R20>>, R21>,
  s22: AsyncOrSync<NonSideEffect<Awaited<R21>>, R22>,
  s23: AsyncOrSync<NonSideEffect<Awaited<R22>>, R23>,
  s24: AsyncOrSync<NonSideEffect<Awaited<R23>>, R24>,
  s25: AsyncOrSync<NonSideEffect<Awaited<R24>>, R25>,
  s26: AsyncOrSync<NonSideEffect<Awaited<R25>>, R26>,
  s27: AsyncOrSync<NonSideEffect<Awaited<R26>>, R27>,
  s28: AsyncOrSync<NonSideEffect<Awaited<R27>>, R28>,
  s29: AsyncOrSync<NonSideEffect<Awaited<R28>>, R29>,
  s30: AsyncOrSync<NonSideEffect<Awaited<R29>>, R30>,
  s31: AsyncOrSync<NonSideEffect<Awaited<R30>>, R31>,
  s32: AsyncOrSync<NonSideEffect<Awaited<R31>>, R32>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32]>;

function pipeAsyncSideEffect<Fns extends [FromFn<any>, ...FallbackFn[]]>(
  ...funcs: PipeCheck<Fns>
): PipeAsyncSideEffectFrom<Fns>;
function pipeAsyncSideEffect<Fns extends [FallbackFn, ...FallbackFn[]]>(
  ...funcs: PipeCheck<Fns>
): PipeAsyncSideEffect<Fns>;
function pipeAsyncSideEffect<A, Fns extends [FallbackFn, ...FallbackFn[]]>(
  input: NonFunction<A>,
  ...funcs: PipeCheckFrom<A, Fns>
): Promise<EffectResultWithInput<LastFn<Fns>, Fns, EffectOfValue<A>>>;
function pipeAsyncSideEffect<A, EIn, Fns extends [FallbackFn, ...FallbackFn[]]>(
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
