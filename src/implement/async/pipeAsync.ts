import type { FromFn } from '../composition/from';

/** pipeAsync - 비동기 함수 합성 */
type PipeError<From, To> = { __pipe_async_error: ['pipeAsync', From, '->', To] };

type AsyncOrSync<A, R> = (a: A) => R | Promise<R>;
type AnyFn = (...args: any[]) => any;
// No contextual any beyond the generated inference signatures.
type FallbackFn = (value: never) => unknown;
type NonFunction<T> = T extends AnyFn ? never : T;

type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnReturn<F> = F extends (...args: any[]) => infer R ? R : never;
type FnValue<F> = Awaited<FnReturn<F>>;

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

type PipeOutput<Fns extends AnyFn[]> = Fns extends [...AnyFn[], infer F] ? FnValue<F> : never;
type PipeAsync<Fns extends AnyFn[]> = PipeAsyncEntry<Fns[0], PipeOutput<Fns>>;
type PipeAsyncFrom<Fns extends [FromFn<any>, ...AnyFn[]]> = PipeAsyncEntry<Fns[0], PipeOutput<Fns>>;

// Function-first entry: from() and zero-arg first steps keep their own call shapes.
// Rest-only functions such as `(...args: any[]) => R` are not zero-arg.
type IsZeroArg<F> = F extends (...args: infer P) => any ? (P extends [] ? true : false) : false;
type IsOptionalArg<F> = F extends (...args: infer P) => any
  ? number extends P["length"] ? false : [] extends P ? true : false
  : false;
type PipeAsyncEntry<F1, R> = F1 extends { readonly __from: true }
  ? (input?: unknown) => Promise<R>
  : IsZeroArg<F1> extends true
    ? () => Promise<R>
    : IsOptionalArg<F1> extends true
      ? (a?: FnInput<F1>) => Promise<R>
      : (a: FnInput<F1>) => Promise<R>;
// One signature per arity serves both call styles (data-first and function-first),
// so no overload can pre-type the other style's lambdas. Regenerate with scripts/generate-pipe-overloads.mjs.
// `any` input is data, not a function-first step.
type IsFn<I> = 0 extends 1 & I ? false : [I] extends [AnyFn] ? true : false;
type Last<Rs extends any[], Fallback> = Rs extends [...any[], infer L] ? L : Fallback;
type Head<I> = IsFn<I> extends true ? Awaited<FnReturn<I>> : I;
type Result<I, Rs extends any[]> = IsFn<I> extends true
  ? PipeAsyncEntry<I, Last<Rs, Awaited<FnReturn<I>>>>
  : Promise<Last<Rs, I>>;
type PipeCheckFrom<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<[() => Input, ...Fns]> extends true ? unknown : PipeCheckResult<[() => Input, ...Fns]>);

