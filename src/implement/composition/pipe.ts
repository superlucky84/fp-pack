type PipeError<From, To> = { __pipe_error: ['pipe', From, '->', To] };
type UnaryFn<A, R> = (a: A) => R;
type AnyFn = (...args: any[]) => any;
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

type PipeInput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<infer A, any>, ...UnaryFn<any, any>[]]
  ? A
  : never;
type PipeOutput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<any, infer R>]
  ? R
  : Fns extends [UnaryFn<any, infer R>, ...infer Rest]
    ? Rest extends [UnaryFn<R, any>, ...UnaryFn<any, any>[]]
      ? PipeOutput<Rest>
      : never
    : never;
type Pipe<Fns extends UnaryFn<any, any>[]> = (input: PipeInput<Fns>) => PipeOutput<Fns>;

// Function-first entry: from() and zero-arg first steps keep their own call shapes.
// Rest-only functions such as `(...args: any[]) => R` are not zero-arg.
type IsZeroArg<F> = F extends (...args: infer P) => any ? (P extends [] ? true : false) : false;
type PipeEntry<F1, R> = F1 extends { readonly __from: true }
  ? (input?: unknown) => R
  : IsZeroArg<F1> extends true
    ? () => R
    : (a: FnInput<F1>) => R;
// One signature per arity serves both call styles (data-first and function-first),
// so no overload can pre-type the other style's lambdas. See research/pipe-soundness/unified.py.
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

function pipe<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(...funcs: PipeCheck<Fns>): Pipe<Fns>;
function pipe<A, Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(
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
