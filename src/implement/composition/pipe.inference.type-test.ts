import pipe from './pipe';
import pipeAsync from '../async/pipeAsync';
import pipeSideEffect from './pipeSideEffect';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import pipeStrict from './pipeStrict';
import pipeAsyncStrict from '../async/pipeAsyncStrict';
import pipeSideEffectStrict from './pipeSideEffectStrict';
import pipeAsyncSideEffectStrict from '../async/pipeAsyncSideEffectStrict';
import pipeWithDeps from './pipeWithDeps';
import from from './from';
import SideEffect from './sideEffect';
import tap from './tap';
import map from '../array/map';
import filter from '../array/filter';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;
const numId = (n: number) => n;
const strLower = (s: string) => s.toLowerCase();

// Each invalid chain has a positive counterpart that must retain a precise type.
export const pipeLong11 = pipe(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x.toFixed());
export type pipeLong11Exact = Expect<Equal<typeof pipeLong11, string>>;
// @ts-expect-error an inferred identity must not hide a number-to-string mismatch
pipe(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
export const pipeLong32 = pipe(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x.toFixed());
export type pipeLong32Exact = Expect<Equal<typeof pipeLong32, string>>;
// @ts-expect-error an inferred identity must not hide a number-to-string mismatch
pipe(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
export const pipeOptional = pipe((n?: number) => n ?? 0, n => n.toFixed())();
export type pipeOptionalExact = Expect<Equal<typeof pipeOptional, string>>;
export const pipeDefault = pipe((n = 0) => n, n => n.toFixed())();
export type pipeDefaultExact = Expect<Equal<typeof pipeDefault, string>>;
export const pipeLongFrom = pipe(from(1), numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId)();
// @ts-expect-error a fallback must reject missing contextual input, not infer any
pipe(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);

export const pipeAsyncLong11 = pipeAsync(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x.toFixed());
export type pipeAsyncLong11Exact = Expect<Equal<typeof pipeAsyncLong11, Promise<string>>>;
// @ts-expect-error an inferred identity must not hide a number-to-string mismatch
pipeAsync(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
export const pipeAsyncLong32 = pipeAsync(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x.toFixed());
export type pipeAsyncLong32Exact = Expect<Equal<typeof pipeAsyncLong32, Promise<string>>>;
// @ts-expect-error an inferred identity must not hide a number-to-string mismatch
pipeAsync(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
export const pipeAsyncOptional = pipeAsync((n?: number) => n ?? 0, n => n.toFixed())();
export type pipeAsyncOptionalExact = Expect<Equal<typeof pipeAsyncOptional, Promise<string>>>;
export const pipeAsyncDefault = pipeAsync((n = 0) => n, n => n.toFixed())();
export type pipeAsyncDefaultExact = Expect<Equal<typeof pipeAsyncDefault, Promise<string>>>;
export const pipeAsyncLongFrom = pipeAsync(from(1), numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId)();
// @ts-expect-error a fallback must reject missing contextual input, not infer any
pipeAsync(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);

export const pipeSideEffectLong11 = pipeSideEffect(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x.toFixed());
export type pipeSideEffectLong11Exact = Expect<Equal<typeof pipeSideEffectLong11, string>>;
// @ts-expect-error an inferred identity must not hide a number-to-string mismatch
pipeSideEffect(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
export const pipeSideEffectLong32 = pipeSideEffect(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x.toFixed());
export type pipeSideEffectLong32Exact = Expect<Equal<typeof pipeSideEffectLong32, string>>;
// @ts-expect-error an inferred identity must not hide a number-to-string mismatch
pipeSideEffect(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
export const pipeSideEffectOptional = pipeSideEffect((n?: number) => n ?? 0, n => n.toFixed())();
export type pipeSideEffectOptionalExact = Expect<Equal<typeof pipeSideEffectOptional, string>>;
export const pipeSideEffectDefault = pipeSideEffect((n = 0) => n, n => n.toFixed())();
export type pipeSideEffectDefaultExact = Expect<Equal<typeof pipeSideEffectDefault, string>>;
export const pipeSideEffectLongFrom = pipeSideEffect(from(1), numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId)();
// @ts-expect-error a fallback must reject missing contextual input, not infer any
pipeSideEffect(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);

export const pipeAsyncSideEffectLong11 = pipeAsyncSideEffect(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x.toFixed());
export type pipeAsyncSideEffectLong11Exact = Expect<Equal<typeof pipeAsyncSideEffectLong11, Promise<string>>>;
// @ts-expect-error an inferred identity must not hide a number-to-string mismatch
pipeAsyncSideEffect(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
export const pipeAsyncSideEffectLong32 = pipeAsyncSideEffect(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x.toFixed());
export type pipeAsyncSideEffectLong32Exact = Expect<Equal<typeof pipeAsyncSideEffectLong32, Promise<string>>>;
// @ts-expect-error an inferred identity must not hide a number-to-string mismatch
pipeAsyncSideEffect(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
export const pipeAsyncSideEffectOptional = pipeAsyncSideEffect((n?: number) => n ?? 0, n => n.toFixed())();
export type pipeAsyncSideEffectOptionalExact = Expect<Equal<typeof pipeAsyncSideEffectOptional, Promise<string>>>;
export const pipeAsyncSideEffectDefault = pipeAsyncSideEffect((n = 0) => n, n => n.toFixed())();
export type pipeAsyncSideEffectDefaultExact = Expect<Equal<typeof pipeAsyncSideEffectDefault, Promise<string>>>;
export const pipeAsyncSideEffectLongFrom = pipeAsyncSideEffect(from(1), numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId)();
// @ts-expect-error a fallback must reject missing contextual input, not infer any
pipeAsyncSideEffect(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);

export const pipeDeps = pipeWithDeps(pipe)(
  1,
  (x, deps: { add: number }) => x + deps.add,
  x => x.toFixed(),
  (s, deps: { suffix: string }) => s + deps.suffix
);
export type pipeDepsExact = Expect<Equal<ReturnType<typeof pipeDeps>, string>>;
pipeDeps({ add: 1, suffix: '!' });
// @ts-expect-error the dependency intersection must include suffix
pipeDeps({ add: 1 });
// @ts-expect-error default and deprecated wrappers must reject mismatched steps
pipeWithDeps(pipe)(1, numId, strLower);
// @ts-expect-error from() must not bypass step checks
pipeWithDeps(pipe)(from(1), numId, strLower);
export const pipeDepsFrom = pipeWithDeps(pipe)(from(1), x => x + 1, x => x.toFixed())()({});
export type pipeDepsFromExact = Expect<Equal<typeof pipeDepsFrom, string>>;
// @ts-expect-error the unannotated value parameter must be number
pipeWithDeps(pipe)(1, x => x + 1, x => x.toLowerCase());
export const pipeAsyncDeps = pipeWithDeps(pipeAsync)(
  1,
  (x, deps: { add: number }) => x + deps.add,
  x => x.toFixed(),
  (s, deps: { suffix: string }) => s + deps.suffix
);
export type pipeAsyncDepsExact = Expect<Equal<ReturnType<typeof pipeAsyncDeps>, Promise<string>>>;
pipeAsyncDeps({ add: 1, suffix: '!' });
// @ts-expect-error the dependency intersection must include suffix
pipeAsyncDeps({ add: 1 });
// @ts-expect-error default and deprecated wrappers must reject mismatched steps
pipeWithDeps(pipeAsync)(1, numId, strLower);
// @ts-expect-error from() must not bypass step checks
pipeWithDeps(pipeAsync)(from(1), numId, strLower);
export const pipeAsyncDepsFrom = pipeWithDeps(pipeAsync)(from(1), x => x + 1, x => x.toFixed())()({});
export type pipeAsyncDepsFromExact = Expect<Equal<typeof pipeAsyncDepsFrom, Promise<string>>>;
// @ts-expect-error the unannotated value parameter must be number
pipeWithDeps(pipeAsync)(1, x => x + 1, x => x.toLowerCase());
export const pipeSideEffectDeps = pipeWithDeps(pipeSideEffect)(
  1,
  (x, deps: { add: number }) => x + deps.add,
  x => x.toFixed(),
  (s, deps: { suffix: string }) => s + deps.suffix
);
export type pipeSideEffectDepsExact = Expect<Equal<ReturnType<typeof pipeSideEffectDeps>, string>>;
pipeSideEffectDeps({ add: 1, suffix: '!' });
// @ts-expect-error the dependency intersection must include suffix
pipeSideEffectDeps({ add: 1 });
// @ts-expect-error default and deprecated wrappers must reject mismatched steps
pipeWithDeps(pipeSideEffect)(1, numId, strLower);
// @ts-expect-error from() must not bypass step checks
pipeWithDeps(pipeSideEffect)(from(1), numId, strLower);
export const pipeSideEffectDepsFrom = pipeWithDeps(pipeSideEffect)(from(1), x => x + 1, x => x.toFixed())()({});
export type pipeSideEffectDepsFromExact = Expect<Equal<typeof pipeSideEffectDepsFrom, string>>;
// @ts-expect-error the unannotated value parameter must be number
pipeWithDeps(pipeSideEffect)(1, x => x + 1, x => x.toLowerCase());
export const pipeAsyncSideEffectDeps = pipeWithDeps(pipeAsyncSideEffect)(
  1,
  (x, deps: { add: number }) => x + deps.add,
  x => x.toFixed(),
  (s, deps: { suffix: string }) => s + deps.suffix
);
export type pipeAsyncSideEffectDepsExact = Expect<Equal<ReturnType<typeof pipeAsyncSideEffectDeps>, Promise<string>>>;
pipeAsyncSideEffectDeps({ add: 1, suffix: '!' });
// @ts-expect-error the dependency intersection must include suffix
pipeAsyncSideEffectDeps({ add: 1 });
// @ts-expect-error default and deprecated wrappers must reject mismatched steps
pipeWithDeps(pipeAsyncSideEffect)(1, numId, strLower);
// @ts-expect-error from() must not bypass step checks
pipeWithDeps(pipeAsyncSideEffect)(from(1), numId, strLower);
export const pipeAsyncSideEffectDepsFrom = pipeWithDeps(pipeAsyncSideEffect)(from(1), x => x + 1, x => x.toFixed())()({});
export type pipeAsyncSideEffectDepsFromExact = Expect<Equal<typeof pipeAsyncSideEffectDepsFrom, Promise<string>>>;
// @ts-expect-error the unannotated value parameter must be number
pipeWithDeps(pipeAsyncSideEffect)(1, x => x + 1, x => x.toLowerCase());
export const pipeStrictDeps = pipeWithDeps(pipeStrict)(
  1,
  (x, deps: { add: number }) => x + deps.add,
  x => x.toFixed(),
  (s, deps: { suffix: string }) => s + deps.suffix
);
export type pipeStrictDepsExact = Expect<Equal<ReturnType<typeof pipeStrictDeps>, string>>;
pipeStrictDeps({ add: 1, suffix: '!' });
// @ts-expect-error the dependency intersection must include suffix
pipeStrictDeps({ add: 1 });
// @ts-expect-error default and deprecated wrappers must reject mismatched steps
pipeWithDeps(pipeStrict)(1, numId, strLower);
// @ts-expect-error from() must not bypass step checks
pipeWithDeps(pipeStrict)(from(1), numId, strLower);
export const pipeStrictDepsFrom = pipeWithDeps(pipeStrict)(from(1), x => x + 1, x => x.toFixed())()({});
export type pipeStrictDepsFromExact = Expect<Equal<typeof pipeStrictDepsFrom, string>>;
// @ts-expect-error the unannotated value parameter must be number
pipeWithDeps(pipeStrict)(1, x => x + 1, x => x.toLowerCase());
export const pipeAsyncStrictDeps = pipeWithDeps(pipeAsyncStrict)(
  1,
  (x, deps: { add: number }) => x + deps.add,
  x => x.toFixed(),
  (s, deps: { suffix: string }) => s + deps.suffix
);
export type pipeAsyncStrictDepsExact = Expect<Equal<ReturnType<typeof pipeAsyncStrictDeps>, Promise<string>>>;
pipeAsyncStrictDeps({ add: 1, suffix: '!' });
// @ts-expect-error the dependency intersection must include suffix
pipeAsyncStrictDeps({ add: 1 });
// @ts-expect-error default and deprecated wrappers must reject mismatched steps
pipeWithDeps(pipeAsyncStrict)(1, numId, strLower);
// @ts-expect-error from() must not bypass step checks
pipeWithDeps(pipeAsyncStrict)(from(1), numId, strLower);
export const pipeAsyncStrictDepsFrom = pipeWithDeps(pipeAsyncStrict)(from(1), x => x + 1, x => x.toFixed())()({});
export type pipeAsyncStrictDepsFromExact = Expect<Equal<typeof pipeAsyncStrictDepsFrom, Promise<string>>>;
// @ts-expect-error the unannotated value parameter must be number
pipeWithDeps(pipeAsyncStrict)(1, x => x + 1, x => x.toLowerCase());
export const pipeSideEffectStrictDeps = pipeWithDeps(pipeSideEffectStrict)(
  1,
  (x, deps: { add: number }) => x + deps.add,
  x => x.toFixed(),
  (s, deps: { suffix: string }) => s + deps.suffix
);
export type pipeSideEffectStrictDepsExact = Expect<Equal<ReturnType<typeof pipeSideEffectStrictDeps>, string>>;
pipeSideEffectStrictDeps({ add: 1, suffix: '!' });
// @ts-expect-error the dependency intersection must include suffix
pipeSideEffectStrictDeps({ add: 1 });
// @ts-expect-error default and deprecated wrappers must reject mismatched steps
pipeWithDeps(pipeSideEffectStrict)(1, numId, strLower);
// @ts-expect-error from() must not bypass step checks
pipeWithDeps(pipeSideEffectStrict)(from(1), numId, strLower);
export const pipeSideEffectStrictDepsFrom = pipeWithDeps(pipeSideEffectStrict)(from(1), x => x + 1, x => x.toFixed())()({});
export type pipeSideEffectStrictDepsFromExact = Expect<Equal<typeof pipeSideEffectStrictDepsFrom, string>>;
// @ts-expect-error the unannotated value parameter must be number
pipeWithDeps(pipeSideEffectStrict)(1, x => x + 1, x => x.toLowerCase());
export const pipeAsyncSideEffectStrictDeps = pipeWithDeps(pipeAsyncSideEffectStrict)(
  1,
  (x, deps: { add: number }) => x + deps.add,
  x => x.toFixed(),
  (s, deps: { suffix: string }) => s + deps.suffix
);
export type pipeAsyncSideEffectStrictDepsExact = Expect<Equal<ReturnType<typeof pipeAsyncSideEffectStrictDeps>, Promise<string>>>;
pipeAsyncSideEffectStrictDeps({ add: 1, suffix: '!' });
// @ts-expect-error the dependency intersection must include suffix
pipeAsyncSideEffectStrictDeps({ add: 1 });
// @ts-expect-error default and deprecated wrappers must reject mismatched steps
pipeWithDeps(pipeAsyncSideEffectStrict)(1, numId, strLower);
// @ts-expect-error from() must not bypass step checks
pipeWithDeps(pipeAsyncSideEffectStrict)(from(1), numId, strLower);
export const pipeAsyncSideEffectStrictDepsFrom = pipeWithDeps(pipeAsyncSideEffectStrict)(from(1), x => x + 1, x => x.toFixed())()({});
export type pipeAsyncSideEffectStrictDepsFromExact = Expect<Equal<typeof pipeAsyncSideEffectStrictDepsFrom, Promise<string>>>;
// @ts-expect-error the unannotated value parameter must be number
pipeWithDeps(pipeAsyncSideEffectStrict)(1, x => x + 1, x => x.toLowerCase());

export const curried = pipeWithDeps(pipe)([1, 2, 3], map(x => x * 2), filter(x => x > 2), xs => xs.length)({});
export type CurriedExact = Expect<Equal<typeof curried, number>>;

export const pipeDepsFunction = pipeWithDeps(pipe)((n: number, deps: { add: number }) => n + deps.add, tap(x => x.toFixed()), x => x * 2);
export const pipeDepsFunctionValue = pipeDepsFunction(1)({ add: 1 });
export type pipeDepsFunctionExact = Expect<Equal<typeof pipeDepsFunctionValue, number>>;
export const pipeDepsOptional = pipeWithDeps(pipe)((n = 0) => n, n => n + 1)()({});
export type pipeDepsOptionalExact = Expect<Equal<typeof pipeDepsOptional, number>>;
export const pipeDepsLong = pipeWithDeps(pipe)(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1)({});
export type pipeDepsLongExact = Expect<Equal<typeof pipeDepsLong, number>>;
export const pipeDepsFallback = pipeWithDeps(pipe)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId)({});
export type pipeDepsFallbackExact = Expect<Equal<typeof pipeDepsFallback, number>>;
// @ts-expect-error the typed fallback still checks adjacent steps
pipeWithDeps(pipe)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, strLower);
// @ts-expect-error fallback callbacks must not acquire contextual any
pipeWithDeps(pipe)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
const pipeWrapper = pipeWithDeps(pipe);
const pipeAliasWrapper = pipeWithDeps(pipeStrict);
export type pipeAliasEquivalent = Expect<Equal<typeof pipeWrapper, typeof pipeAliasWrapper>>;

export const pipeAsyncDepsFunction = pipeWithDeps(pipeAsync)((n: number, deps: { add: number }) => n + deps.add, tap(x => x.toFixed()), x => x * 2);
export const pipeAsyncDepsFunctionValue = pipeAsyncDepsFunction(1)({ add: 1 });
export type pipeAsyncDepsFunctionExact = Expect<Equal<typeof pipeAsyncDepsFunctionValue, Promise<number>>>;
export const pipeAsyncDepsOptional = pipeWithDeps(pipeAsync)((n = 0) => n, n => n + 1)()({});
export type pipeAsyncDepsOptionalExact = Expect<Equal<typeof pipeAsyncDepsOptional, Promise<number>>>;
export const pipeAsyncDepsLong = pipeWithDeps(pipeAsync)(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1)({});
export type pipeAsyncDepsLongExact = Expect<Equal<typeof pipeAsyncDepsLong, Promise<number>>>;
export const pipeAsyncDepsFallback = pipeWithDeps(pipeAsync)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId)({});
export type pipeAsyncDepsFallbackExact = Expect<Equal<typeof pipeAsyncDepsFallback, Promise<number>>>;
// @ts-expect-error the typed fallback still checks adjacent steps
pipeWithDeps(pipeAsync)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, strLower);
// @ts-expect-error fallback callbacks must not acquire contextual any
pipeWithDeps(pipeAsync)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
const pipeAsyncWrapper = pipeWithDeps(pipeAsync);
const pipeAsyncAliasWrapper = pipeWithDeps(pipeAsyncStrict);
export type pipeAsyncAliasEquivalent = Expect<Equal<typeof pipeAsyncWrapper, typeof pipeAsyncAliasWrapper>>;

export const pipeSideEffectDepsFunction = pipeWithDeps(pipeSideEffect)((n: number, deps: { add: number }) => n + deps.add, tap(x => x.toFixed()), x => x * 2);
export const pipeSideEffectDepsFunctionValue = pipeSideEffectDepsFunction(1)({ add: 1 });
export type pipeSideEffectDepsFunctionExact = Expect<Equal<typeof pipeSideEffectDepsFunctionValue, number>>;
export const pipeSideEffectDepsOptional = pipeWithDeps(pipeSideEffect)((n = 0) => n, n => n + 1)()({});
export type pipeSideEffectDepsOptionalExact = Expect<Equal<typeof pipeSideEffectDepsOptional, number>>;
export const pipeSideEffectDepsLong = pipeWithDeps(pipeSideEffect)(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1)({});
export type pipeSideEffectDepsLongExact = Expect<Equal<typeof pipeSideEffectDepsLong, number>>;
export const pipeSideEffectDepsFallback = pipeWithDeps(pipeSideEffect)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId)({});
export type pipeSideEffectDepsFallbackExact = Expect<Equal<typeof pipeSideEffectDepsFallback, number>>;
// @ts-expect-error the typed fallback still checks adjacent steps
pipeWithDeps(pipeSideEffect)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, strLower);
// @ts-expect-error fallback callbacks must not acquire contextual any
pipeWithDeps(pipeSideEffect)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
const pipeSideEffectWrapper = pipeWithDeps(pipeSideEffect);
const pipeSideEffectAliasWrapper = pipeWithDeps(pipeSideEffectStrict);
export type pipeSideEffectAliasEquivalent = Expect<Equal<typeof pipeSideEffectWrapper, typeof pipeSideEffectAliasWrapper>>;

export const pipeAsyncSideEffectDepsFunction = pipeWithDeps(pipeAsyncSideEffect)((n: number, deps: { add: number }) => n + deps.add, tap(x => x.toFixed()), x => x * 2);
export const pipeAsyncSideEffectDepsFunctionValue = pipeAsyncSideEffectDepsFunction(1)({ add: 1 });
export type pipeAsyncSideEffectDepsFunctionExact = Expect<Equal<typeof pipeAsyncSideEffectDepsFunctionValue, Promise<number>>>;
export const pipeAsyncSideEffectDepsOptional = pipeWithDeps(pipeAsyncSideEffect)((n = 0) => n, n => n + 1)()({});
export type pipeAsyncSideEffectDepsOptionalExact = Expect<Equal<typeof pipeAsyncSideEffectDepsOptional, Promise<number>>>;
export const pipeAsyncSideEffectDepsLong = pipeWithDeps(pipeAsyncSideEffect)(1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1, x => x + 1)({});
export type pipeAsyncSideEffectDepsLongExact = Expect<Equal<typeof pipeAsyncSideEffectDepsLong, Promise<number>>>;
export const pipeAsyncSideEffectDepsFallback = pipeWithDeps(pipeAsyncSideEffect)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId)({});
export type pipeAsyncSideEffectDepsFallbackExact = Expect<Equal<typeof pipeAsyncSideEffectDepsFallback, Promise<number>>>;
// @ts-expect-error the typed fallback still checks adjacent steps
pipeWithDeps(pipeAsyncSideEffect)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, strLower);
// @ts-expect-error fallback callbacks must not acquire contextual any
pipeWithDeps(pipeAsyncSideEffect)(1, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, x => x, strLower);
const pipeAsyncSideEffectWrapper = pipeWithDeps(pipeAsyncSideEffect);
const pipeAsyncSideEffectAliasWrapper = pipeWithDeps(pipeAsyncSideEffectStrict);
export type pipeAsyncSideEffectAliasEquivalent = Expect<Equal<typeof pipeAsyncSideEffectWrapper, typeof pipeAsyncSideEffectAliasWrapper>>;

