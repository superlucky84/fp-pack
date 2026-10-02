type PipeError<From, To> = { __pipe_error: ['pipe', From, '->', To] };
type AnyFn = (...args: any[]) => any;
// No contextual any beyond the generated inference signatures.
type FallbackFn = (value: never) => unknown;
type NonFunction<T> = T extends AnyFn ? never : T;
type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnOutput<F> = F extends (...args: any[]) => infer R ? R : never;
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

type PipeOutput<Fns extends AnyFn[]> = Fns extends [...AnyFn[], infer F] ? FnOutput<F> : never;
type Pipe<Fns extends AnyFn[]> = PipeEntry<Fns[0], PipeOutput<Fns>>;

// Function-first entry: from() and zero-arg first steps keep their own call shapes.
// Rest-only functions such as `(...args: any[]) => R` are not zero-arg.
type IsZeroArg<F> = F extends (...args: infer P) => any ? (P extends [] ? true : false) : false;
type IsOptionalArg<F> = F extends (...args: infer P) => any
  ? number extends P["length"] ? false : [] extends P ? true : false
  : false;
type PipeEntry<F1, R> = F1 extends { readonly __from: true }
  ? (input?: unknown) => R
  : IsZeroArg<F1> extends true
    ? () => R
    : IsOptionalArg<F1> extends true
      ? (a?: FnInput<F1>) => R
      : (a: FnInput<F1>) => R;
// One signature per arity serves both call styles (data-first and function-first),
// so no overload can pre-type the other style's lambdas. Regenerate with scripts/generate-pipe-overloads.mjs.
// `any` input is data, not a function-first step.
type IsFn<I> = 0 extends 1 & I ? false : [I] extends [AnyFn] ? true : false;
type Last<Rs extends any[], Fallback> = Rs extends [...any[], infer L] ? L : Fallback;
type Head<I> = IsFn<I> extends true ? FnOutput<I> : I;
type Result<I, Rs extends any[]> = IsFn<I> extends true
  ? PipeEntry<I, Last<Rs, FnOutput<I>>>
  : Last<Rs, I>;
type PipeCheckFrom<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<[() => Input, ...Fns]> extends true ? unknown : PipeCheckResult<[() => Input, ...Fns]>);

function pipe<I>(first: I): Result<I, []>;
function pipe<I, R1>(
  first: I,
  s1: (value: Head<I>) => R1
): Result<I, [R1]>;
function pipe<I, R1, R2>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2
): Result<I, [R1, R2]>;
function pipe<I, R1, R2, R3>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3
): Result<I, [R1, R2, R3]>;
function pipe<I, R1, R2, R3, R4>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4
): Result<I, [R1, R2, R3, R4]>;
function pipe<I, R1, R2, R3, R4, R5>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5
): Result<I, [R1, R2, R3, R4, R5]>;
function pipe<I, R1, R2, R3, R4, R5, R6>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6
): Result<I, [R1, R2, R3, R4, R5, R6]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7
): Result<I, [R1, R2, R3, R4, R5, R6, R7]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21,
  s22: (value: R21) => R22
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21,
  s22: (value: R21) => R22,
  s23: (value: R22) => R23
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21,
  s22: (value: R21) => R22,
  s23: (value: R22) => R23,
  s24: (value: R23) => R24
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21,
  s22: (value: R21) => R22,
  s23: (value: R22) => R23,
  s24: (value: R23) => R24,
  s25: (value: R24) => R25
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21,
  s22: (value: R21) => R22,
  s23: (value: R22) => R23,
  s24: (value: R23) => R24,
  s25: (value: R24) => R25,
  s26: (value: R25) => R26
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21,
  s22: (value: R21) => R22,
  s23: (value: R22) => R23,
  s24: (value: R23) => R24,
  s25: (value: R24) => R25,
  s26: (value: R25) => R26,
  s27: (value: R26) => R27
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21,
  s22: (value: R21) => R22,
  s23: (value: R22) => R23,
  s24: (value: R23) => R24,
  s25: (value: R24) => R25,
  s26: (value: R25) => R26,
  s27: (value: R26) => R27,
  s28: (value: R27) => R28
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21,
  s22: (value: R21) => R22,
  s23: (value: R22) => R23,
  s24: (value: R23) => R24,
  s25: (value: R24) => R25,
  s26: (value: R25) => R26,
  s27: (value: R26) => R27,
  s28: (value: R27) => R28,
  s29: (value: R28) => R29
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21,
  s22: (value: R21) => R22,
  s23: (value: R22) => R23,
  s24: (value: R23) => R24,
  s25: (value: R24) => R25,
  s26: (value: R25) => R26,
  s27: (value: R26) => R27,
  s28: (value: R27) => R28,
  s29: (value: R28) => R29,
  s30: (value: R29) => R30
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21,
  s22: (value: R21) => R22,
  s23: (value: R22) => R23,
  s24: (value: R23) => R24,
  s25: (value: R24) => R25,
  s26: (value: R25) => R26,
  s27: (value: R26) => R27,
  s28: (value: R27) => R28,
  s29: (value: R28) => R29,
  s30: (value: R29) => R30,
  s31: (value: R30) => R31
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31]>;
function pipe<I, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32>(
  first: I,
  s1: (value: Head<I>) => R1,
  s2: (value: R1) => R2,
  s3: (value: R2) => R3,
  s4: (value: R3) => R4,
  s5: (value: R4) => R5,
  s6: (value: R5) => R6,
  s7: (value: R6) => R7,
  s8: (value: R7) => R8,
  s9: (value: R8) => R9,
  s10: (value: R9) => R10,
  s11: (value: R10) => R11,
  s12: (value: R11) => R12,
  s13: (value: R12) => R13,
  s14: (value: R13) => R14,
  s15: (value: R14) => R15,
  s16: (value: R15) => R16,
  s17: (value: R16) => R17,
  s18: (value: R17) => R18,
  s19: (value: R18) => R19,
  s20: (value: R19) => R20,
  s21: (value: R20) => R21,
  s22: (value: R21) => R22,
  s23: (value: R22) => R23,
  s24: (value: R23) => R24,
  s25: (value: R24) => R25,
  s26: (value: R25) => R26,
  s27: (value: R26) => R27,
  s28: (value: R27) => R28,
  s29: (value: R28) => R29,
  s30: (value: R29) => R30,
  s31: (value: R30) => R31,
  s32: (value: R31) => R32
): Result<I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32]>;

function pipe<Fns extends [FallbackFn, ...FallbackFn[]]>(...funcs: PipeCheck<Fns>): Pipe<Fns>;
function pipe<A, Fns extends [FallbackFn, ...FallbackFn[]]>(
  input: NonFunction<A>,
  ...funcs: PipeCheckFrom<A, Fns>
): PipeOutput<Fns>;
function pipe(...args: Array<any>) {
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

const pipeWithBrand = pipe as typeof pipe & { readonly __pipe: true };
Object.defineProperty(pipeWithBrand, '__pipe', { value: true });

export default pipeWithBrand;
