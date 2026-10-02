import type pipe from './pipe';
import type pipeAsync from '../async/pipeAsync';
import type pipeSideEffect from './pipeSideEffect';
import type pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import type SideEffect from './sideEffect';

type AnyFn = (...args: any[]) => any;
type FallbackStep = (value: never, deps: never) => unknown;
type PipeMode = 'sync' | 'async' | 'sideEffect' | 'asyncSideEffect';
type IsFn<I> = 0 extends 1 & I ? false : [I] extends [AnyFn] ? true : false;
type StepInput<F> = F extends (value: infer A, ...args: any[]) => any ? A : never;
type StepOutput<F> = F extends (...args: any[]) => infer R ? R : never;
type Initial<I> = IsFn<I> extends true ? StepOutput<I> : I;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type NextInput<M extends PipeMode, R> = M extends 'asyncSideEffect' ? NonSideEffect<Awaited<R>>
  : M extends 'sideEffect' ? NonSideEffect<R>
  : M extends 'async' ? Awaited<R> : R;
// Async pipes await step outputs, not the data-first input before the first step.
type Head<M extends PipeMode, I> = IsFn<I> extends true ? NextInput<M, StepOutput<I>>
  : M extends 'sideEffect' | 'asyncSideEffect' ? NonSideEffect<I> : I;
type EffectOf<R> = R extends SideEffect<infer E> ? E : never;
type Effects<M extends PipeMode, R> = M extends 'asyncSideEffect' ? EffectOf<Awaited<R>>
  : M extends 'sideEffect' ? EffectOf<R> : never;
type MaybeEffect<R, E> = [E] extends [never] ? R : R | SideEffect<E>;
type Output<M extends PipeMode, R, E> = M extends 'asyncSideEffect' ? Promise<MaybeEffect<NonSideEffect<Awaited<R>>, E>>
  : M extends 'sideEffect' ? MaybeEffect<NonSideEffect<R>, E>
  : M extends 'async' ? Promise<Awaited<R>> : R;
type Last<Rs extends unknown[], Fallback> = Rs extends [...unknown[], infer R] ? R : Fallback;
// An unused deps parameter contributes unknown to the intersection, not any.
type Dependency<F> = F extends (...args: any[]) => any
  ? Parameters<F>['length'] extends 0 | 1 ? unknown : Parameters<F>[1]
  : unknown;
type Intersect<Ds extends unknown[]> = Ds extends [infer D, ...infer Rest] ? D & Intersect<Rest> : unknown;
type Dependencies<Steps extends AnyFn[]> = { [K in keyof Steps]: Dependency<Steps[K]> };
type Returns<Steps extends AnyFn[]> = { [K in keyof Steps]: StepOutput<Steps[K]> };
type DepsCall<M extends PipeMode, D, R, E> = (deps: D) => Output<M, R, E>;
type RequiredEntry<M extends PipeMode, A, D, R, E> = M extends 'sideEffect' | 'asyncSideEffect'
  ? <EIn = never>(input: A | SideEffect<EIn>) => DepsCall<M, D, R, E | EIn>
  : (input: A) => DepsCall<M, D, R, E>;
type OptionalEntry<M extends PipeMode, A, D, R, E> = M extends 'sideEffect' | 'asyncSideEffect'
  ? <EIn = never>(input?: A | SideEffect<EIn>) => DepsCall<M, D, R, E | EIn>
  : (input?: A) => DepsCall<M, D, R, E>;
type Entry<M extends PipeMode, I, D, R, E> = I extends { readonly __from: true }
  ? (input?: unknown) => DepsCall<M, D, R, E>
  : I extends (...args: infer P) => any
    ? P extends [] ? () => DepsCall<M, D, R, E>
      : number extends P['length'] ? RequiredEntry<M, StepInput<I>, D, R, E>
      : undefined extends StepInput<I> ? OptionalEntry<M, StepInput<I>, D, R, E>
      : RequiredEntry<M, StepInput<I>, D, R, E>
    : never;
