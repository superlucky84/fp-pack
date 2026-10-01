# Changelog

## 0.15.0 (unreleased)

### Highlights

- **Every pipe is type-safe by default.** A step whose input does not accept the previous step's output is now a compile error in `pipe`, `pipeAsync`, `pipeSideEffect` and `pipeAsyncSideEffect` — including the shape reported in [#5](https://github.com/superlucky84/fp-pack/issues/5). Previously these mismatches could silently resolve to `never` or `(input: any) => any`. Error messages name the mismatch (`PipeError<number, string>`).
- **Better inference, not worse.** Inline lambdas inside generic helpers now infer in function-first pipelines too, e.g. `pipe(double, tap((x) => x.toFixed()), addTen)` (this used to be `any`).
- **Precise SideEffect types.** `pipeSideEffect` / `pipeAsyncSideEffect` return the exact union of effects (`string | SideEffect<'NOT_FOUND' | 'INVALID'>`), or plain `T` when no step can return a `SideEffect`. `runPipeResult(result)` is therefore precise without explicit generics.
- **Four pipes instead of eight.** `pipeStrict`, `pipeAsyncStrict`, `pipeSideEffectStrict` and `pipeAsyncSideEffectStrict` are now deprecated aliases of the base pipes and will be removed in 1.0.
- Works the same on TypeScript 5.9, 6.0 and 7.0. No minimum-version change. Type-check cost is lower (about 40% fewer instantiations).

### Migration

Runtime behavior is unchanged. All changes are type-level.

1. **Replace the deprecated aliases** at your convenience: `pipeStrict` → `pipe`, `pipeAsyncStrict` → `pipeAsync`, `pipeSideEffectStrict` → `pipeSideEffect`, `pipeAsyncSideEffectStrict` → `pipeAsyncSideEffect`.
2. **New compile errors are real mismatches** that 0.14 hid. Typical fixes:
   - Function-first pipeline that starts with a generic step gives TS no input type:
     ```ts
     // before (was silently `(input: any) => any`)
     const sortedUnique = pipe(uniq, sort((a: string, b: string) => a.localeCompare(b)));
     // after
     const sortedUnique = (values: string[]) => pipe(values, uniq, sort((a, b) => a.localeCompare(b)));
     ```
     `pipeHint` or a typed first step also works.
   - Unary pipelines called with several arguments: `pipe(range, toArray)(0, 5)` → `pipe(range(0, 5), toArray)`.
   - A `Promise`-returning step inside sync `pipe` → use `pipeAsync`.
3. **`pipeSideEffect` result types are narrower.** `T | SideEffect<any>` becomes `T | SideEffect<E>` or plain `T`. The new types are assignable to the old ones, so annotations like `const r: T | SideEffect<any> = …` keep compiling. Code that relied on `runPipeResult(...)` being `any` now gets the precise union.
4. **`pipeWithDeps(pipeSideEffect)` / `pipeWithDeps(pipeAsyncSideEffect)`** return precise effect types as well.
