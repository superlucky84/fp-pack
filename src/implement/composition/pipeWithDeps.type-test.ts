import from from './from';
import SideEffect from './sideEffect';
import pipe from './pipe';
import pipeWithDeps from './pipeWithDeps';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import pipeSideEffect from './pipeSideEffect';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Extends<A, B> = A extends B ? true : false;
type Expect<T extends true> = T;

type Db = {
  query: (id: number) => Promise<{ name: string }>;
};

type Logger = {
  log: (message: string) => void;
};

const pipeSyncDeps = pipeWithDeps(pipe)(
  5,
  (value: number, deps: { add: number }) => value + deps.add,
  (value: number) => `${value}`
);

type PipeSyncDepsExpected = (deps: { add: number }) => string;
export type PipeSyncDepsIsStrict = Expect<Equal<typeof pipeSyncDeps, PipeSyncDepsExpected>>;

const pipeSyncDepsDataLast = pipeWithDeps(pipe)(
  (value: number, deps: { add: number }) => value + deps.add,
  (value: number) => `${value}`
);

type PipeSyncDepsDataLastExpected = (input: number) => (deps: { add: number }) => string;
export type PipeSyncDepsDataLastIsStrict = Expect<
  Extends<typeof pipeSyncDepsDataLast, PipeSyncDepsDataLastExpected>
>;

const pipeSyncDepsFrom = pipeWithDeps(pipe)(
  from(5),
  (value: number) => value * 2
);

type PipeSyncDepsFromExpected = (input?: unknown) => (deps: unknown) => number;
export type PipeSyncDepsFromIsStrict = Expect<Equal<typeof pipeSyncDepsFrom, PipeSyncDepsFromExpected>>;

const pipeSideEffectDeps = pipeWithDeps(pipeSideEffect)((value: number) => value + 1);

type PipeSideEffectDepsExpected = (input: number | SideEffect<any>) => (deps: unknown) => number | SideEffect<any>;
export type PipeSideEffectDepsIsStrict = Expect<Extends<typeof pipeSideEffectDeps, PipeSideEffectDepsExpected>>;

const pipeAsyncDeps = pipeWithDeps(pipeAsyncSideEffect)(
  1,
  async (id: number, deps: Db) => deps.query(id),
  (user: { name: string }) => user.name,
  (name: string, deps: Logger) => {
    deps.log(name);
    return name.length;
  }
);

type PipeAsyncDepsExpected = (deps: Db & Logger) => Promise<number | SideEffect<any>>;
export type PipeAsyncDepsIsStrict = Expect<Equal<typeof pipeAsyncDeps, PipeAsyncDepsExpected>>;

const pipeAsyncDepsDataLast = pipeWithDeps(pipeAsyncSideEffect)(
  async (id: number, deps: Db) => deps.query(id),
  (user: { name: string }) => user.name,
  (name: string, deps: Logger) => {
    deps.log(name);
    return name.length;
  }
);

type PipeAsyncDepsDataLastExpected = (input: number) => (deps: Db & Logger) => Promise<number | SideEffect<any>>;
export type PipeAsyncDepsDataLastIsStrict = Expect<
  Extends<typeof pipeAsyncDepsDataLast, PipeAsyncDepsDataLastExpected>
>;
