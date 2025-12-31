import SideEffect from './sideEffect';
import pipe from './pipe';
import pipeSideEffect from './pipeSideEffect';
import pipeAsync from '../async/pipeAsync';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;

export const sideEffectInput = SideEffect.of(() => 0);

export const purePipe = pipe(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => `n:${value}`
);

type PurePipeExpected = (input: number) => string;
export type PipePureIsStrict = Expect<Equal<typeof purePipe, PurePipeExpected>>;

export const pipeWithSideEffectInput = pipeSideEffect(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => `n:${value}`
);

export const pipeWithSideEffectValue = pipeWithSideEffectInput(sideEffectInput);

type PipeExpected = (input: number | SideEffect<any>) => string | SideEffect<any>;
export type PipeAcceptsSideEffectInput = Expect<Equal<typeof pipeWithSideEffectInput, PipeExpected>>;

export const purePipeAsync = pipeAsync(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => `n:${value}`
);

type PurePipeAsyncExpected = (input: number) => Promise<string>;
export type PipeAsyncPureIsStrict = Expect<Equal<typeof purePipeAsync, PurePipeAsyncExpected>>;

export const pipeAsyncWithSideEffectInput = pipeAsyncSideEffect(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => `n:${value}`
);

export const pipeAsyncWithSideEffectValue = pipeAsyncWithSideEffectInput(sideEffectInput);

type PipeAsyncExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncAcceptsSideEffectInput = Expect<
  Equal<typeof pipeAsyncWithSideEffectInput, PipeAsyncExpected>
>;
