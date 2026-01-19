import from from './from';
import SideEffect from './sideEffect';
import pipe from './pipe';
import pipeStrict from './pipeStrict';
import pipeWithDeps from './pipeWithDeps';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import pipeAsyncSideEffectStrict from '../async/pipeAsyncSideEffectStrict';
import pipeAsyncStrict from '../async/pipeAsyncStrict';
import pipeSideEffect from './pipeSideEffect';
import pipeSideEffectStrict from './pipeSideEffectStrict';

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

const pipeSyncStrictDeps = pipeWithDeps(pipeStrict)(
  5,
  (value: number, deps: { add: number }) => value + deps.add,
  (value: number) => `${value}`
);

type PipeSyncStrictDepsExpected = (deps: { add: number }) => string;
export type PipeSyncStrictDepsIsStrict = Expect<Equal<typeof pipeSyncStrictDeps, PipeSyncStrictDepsExpected>>;

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

const pipeSyncDepsFromWithDeps = pipeWithDeps(pipe)(
  from(5),
  (value: number) => value * 2,
  (value: number, deps: { add: number }) => value + deps.add,
  (value: number) => `${value}`
);

type PipeSyncDepsFromWithDepsExpected = (input?: unknown) => (deps: { add: number }) => string;
export type PipeSyncDepsFromWithDepsIsStrict = Expect<
  Equal<typeof pipeSyncDepsFromWithDeps, PipeSyncDepsFromWithDepsExpected>
>;

const pipeSideEffectDeps = pipeWithDeps(pipeSideEffect)((value: number) => value + 1);

type PipeSideEffectDepsExpected = (input: number | SideEffect<any>) => (deps: unknown) => number | SideEffect<any>;
export type PipeSideEffectDepsIsStrict = Expect<Extends<typeof pipeSideEffectDeps, PipeSideEffectDepsExpected>>;

const pipeSideEffectDepsFrom = pipeWithDeps(pipeSideEffect)(
  from(5),
  (value: number) => value + 1,
  (value: number, deps: { label: string }) =>
    value > 3 ? `${deps.label}:${value}` : SideEffect.of(() => 'LOW' as const)
);

type PipeSideEffectDepsFromExpected = (input?: unknown | SideEffect<any>) => (deps: { label: string }) => string | SideEffect<any>;
export type PipeSideEffectDepsFromIsStrict = Expect<
  Equal<typeof pipeSideEffectDepsFrom, PipeSideEffectDepsFromExpected>
>;

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

const pipeAsyncDepsFrom = pipeWithDeps(pipeAsyncSideEffect)(
  from(5),
  async (value: number) => value * 2,
  (value: number, deps: { label: string }) =>
    value > 3 ? `${deps.label}:${value}` : SideEffect.of(() => 'LOW' as const)
);

type PipeAsyncDepsFromExpected = (input?: unknown | SideEffect<any>) => (deps: { label: string }) => Promise<
  string | SideEffect<any>
>;
export type PipeAsyncDepsFromIsStrict = Expect<Equal<typeof pipeAsyncDepsFrom, PipeAsyncDepsFromExpected>>;

const pipeAsyncStrictDeps = pipeWithDeps(pipeAsyncStrict)(
  1,
  async (id: number, deps: Db) => deps.query(id),
  (user: { name: string }) => user.name
);

type PipeAsyncStrictDepsExpected = (deps: Db) => Promise<string>;
export type PipeAsyncStrictDepsIsStrict = Expect<Equal<typeof pipeAsyncStrictDeps, PipeAsyncStrictDepsExpected>>;

pipeWithDeps(pipeAsyncStrict)(
  from(5),
  // @ts-expect-error from() loses anchor info in pipeWithDeps + pipeAsyncStrict
  async (value: number) => value * 2,
  (value: number, deps: Logger) => {
    deps.log(`${value}`);
    return `${value}`;
  }
);

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

const strictMismatchFn1 = (id: number) => id;
const strictMismatchFn2 = (userName: string) => userName;

// @ts-expect-error mismatched types in pipeWithDeps(pipeSideEffectStrict)
pipeWithDeps(pipeSideEffectStrict)(1, strictMismatchFn1, strictMismatchFn2);

// @ts-expect-error mismatched types in pipeWithDeps(pipeAsyncSideEffectStrict)
pipeWithDeps(pipeAsyncSideEffectStrict)(1, strictMismatchFn1, strictMismatchFn2);

// @ts-expect-error mismatched types in pipeWithDeps(pipeStrict)
pipeWithDeps(pipeStrict)(1, strictMismatchFn1, strictMismatchFn2);

// @ts-expect-error mismatched types in pipeWithDeps(pipeAsyncStrict)
pipeWithDeps(pipeAsyncStrict)(1, strictMismatchFn1, strictMismatchFn2);
