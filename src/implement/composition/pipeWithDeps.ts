import type pipe from './pipe';
import type pipeStrict from './pipeStrict';
import type { FromFn } from './from';
import type pipeSideEffect from './pipeSideEffect';
import type pipeSideEffectStrict from './pipeSideEffectStrict';
import type SideEffect from './sideEffect';
import type pipeAsync from '../async/pipeAsync';
import type pipeAsyncStrict from '../async/pipeAsyncStrict';
import type pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import type pipeAsyncSideEffectStrict from '../async/pipeAsyncSideEffectStrict';

type PipeError<From, To> = { __pipe_with_deps_error: ['pipeWithDeps', From, '->', To] };
type NoInfer<T> = [T][T extends any ? 0 : never];
type AnyFn = (...args: any[]) => any;
type NonFunction<T> = T extends AnyFn ? never : T;

type StepInput<F> = F extends (value: infer A, ...args: any[]) => any ? A : never;
type StepOutput<F> = F extends (...args: any[]) => infer R ? R : never;
type ValidateStep<Fn extends AnyFn, Expected> =
  (Fn extends (value: NoInfer<Expected>, ...args: any[]) => any ? Fn : Fn & PipeError<Expected, StepInput<Fn>>) &
    ((value: NoInfer<Expected>, ...args: any[]) => any);

type DepOf<F> = F extends (...args: any[]) => any
  ? Parameters<F> extends [any, infer D, ...any[]]
    ? D
    : never
  : never;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type DepsOf<Steps extends readonly AnyFn[]> = UnionToIntersection<DepOf<Steps[number]>>;
type DepsFor<Steps extends readonly AnyFn[]> = [DepsOf<Steps>] extends [never] ? unknown : DepsOf<Steps>;

type MaybeSideEffect<T> = T | SideEffect<any>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type EffectOfReturn<R> = R extends SideEffect<infer E> ? E : never;
type EffectsOfSteps<Steps extends readonly AnyFn[]> = EffectOfReturn<StepOutput<Steps[number]>>;
type EffectsOfStepsAsync<Steps extends readonly AnyFn[]> = EffectOfReturn<Awaited<StepOutput<Steps[number]>>>;

type PipeMode = 'sync' | 'async' | 'sideEffect' | 'asyncSideEffect' | 'sideEffectStrict' | 'asyncSideEffectStrict';

type NextInput<Mode extends PipeMode, R> = Mode extends 'asyncSideEffect' | 'asyncSideEffectStrict'
  ? NonSideEffect<Awaited<R>>
  : Mode extends 'sideEffect' | 'sideEffectStrict'
    ? NonSideEffect<R>
    : Mode extends 'async'
      ? Awaited<R>
      : R;

type ValidateSteps<Mode extends PipeMode, Steps extends readonly AnyFn[], Prev> = Steps extends readonly [
  infer F,
  ...infer Rest
]
  ? F extends AnyFn
    ? Rest extends readonly AnyFn[]
      ? [ValidateStep<F, Prev>, ...ValidateSteps<Mode, Rest, NextInput<Mode, StepOutput<F>>>]
      : [ValidateStep<F, Prev>]
    : []
  : [];

type LastReturn<Steps extends readonly AnyFn[], Input> = Steps extends readonly [infer F, ...infer Rest]
  ? F extends AnyFn
    ? Rest extends readonly AnyFn[]
      ? LastReturn<Rest, StepOutput<F>>
      : StepOutput<F>
    : never
  : Input;

type FinalValue<Mode extends PipeMode, R, Steps extends readonly AnyFn[], EIn = never> = Mode extends 'sync'
  ? R
  : Mode extends 'async'
    ? Awaited<R>
    : Mode extends 'sideEffect'
      ? MaybeSideEffect<NonSideEffect<R>>
      : Mode extends 'asyncSideEffect'
        ? MaybeSideEffect<NonSideEffect<Awaited<R>>>
        : Mode extends 'sideEffectStrict'
          ? NonSideEffect<R> | SideEffect<EffectsOfSteps<Steps> | EIn>
          : Mode extends 'asyncSideEffectStrict'
            ? NonSideEffect<Awaited<R>> | SideEffect<EffectsOfStepsAsync<Steps> | EIn>
            : never;

