import type { FromFn } from '../composition/from';

/** pipeAsync - 비동기 함수 합성 */
type PipeError<From, To> = { __pipe_async_error: ['pipeAsync', From, '->', To] };

type AsyncOrSync<A, R> = (a: A) => R | Promise<R>;
type AnyFn = (...args: any[]) => any;
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

type PipeInput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [AsyncOrSync<infer A, any>, ...AsyncOrSync<any, any>[]]
  ? A
  : never;
type PipeOutput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [infer F]
  ? F extends AsyncOrSync<any, any>
    ? FnValue<F>
    : never
  : Fns extends [infer F, ...infer Rest]
    ? F extends AsyncOrSync<any, any>
      ? Rest extends [AsyncOrSync<FnValue<F>, any>, ...AsyncOrSync<any, any>[]]
        ? PipeOutput<Rest>
        : never
      : never
    : never;

type PipeAsync<Fns extends AsyncOrSync<any, any>[]> = (input: PipeInput<Fns>) => Promise<PipeOutput<Fns>>;
type PipeAsyncFrom<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]> = (
  input?: PipeInput<Fns>
) => Promise<PipeOutput<Fns>>;

// Function-first entry: from() and zero-arg first steps keep their own call shapes.
// Rest-only functions such as `(...args: any[]) => R` are not zero-arg.
type IsZeroArg<F> = F extends (...args: infer P) => any ? (P extends [] ? true : false) : false;
type PipeAsyncEntry<F1, R> = F1 extends { readonly __from: true }
  ? (input?: unknown) => Promise<R>
  : IsZeroArg<F1> extends true
    ? () => Promise<R>
    : (a: FnInput<F1>) => Promise<R>;
// One signature per arity serves both call styles (data-first and function-first),
// so no overload can pre-type the other style's lambdas. See research/pipe-soundness/unified.py.
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

function pipeAsync<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]>(...funcs: PipeCheck<Fns>): PipeAsyncFrom<Fns>;
function pipeAsync<Fns extends [AsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(...funcs: PipeCheck<Fns>): PipeAsync<Fns>;
function pipeAsync<A, Fns extends [AsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(
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