type Result<M extends PipeMode, I, Rs extends unknown[], Ds extends unknown[]> = IsFn<I> extends true
  ? Entry<M, I, Dependency<I> & Intersect<Ds>, Last<Rs, Initial<I>>, Effects<M, Initial<I> | Rs[number]>>
  : DepsCall<M, Intersect<Ds>, Last<Rs, I>, Effects<M, I | Rs[number]>>;
type PipeError<From, To> = { __pipe_with_deps_error: ['pipeWithDeps', From, '->', To] };
type Check<M extends PipeMode, Input, Steps extends AnyFn[]> = Steps extends [infer F extends AnyFn, ...infer Rest extends AnyFn[]]
  ? [Input] extends [StepInput<F>] ? Check<M, NextInput<M, StepOutput<F>>, Rest> : PipeError<Input, StepInput<F>>
  : true;
type CheckedSteps<M extends PipeMode, Input, Steps extends AnyFn[]> = Steps &
  (Check<M, Input, Steps> extends true ? unknown : Check<M, Input, Steps>);

// BEGIN GENERATED SIGNATURES
export type PipeWithDeps<Mode extends PipeMode> = {
  <I>(first: I): Result<Mode, I, [], []>;
  <I, R1, D1>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1
  ): Result<Mode, I, [R1], [D1]>;
  <I, R1, D1, R2, D2>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2
  ): Result<Mode, I, [R1, R2], [D1, D2]>;
  <I, R1, D1, R2, D2, R3, D3>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3
  ): Result<Mode, I, [R1, R2, R3], [D1, D2, D3]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4
  ): Result<Mode, I, [R1, R2, R3, R4], [D1, D2, D3, D4]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5
  ): Result<Mode, I, [R1, R2, R3, R4, R5], [D1, D2, D3, D4, D5]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6], [D1, D2, D3, D4, D5, D6]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7], [D1, D2, D3, D4, D5, D6, D7]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8], [D1, D2, D3, D4, D5, D6, D7, D8]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9], [D1, D2, D3, D4, D5, D6, D7, D8, D9]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21, R22, D22>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21,
    s22: (value: NextInput<Mode, R21>, deps: D22) => R22
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21, R22, D22, R23, D23>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21,
    s22: (value: NextInput<Mode, R21>, deps: D22) => R22,
    s23: (value: NextInput<Mode, R22>, deps: D23) => R23
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21, R22, D22, R23, D23, R24, D24>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21,
    s22: (value: NextInput<Mode, R21>, deps: D22) => R22,
    s23: (value: NextInput<Mode, R22>, deps: D23) => R23,
    s24: (value: NextInput<Mode, R23>, deps: D24) => R24
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21, R22, D22, R23, D23, R24, D24, R25, D25>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21,
    s22: (value: NextInput<Mode, R21>, deps: D22) => R22,
    s23: (value: NextInput<Mode, R22>, deps: D23) => R23,
    s24: (value: NextInput<Mode, R23>, deps: D24) => R24,
    s25: (value: NextInput<Mode, R24>, deps: D25) => R25
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21, R22, D22, R23, D23, R24, D24, R25, D25, R26, D26>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21,
    s22: (value: NextInput<Mode, R21>, deps: D22) => R22,
    s23: (value: NextInput<Mode, R22>, deps: D23) => R23,
    s24: (value: NextInput<Mode, R23>, deps: D24) => R24,
    s25: (value: NextInput<Mode, R24>, deps: D25) => R25,
    s26: (value: NextInput<Mode, R25>, deps: D26) => R26
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21, R22, D22, R23, D23, R24, D24, R25, D25, R26, D26, R27, D27>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21,
    s22: (value: NextInput<Mode, R21>, deps: D22) => R22,
    s23: (value: NextInput<Mode, R22>, deps: D23) => R23,
    s24: (value: NextInput<Mode, R23>, deps: D24) => R24,
    s25: (value: NextInput<Mode, R24>, deps: D25) => R25,
    s26: (value: NextInput<Mode, R25>, deps: D26) => R26,
    s27: (value: NextInput<Mode, R26>, deps: D27) => R27
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21, R22, D22, R23, D23, R24, D24, R25, D25, R26, D26, R27, D27, R28, D28>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21,
    s22: (value: NextInput<Mode, R21>, deps: D22) => R22,
    s23: (value: NextInput<Mode, R22>, deps: D23) => R23,
    s24: (value: NextInput<Mode, R23>, deps: D24) => R24,
    s25: (value: NextInput<Mode, R24>, deps: D25) => R25,
    s26: (value: NextInput<Mode, R25>, deps: D26) => R26,
    s27: (value: NextInput<Mode, R26>, deps: D27) => R27,
    s28: (value: NextInput<Mode, R27>, deps: D28) => R28
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21, R22, D22, R23, D23, R24, D24, R25, D25, R26, D26, R27, D27, R28, D28, R29, D29>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21,
    s22: (value: NextInput<Mode, R21>, deps: D22) => R22,
    s23: (value: NextInput<Mode, R22>, deps: D23) => R23,
    s24: (value: NextInput<Mode, R23>, deps: D24) => R24,
    s25: (value: NextInput<Mode, R24>, deps: D25) => R25,
    s26: (value: NextInput<Mode, R25>, deps: D26) => R26,
    s27: (value: NextInput<Mode, R26>, deps: D27) => R27,
    s28: (value: NextInput<Mode, R27>, deps: D28) => R28,
    s29: (value: NextInput<Mode, R28>, deps: D29) => R29
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21, R22, D22, R23, D23, R24, D24, R25, D25, R26, D26, R27, D27, R28, D28, R29, D29, R30, D30>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21,
    s22: (value: NextInput<Mode, R21>, deps: D22) => R22,
    s23: (value: NextInput<Mode, R22>, deps: D23) => R23,
    s24: (value: NextInput<Mode, R23>, deps: D24) => R24,
    s25: (value: NextInput<Mode, R24>, deps: D25) => R25,
    s26: (value: NextInput<Mode, R25>, deps: D26) => R26,
    s27: (value: NextInput<Mode, R26>, deps: D27) => R27,
    s28: (value: NextInput<Mode, R27>, deps: D28) => R28,
    s29: (value: NextInput<Mode, R28>, deps: D29) => R29,
    s30: (value: NextInput<Mode, R29>, deps: D30) => R30
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21, R22, D22, R23, D23, R24, D24, R25, D25, R26, D26, R27, D27, R28, D28, R29, D29, R30, D30, R31, D31>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21,
    s22: (value: NextInput<Mode, R21>, deps: D22) => R22,
    s23: (value: NextInput<Mode, R22>, deps: D23) => R23,
    s24: (value: NextInput<Mode, R23>, deps: D24) => R24,
    s25: (value: NextInput<Mode, R24>, deps: D25) => R25,
    s26: (value: NextInput<Mode, R25>, deps: D26) => R26,
    s27: (value: NextInput<Mode, R26>, deps: D27) => R27,
    s28: (value: NextInput<Mode, R27>, deps: D28) => R28,
    s29: (value: NextInput<Mode, R28>, deps: D29) => R29,
    s30: (value: NextInput<Mode, R29>, deps: D30) => R30,
    s31: (value: NextInput<Mode, R30>, deps: D31) => R31
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30, D31]>;
  <I, R1, D1, R2, D2, R3, D3, R4, D4, R5, D5, R6, D6, R7, D7, R8, D8, R9, D9, R10, D10, R11, D11, R12, D12, R13, D13, R14, D14, R15, D15, R16, D16, R17, D17, R18, D18, R19, D19, R20, D20, R21, D21, R22, D22, R23, D23, R24, D24, R25, D25, R26, D26, R27, D27, R28, D28, R29, D29, R30, D30, R31, D31, R32, D32>(
    first: I,
    s1: (value: Head<Mode, I>, deps: D1) => R1,
    s2: (value: NextInput<Mode, R1>, deps: D2) => R2,
    s3: (value: NextInput<Mode, R2>, deps: D3) => R3,
    s4: (value: NextInput<Mode, R3>, deps: D4) => R4,
    s5: (value: NextInput<Mode, R4>, deps: D5) => R5,
    s6: (value: NextInput<Mode, R5>, deps: D6) => R6,
    s7: (value: NextInput<Mode, R6>, deps: D7) => R7,
    s8: (value: NextInput<Mode, R7>, deps: D8) => R8,
    s9: (value: NextInput<Mode, R8>, deps: D9) => R9,
    s10: (value: NextInput<Mode, R9>, deps: D10) => R10,
    s11: (value: NextInput<Mode, R10>, deps: D11) => R11,
    s12: (value: NextInput<Mode, R11>, deps: D12) => R12,
    s13: (value: NextInput<Mode, R12>, deps: D13) => R13,
    s14: (value: NextInput<Mode, R13>, deps: D14) => R14,
    s15: (value: NextInput<Mode, R14>, deps: D15) => R15,
    s16: (value: NextInput<Mode, R15>, deps: D16) => R16,
    s17: (value: NextInput<Mode, R16>, deps: D17) => R17,
    s18: (value: NextInput<Mode, R17>, deps: D18) => R18,
    s19: (value: NextInput<Mode, R18>, deps: D19) => R19,
    s20: (value: NextInput<Mode, R19>, deps: D20) => R20,
    s21: (value: NextInput<Mode, R20>, deps: D21) => R21,
    s22: (value: NextInput<Mode, R21>, deps: D22) => R22,
    s23: (value: NextInput<Mode, R22>, deps: D23) => R23,
    s24: (value: NextInput<Mode, R23>, deps: D24) => R24,
    s25: (value: NextInput<Mode, R24>, deps: D25) => R25,
    s26: (value: NextInput<Mode, R25>, deps: D26) => R26,
    s27: (value: NextInput<Mode, R26>, deps: D27) => R27,
    s28: (value: NextInput<Mode, R27>, deps: D28) => R28,
    s29: (value: NextInput<Mode, R28>, deps: D29) => R29,
    s30: (value: NextInput<Mode, R29>, deps: D30) => R30,
    s31: (value: NextInput<Mode, R30>, deps: D31) => R31,
    s32: (value: NextInput<Mode, R31>, deps: D32) => R32
  ): Result<Mode, I, [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32], [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30, D31, D32]>;
  <I, Steps extends [FallbackStep, ...FallbackStep[]]>(first: I, ...steps: CheckedSteps<Mode, Head<Mode, I>, Steps>): Result<Mode, I, Returns<Steps>, Dependencies<Steps>>;
};
// END GENERATED SIGNATURES

// Deprecated aliases carry their base brand, so every alias shares this signature set.
function pipeWithDeps(pipeFn: typeof pipeAsyncSideEffect): PipeWithDeps<'asyncSideEffect'>;
function pipeWithDeps(pipeFn: typeof pipeSideEffect): PipeWithDeps<'sideEffect'>;
function pipeWithDeps(pipeFn: typeof pipeAsync): PipeWithDeps<'async'>;
function pipeWithDeps(pipeFn: typeof pipe): PipeWithDeps<'sync'>;
function pipeWithDeps(pipeFn: (...args: any[]) => any) {
  return (...args: AnyFn[]) => {
    if (typeof args[0] === 'function') {
      const steps = args;
      return (input?: unknown) => (deps: unknown) => {
        const wrapped = steps.map((fn) => ((value: unknown) => fn(value, deps)) as AnyFn);
        return pipeFn(input, ...wrapped);
      };
    }

    const [input, ...steps] = args;
    return (deps: unknown) => {
      const wrapped = steps.map((fn) => ((value: unknown) => fn(value, deps)) as AnyFn);
      return pipeFn(input, ...wrapped);
    };
  };
}

export default pipeWithDeps;