type PipeResult<Mode extends PipeMode, Input, Steps extends readonly AnyFn[], EIn = never> = Mode extends
  | 'async'
  | 'asyncSideEffect'
  | 'asyncSideEffectStrict'
  ? Promise<FinalValue<Mode, Input, Steps, EIn>>
  : FinalValue<Mode, Input, Steps, EIn>;

type CheckedSteps<Mode extends PipeMode, Steps extends readonly AnyFn[], Input> = Steps extends ValidateSteps<
  Mode,
  Steps,
  Input
>
  ? Steps
  : ValidateSteps<Mode, Steps, Input>;

type FirstStep<Steps extends readonly AnyFn[]> = Steps extends readonly [infer F, ...any[]] ? F : never;
type FirstStepInput<Steps extends readonly AnyFn[]> = StepInput<FirstStep<Steps>>;

type PipeWithDepsPure<Mode extends 'sync' | 'async'> = {
  <Input>(input: NonFunction<Input>): (deps: unknown) => PipeResult<Mode, Input, []>;
  <Input, Steps extends readonly [AnyFn, ...AnyFn[]]>(
    input: NonFunction<Input>,
    ...steps: Steps
  ): (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, Input>, Input>,
    CheckedSteps<Mode, Steps, Input>
  >;
  <Steps extends readonly [FromFn<any>, ...AnyFn[]]>(
    ...steps: Steps
  ): (input?: unknown) => (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, FirstStepInput<Steps>>, FirstStepInput<Steps>>,
    CheckedSteps<Mode, Steps, FirstStepInput<Steps>>
  >;
  <Steps extends readonly [AnyFn, ...AnyFn[]]>(
    ...steps: Steps
  ): (input: NonFunction<FirstStepInput<Steps>>) => (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, FirstStepInput<Steps>>, FirstStepInput<Steps>>,
    CheckedSteps<Mode, Steps, FirstStepInput<Steps>>
  >;
};

type PipeWithDepsPureStrict<Mode extends 'sync' | 'async'> = {
  <Input>(input: NonFunction<Input>): (deps: unknown) => PipeResult<Mode, Input, []>;
  <Input, Steps extends readonly [AnyFn, ...AnyFn[]]>(
    input: NonFunction<Input>,
    ...steps: CheckedSteps<Mode, Steps, Input>
  ): (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, Input>, Input>,
    CheckedSteps<Mode, Steps, Input>
  >;
  <Steps extends readonly [FromFn<any>, ...AnyFn[]]>(
    ...steps: CheckedSteps<Mode, Steps, FirstStepInput<Steps>>
  ): (input?: unknown) => (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, FirstStepInput<Steps>>, FirstStepInput<Steps>>,
    CheckedSteps<Mode, Steps, FirstStepInput<Steps>>
  >;
  <Steps extends readonly [AnyFn, ...AnyFn[]]>(
    ...steps: CheckedSteps<Mode, Steps, FirstStepInput<Steps>>
  ): (input: NonFunction<FirstStepInput<Steps>>) => (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, FirstStepInput<Steps>>, FirstStepInput<Steps>>,
    CheckedSteps<Mode, Steps, FirstStepInput<Steps>>
  >;
};

type PipeWithDepsAny<Mode extends 'sideEffect' | 'asyncSideEffect'> = {
  <Input>(input: NonFunction<Input> | SideEffect<any>): (deps: unknown) => PipeResult<Mode, Input, []>;
  <Input, Steps extends readonly [AnyFn, ...AnyFn[]]>(
    input: NonFunction<Input> | SideEffect<any>,
    ...steps: Steps
  ): (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, Input>, Input>,
    CheckedSteps<Mode, Steps, Input>
  >;
  <Steps extends readonly [FromFn<any>, ...AnyFn[]]>(
    ...steps: Steps
  ): (input?: unknown | SideEffect<any>) => (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, FirstStepInput<Steps>>, FirstStepInput<Steps>>,
    CheckedSteps<Mode, Steps, FirstStepInput<Steps>>
  >;
  <Steps extends readonly [AnyFn, ...AnyFn[]]>(
    ...steps: Steps
  ): (input: NonFunction<FirstStepInput<Steps>> | SideEffect<any>) => (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, FirstStepInput<Steps>>, FirstStepInput<Steps>>,
    CheckedSteps<Mode, Steps, FirstStepInput<Steps>>
  >;
};

type PipeWithDepsStrict<Mode extends 'sideEffectStrict' | 'asyncSideEffectStrict'> = {
  <Input, EIn = never>(input: NonFunction<Input> | SideEffect<EIn>): (deps: unknown) => PipeResult<Mode, Input, [], EIn>;
  <Input, Steps extends readonly [AnyFn, ...AnyFn[]], EIn = never>(
    input: NonFunction<Input> | SideEffect<EIn>,
    ...steps: CheckedSteps<Mode, Steps, Input>
  ): (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, Input>, Input>,
    CheckedSteps<Mode, Steps, Input>,
    EIn
  >;
  <Steps extends readonly [FromFn<any>, ...AnyFn[]]>(...steps: CheckedSteps<Mode, Steps, FirstStepInput<Steps>>): <EIn = never>(
    input?: unknown | SideEffect<EIn>
  ) => (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, FirstStepInput<Steps>>, FirstStepInput<Steps>>,
    CheckedSteps<Mode, Steps, FirstStepInput<Steps>>,
    EIn
  >;
  <Steps extends readonly [AnyFn, ...AnyFn[]]>(...steps: CheckedSteps<Mode, Steps, FirstStepInput<Steps>>): <EIn = never>(
    input: NonFunction<FirstStepInput<Steps>> | SideEffect<EIn>
  ) => (deps: DepsFor<Steps>) => PipeResult<
    Mode,
    LastReturn<CheckedSteps<Mode, Steps, FirstStepInput<Steps>>, FirstStepInput<Steps>>,
    CheckedSteps<Mode, Steps, FirstStepInput<Steps>>,
    EIn
  >;
};

type PipeWithDepsFn<Mode extends PipeMode> = Mode extends 'sideEffectStrict' | 'asyncSideEffectStrict'
  ? PipeWithDepsStrict<Mode>
  : Mode extends 'sideEffect' | 'asyncSideEffect'
    ? PipeWithDepsAny<Mode>
    : PipeWithDepsPure<Extract<Mode, 'sync' | 'async'>>;

type WrappedSteps<Steps extends readonly AnyFn[]> = {
  [Index in keyof Steps]: (value: StepInput<Steps[Index]>) => StepOutput<Steps[Index]>;
};

function pipeWithDeps(pipeFn: typeof pipeAsyncSideEffectStrict): PipeWithDepsFn<'asyncSideEffectStrict'>;
function pipeWithDeps(pipeFn: typeof pipeAsyncSideEffect): PipeWithDepsFn<'asyncSideEffect'>;
function pipeWithDeps(pipeFn: typeof pipeAsyncStrict): PipeWithDepsPureStrict<'async'>;
function pipeWithDeps(pipeFn: typeof pipeAsync): PipeWithDepsFn<'async'>;
function pipeWithDeps(pipeFn: typeof pipeSideEffectStrict): PipeWithDepsFn<'sideEffectStrict'>;
function pipeWithDeps(pipeFn: typeof pipeSideEffect): PipeWithDepsFn<'sideEffect'>;
function pipeWithDeps(pipeFn: typeof pipeStrict): PipeWithDepsPureStrict<'sync'>;
function pipeWithDeps(pipeFn: typeof pipe): PipeWithDepsFn<'sync'>;
function pipeWithDeps(pipeFn: (...args: any[]) => any) {
  return (...args: AnyFn[]) => {
    if (typeof args[0] === 'function') {
      const steps = args;
      return (input?: unknown) => (deps: unknown) => {
        const wrapped = steps.map((fn) => ((value: unknown) => fn(value, deps)) as AnyFn) as WrappedSteps<
          typeof steps
        >;
        return pipeFn(input, ...wrapped);
      };
    }

    const [input, ...steps] = args;
    return (deps: unknown) => {
      const wrapped = steps.map((fn) => ((value: unknown) => fn(value, deps)) as AnyFn) as WrappedSteps<
        typeof steps
      >;
      return pipeFn(input, ...wrapped);
    };
  };
}

export default pipeWithDeps;
