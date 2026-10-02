import type { FromFn } from './from';
import SideEffect, { isSideEffect } from './sideEffect';

type PipeError<From, To> = { __pipe_side_effect_error: ['pipeSideEffect', From, '->', To] };
type AnyFn = (...args: any[]) => any;
// No contextual any beyond the generated inference signatures.
type FallbackFn = (value: never) => unknown;
type NonFunction<T> = T extends AnyFn ? never : T;

type MaybeSideEffect<T, E> = [E] extends [never] ? T : T | SideEffect<E>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;

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

type EffectResultWithInput<FLast, Fns extends AnyFn[], EIn> = MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns> | EIn>;
// Resolved eagerly (conditional on E) so hovers show the call signatures instead of an alias.
type EffectUnarySignatures<A, R, E> = [E] extends [never]
  ? { (input: A): R; <EIn>(input: A | SideEffect<EIn>): R | SideEffect<EIn> }
  : { (input: A): R | SideEffect<E>; <EIn>(input: A | SideEffect<EIn>): R | SideEffect<E | EIn> };
type EffectUnarySignaturesOptional<A, R, E> = [E] extends [never]
  ? { (input?: A): R; <EIn>(input?: A | SideEffect<EIn>): R | SideEffect<EIn> }
  : { (input?: A): R | SideEffect<E>; <EIn>(input?: A | SideEffect<EIn>): R | SideEffect<E | EIn> };
type EffectUnaryReturnOptional<A, FLast, Fns extends AnyFn[]> = EffectUnarySignaturesOptional<A, FnValue<FLast>, EffectsOf<Fns>>;

type LastFn<Fns extends AnyFn[]> = Fns extends [...any[], infer L] ? L : never;

type PipeSideEffect<Fns extends [FallbackFn, ...FallbackFn[]]> = EffectEntry<Fns[0], FnValue<LastFn<Fns>>, { [K in keyof Fns]: FnReturn<Fns[K]> }>;
type PipeSideEffectFrom<Fns extends [FromFn<any>, ...AnyFn[]]> = EffectUnaryReturnOptional<
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
    ? () => MaybeSideEffect<NonSideEffect<R>, EffectsOfValues<Values>>
    : IsOptionalArg<F1> extends true
      ? EffectUnarySignaturesOptional<FnInput<F1>, NonSideEffect<R>, EffectsOfValues<Values>>
      : EffectUnarySignatures<FnInput<F1>, NonSideEffect<R>, EffectsOfValues<Values>>;