function pipeAsync<I>(first: I): Result<I, []>;
function pipeAsync<I, R1>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>
): Result<I, [R1]>;
function pipeAsync<I, R1, R2>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>
): Result<I, [R1, R2]>;
function pipeAsync<I, R1, R2, R3>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>
): Result<I, [R1, R2, R3]>;
function pipeAsync<I, R1, R2, R3, R4>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>
): Result<I, [R1, R2, R3, R4]>;
function pipeAsync<I, R1, R2, R3, R4, R5>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>
): Result<I, [R1, R2, R3, R4, R5]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>
): Result<I, [R1, R2, R3, R4, R5, R6]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>
): Result<I, [R1, R2, R3, R4, R5, R6, R7]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>,
  s22: AsyncOrSync<R21, R22>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>,
  s22: AsyncOrSync<R21, R22>,
  s23: AsyncOrSync<R22, R23>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>,
  s22: AsyncOrSync<R21, R22>,
  s23: AsyncOrSync<R22, R23>,
  s24: AsyncOrSync<R23, R24>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>,
  s22: AsyncOrSync<R21, R22>,
  s23: AsyncOrSync<R22, R23>,
  s24: AsyncOrSync<R23, R24>,
  s25: AsyncOrSync<R24, R25>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>,
  s22: AsyncOrSync<R21, R22>,
  s23: AsyncOrSync<R22, R23>,
  s24: AsyncOrSync<R23, R24>,
  s25: AsyncOrSync<R24, R25>,
  s26: AsyncOrSync<R25, R26>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>,
  s22: AsyncOrSync<R21, R22>,
  s23: AsyncOrSync<R22, R23>,
  s24: AsyncOrSync<R23, R24>,
  s25: AsyncOrSync<R24, R25>,
  s26: AsyncOrSync<R25, R26>,
  s27: AsyncOrSync<R26, R27>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>,
  s22: AsyncOrSync<R21, R22>,
  s23: AsyncOrSync<R22, R23>,
  s24: AsyncOrSync<R23, R24>,
  s25: AsyncOrSync<R24, R25>,
  s26: AsyncOrSync<R25, R26>,
  s27: AsyncOrSync<R26, R27>,
  s28: AsyncOrSync<R27, R28>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>,
  s22: AsyncOrSync<R21, R22>,
  s23: AsyncOrSync<R22, R23>,
  s24: AsyncOrSync<R23, R24>,
  s25: AsyncOrSync<R24, R25>,
  s26: AsyncOrSync<R25, R26>,
  s27: AsyncOrSync<R26, R27>,
  s28: AsyncOrSync<R27, R28>,
  s29: AsyncOrSync<R28, R29>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>,
  s22: AsyncOrSync<R21, R22>,
  s23: AsyncOrSync<R22, R23>,
  s24: AsyncOrSync<R23, R24>,
  s25: AsyncOrSync<R24, R25>,
  s26: AsyncOrSync<R25, R26>,
  s27: AsyncOrSync<R26, R27>,
  s28: AsyncOrSync<R27, R28>,
  s29: AsyncOrSync<R28, R29>,
  s30: AsyncOrSync<R29, R30>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>,
  s22: AsyncOrSync<R21, R22>,
  s23: AsyncOrSync<R22, R23>,
  s24: AsyncOrSync<R23, R24>,
  s25: AsyncOrSync<R24, R25>,
  s26: AsyncOrSync<R25, R26>,
  s27: AsyncOrSync<R26, R27>,
  s28: AsyncOrSync<R27, R28>,
  s29: AsyncOrSync<R28, R29>,
  s30: AsyncOrSync<R29, R30>,
  s31: AsyncOrSync<R30, R31>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31]>;
function pipeAsync<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32>(
  first: I,
  s1: AsyncOrSync<Head<I>, R1>,
  s2: AsyncOrSync<R1, R2>,
  s3: AsyncOrSync<R2, R3>,
  s4: AsyncOrSync<R3, R4>,
  s5: AsyncOrSync<R4, R5>,
  s6: AsyncOrSync<R5, R6>,
  s7: AsyncOrSync<R6, R7>,
  s8: AsyncOrSync<R7, R8>,
  s9: AsyncOrSync<R8, R9>,
  s10: AsyncOrSync<R9, R10>,
  s11: AsyncOrSync<R10, R11>,
  s12: AsyncOrSync<R11, R12>,
  s13: AsyncOrSync<R12, R13>,
  s14: AsyncOrSync<R13, R14>,
  s15: AsyncOrSync<R14, R15>,
  s16: AsyncOrSync<R15, R16>,
  s17: AsyncOrSync<R16, R17>,
  s18: AsyncOrSync<R17, R18>,
  s19: AsyncOrSync<R18, R19>,
  s20: AsyncOrSync<R19, R20>,
  s21: AsyncOrSync<R20, R21>,
  s22: AsyncOrSync<R21, R22>,
  s23: AsyncOrSync<R22, R23>,
  s24: AsyncOrSync<R23, R24>,
  s25: AsyncOrSync<R24, R25>,
  s26: AsyncOrSync<R25, R26>,
  s27: AsyncOrSync<R26, R27>,
  s28: AsyncOrSync<R27, R28>,
  s29: AsyncOrSync<R28, R29>,
  s30: AsyncOrSync<R29, R30>,
  s31: AsyncOrSync<R30, R31>,
  s32: AsyncOrSync<R31, R32>
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32]>;

function pipeAsync<Fns extends [FromFn<any>, ...FallbackFn[]]>(...funcs: PipeCheck<Fns>): PipeAsyncFrom<Fns>;
function pipeAsync<Fns extends [FallbackFn, ...FallbackFn[]]>(...funcs: PipeCheck<Fns>): PipeAsync<Fns>;
function pipeAsync<A, Fns extends [FallbackFn, ...FallbackFn[]]>(
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