declare const effectInput: number | SideEffect<'INPUT'>;
export const depsEffects = pipeWithDeps(pipeAsyncSideEffect)(effectInput,
  async n => n > 0 ? n : SideEffect.of(() => 'LOW' as const),
  n => n > 10 ? SideEffect.of(() => 0 as const) : n.toFixed()
)({});
export type DepsEffectsExact = Expect<Equal<typeof depsEffects, Promise<string | SideEffect<'INPUT' | 'LOW' | 0>>>>;
// @ts-expect-error a union input cannot be passed to a narrower first step
pipeWithDeps(pipe)(1 as number | string, numId);
// @ts-expect-error readonly input must not acquire mutable-array operations
pipeWithDeps(pipe)([1, 2] as readonly number[], (xs: number[]) => xs.push(3));
export const pipeSideEffectFallbackEffects = pipeSideEffect(effectInput, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId);
export type pipeSideEffectFallbackEffectsExact = Expect<Equal<typeof pipeSideEffectFallbackEffects, number | SideEffect<'INPUT'>>>;
export const pipeAsyncSideEffectFallbackEffects = pipeAsyncSideEffect(effectInput, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId, numId);
export type pipeAsyncSideEffectFallbackEffectsExact = Expect<Equal<typeof pipeAsyncSideEffectFallbackEffects, Promise<number | SideEffect<'INPUT'>>>>;

export const optionalWithDependency = pipeWithDeps(pipe)((n = 0, deps: { add: number }) => n + deps.add)()({ add: 1 });
export type OptionalWithDependencyExact = Expect<Equal<typeof optionalWithDependency, number>>;
