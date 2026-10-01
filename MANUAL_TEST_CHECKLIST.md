# MANUAL TEST CHECKLIST — Pipe Soundness Release (0.15.0)

Run these in a fresh consumer project that installs the packed tarball (`npm pack`), in VS Code, once with TS 5.9 and once with TS 7.0 (select the workspace TS version).
Pass = every row behaves as described. Any deviation fails the release.

| ID | Check | Steps | Pass criteria |
|----|-------|-------|---------------|
| MT-1 | Issue #5 reproduction | `const fn1 = (id: number) => id; const fn2 = (s: string) => s; pipe(1, fn1, fn2);` and the same with `pipeAsync`, `pipeSideEffect`, `pipeAsyncSideEffect`, `pipeSideEffectStrict` | Red squiggle on every call. Nothing resolves to `never` or `any` on hover |
| MT-2 | Error readability (data-first) | Hover or read the error for MT-1 `pipe` | The message mentions `PipeError<number, string>` |
| MT-3 | Error readability (function-first) | `pipe(fn1, fn2)` | It errors. The message text matches whatever DC-3 decided |
| MT-4 | Inline DX unchanged | `pipe(1, x => x + 1, x => \`${x}\`, s => s.length)` | No error. Every lambda param hover shows the concrete type. The result is `number` |
| MT-5 | Inline → predefined | `pipe(1, x => x.toString(), (s: string) => s.length)` | No error. The result is `number` |
| MT-6 | Subtype input (former bug) | `pipe({ a: 1, b: 2 }, (o: { a: number }) => o.a)` | No error. The result is `number` (it was `never` in 0.14) |
| MT-7 | Curried utils | `pipe([1, 2, 3], map(x => x * 2), filter(x => x > 2), sortBy(x => -x))` | No error. `x` hovers show `number`. The result is `number[]` |
| MT-8 | 11+ steps | An 11-step valid chain, then the same chain with one mismatched step | Valid: correct result type. Mismatched: error |
| MT-9 | Deprecated aliases | `pipeStrict(1, fn1, fn2)`, and `pipeStrict` on a valid chain | Same behavior as `pipe`. The IDE shows strikethrough with the `@deprecated` note |
| MT-10 | SideEffect precision | `pipeSideEffect` with two steps returning different `SideEffect.of(() => 'A' as const)` / `'B'`, and one with no effect-returning step | The first hover shows `T \| SideEffect<'A' \| 'B'>`; the effect-free one shows plain `T` |
| MT-11 | `pipeWithDeps` | `pipeWithDeps(pipe)`, `pipeWithDeps(pipeSideEffect)`, `pipeWithDeps(pipeAsyncSideEffectStrict)` with a deps-using step | Each returns the documented curried `(deps) => …` shape. Deps are intersected |
| MT-12 | Runtime unchanged | Run the README examples in Node (ESM and the UMD build) | Same outputs as 0.14.0. `Object.keys(pipe)` is empty (brands are non-enumerable) |
| MT-13 | `fp-pack/stream` entry | Import from `fp-pack/stream` and type-check a pipe using stream utils | No new errors |
| MT-14 | Docs site | `pnpm docs:dev`. Open the Pipe Choice Guide, pipe, pipeStrict, and pipeAsync pages (EN/KO) | The guidance matches the new model. No dead links |
| MT-15 | Function-first + generic helper | `pipe(double, tap((x) => x.toFixed()), addTen)` and `pipe(zip(timestamps(), events()), filter(([e]) => e.type === 'click'), toArray)` | No error. `x` hovers as `number`, `e` as the event type |
| MT-16 | `any` input | `pipe(anyValue, (v) => v.length as number)` | Result is `number`, not a function type |
| MT-17 | Generic-first function-first (migration) | `pipe(uniq, sort(...))` | Reports an error. The CHANGELOG fix (`(values: string[]) => pipe(values, uniq, …)`) compiles |

Sign-off: ______ (date / TS versions tested / commit SHA)