// One signature per arity serves both call styles (data-first and function-first),
// so no overload can pre-type the other style's lambdas. Regenerate with scripts/generate-pipe-overloads.mjs.
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
  s1: (value: Head<I>) => R1
): Result<I, [R1]>;
function pipeSideEffect<I, R1, R2>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2
): Result<I, [R1, R2]>;
function pipeSideEffect<I, R1, R2, R3>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3
): Result<I, [R1, R2, R3]>;
function pipeSideEffect<I, R1, R2, R3, R4>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4
): Result<I, [R1, R2, R3, R4]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5
): Result<I, [R1, R2, R3, R4, R5]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6
): Result<I, [R1, R2, R3, R4, R5, R6]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7
): Result<I, [R1, R2, R3, R4, R5, R6, R7]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21,
  s22: (value: NonSideEffect<R21>) => R22
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21,
  s22: (value: NonSideEffect<R21>) => R22,
  s23: (value: NonSideEffect<R22>) => R23
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21,
  s22: (value: NonSideEffect<R21>) => R22,
  s23: (value: NonSideEffect<R22>) => R23,
  s24: (value: NonSideEffect<R23>) => R24
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21,
  s22: (value: NonSideEffect<R21>) => R22,
  s23: (value: NonSideEffect<R22>) => R23,
  s24: (value: NonSideEffect<R23>) => R24,
  s25: (value: NonSideEffect<R24>) => R25
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21,
  s22: (value: NonSideEffect<R21>) => R22,
  s23: (value: NonSideEffect<R22>) => R23,
  s24: (value: NonSideEffect<R23>) => R24,
  s25: (value: NonSideEffect<R24>) => R25,
  s26: (value: NonSideEffect<R25>) => R26
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21,
  s22: (value: NonSideEffect<R21>) => R22,
  s23: (value: NonSideEffect<R22>) => R23,
  s24: (value: NonSideEffect<R23>) => R24,
  s25: (value: NonSideEffect<R24>) => R25,
  s26: (value: NonSideEffect<R25>) => R26,
  s27: (value: NonSideEffect<R26>) => R27
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21,
  s22: (value: NonSideEffect<R21>) => R22,
  s23: (value: NonSideEffect<R22>) => R23,
  s24: (value: NonSideEffect<R23>) => R24,
  s25: (value: NonSideEffect<R24>) => R25,
  s26: (value: NonSideEffect<R25>) => R26,
  s27: (value: NonSideEffect<R26>) => R27,
  s28: (value: NonSideEffect<R27>) => R28
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21,
  s22: (value: NonSideEffect<R21>) => R22,
  s23: (value: NonSideEffect<R22>) => R23,
  s24: (value: NonSideEffect<R23>) => R24,
  s25: (value: NonSideEffect<R24>) => R25,
  s26: (value: NonSideEffect<R25>) => R26,
  s27: (value: NonSideEffect<R26>) => R27,
  s28: (value: NonSideEffect<R27>) => R28,
  s29: (value: NonSideEffect<R28>) => R29
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21,
  s22: (value: NonSideEffect<R21>) => R22,
  s23: (value: NonSideEffect<R22>) => R23,
  s24: (value: NonSideEffect<R23>) => R24,
  s25: (value: NonSideEffect<R24>) => R25,
  s26: (value: NonSideEffect<R25>) => R26,
  s27: (value: NonSideEffect<R26>) => R27,
  s28: (value: NonSideEffect<R27>) => R28,
  s29: (value: NonSideEffect<R28>) => R29,
  s30: (value: NonSideEffect<R29>) => R30
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21,
  s22: (value: NonSideEffect<R21>) => R22,
  s23: (value: NonSideEffect<R22>) => R23,
  s24: (value: NonSideEffect<R23>) => R24,
  s25: (value: NonSideEffect<R24>) => R25,
  s26: (value: NonSideEffect<R25>) => R26,
  s27: (value: NonSideEffect<R26>) => R27,
  s28: (value: NonSideEffect<R27>) => R28,
  s29: (value: NonSideEffect<R28>) => R29,
  s30: (value: NonSideEffect<R29>) => R30,
  s31: (value: NonSideEffect<R30>) => R31
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31]>;
function pipeSideEffect<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: NonSideEffect<R1>) => R2,
  s3: (value: NonSideEffect<R2>) => R3,
  s4: (value: NonSideEffect<R3>) => R4,
  s5: (value: NonSideEffect<R4>) => R5,
  s6: (value: NonSideEffect<R5>) => R6,
  s7: (value: NonSideEffect<R6>) => R7,
  s8: (value: NonSideEffect<R7>) => R8,
  s9: (value: NonSideEffect<R8>) => R9,
  s10: (value: NonSideEffect<R9>) => R10,
  s11: (value: NonSideEffect<R10>) => R11,
  s12: (value: NonSideEffect<R11>) => R12,
  s13: (value: NonSideEffect<R12>) => R13,
  s14: (value: NonSideEffect<R13>) => R14,
  s15: (value: NonSideEffect<R14>) => R15,
  s16: (value: NonSideEffect<R15>) => R16,
  s17: (value: NonSideEffect<R16>) => R17,
  s18: (value: NonSideEffect<R17>) => R18,
  s19: (value: NonSideEffect<R18>) => R19,
  s20: (value: NonSideEffect<R19>) => R20,
  s21: (value: NonSideEffect<R20>) => R21,
  s22: (value: NonSideEffect<R21>) => R22,
  s23: (value: NonSideEffect<R22>) => R23,
  s24: (value: NonSideEffect<R23>) => R24,
  s25: (value: NonSideEffect<R24>) => R25,
  s26: (value: NonSideEffect<R25>) => R26,
  s27: (value: NonSideEffect<R26>) => R27,
  s28: (value: NonSideEffect<R27>) => R28,
  s29: (value: NonSideEffect<R28>) => R29,
  s30: (value: NonSideEffect<R29>) => R30,
  s31: (value: NonSideEffect<R30>) => R31,
  s32: (value: NonSideEffect<R31>) => R32
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32]>;

function pipeSideEffect<Fns extends [FromFn<any>, ...FallbackFn[]]>(
  ...funcs: PipeCheck<Fns>
): PipeSideEffectFrom<Fns>;
function pipeSideEffect<Fns extends [FallbackFn, ...FallbackFn[]]>(
  ...funcs: PipeCheck<Fns>
): PipeSideEffect<Fns>;
function pipeSideEffect<A, Fns extends [FallbackFn, ...FallbackFn[]]>(
  input: NonFunction<A>,
  ...funcs: PipeCheckFrom<A, Fns>
): EffectResultWithInput<LastFn<Fns>, Fns, EffectOfValue<A>>;
function pipeSideEffect<A, EIn, Fns extends [FallbackFn, ...FallbackFn[]]>(
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
