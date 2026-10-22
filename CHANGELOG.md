# Changelog

## Unreleased — Inference usability

- Stream partial applications retain source element types and sync/async mode.
  Async predicates/flatMap/accumulators require `toAsync(input)` or another async
  input; previously accepted sync input combinations could silently misbehave.
  Strings are valid stream inputs; deep flattening preserves string leaves.
  Zip operations close both inputs when consumption stops early.
- Staged conditionals infer each handler's result when supplied; type guards
  narrow branch callback inputs. `cond`/`fold` support heterogeneous results.
  `curry` supports grouped calls through every remaining 2–5 argument stage.
  `compose` rejects incompatible connections instead of returning never/any.
  `pipe`/`pipeAsync` preserve supported single-step generic relationships;
  `matchSideEffect` keeps the effect payload type in its handler.

- Object transformations preserve changed property types; shallow/deep merge model
  actual right-hand overwrite precedence instead of intersecting conflicting values.
- Nonmutating array helpers accept readonly inputs. `drop` preserves its existing
  no-op reference identity and therefore retains readonly outputs for readonly inputs.
- Optional properties work in curried `prop`/`pick`/`omit`; required `prop` reads
  no longer add undefined. Array `find` and `partition` preserve type guards.
- Nullable defaults, including empty arrays, infer from the incoming value.
- Paths and deep array flattening derive results from input types. Remove old
  output-only type arguments such as `path<string>(keys, object)` and
  `assocPath<DesiredOutput>(keys, value, object)`; use inferred calls instead.
  `flattenDeep`'s generic describes its input element, not an asserted output.
  Literal paths infer without `as const`; dynamic paths and recursion beyond the
  documented type budget remain unknown.

This entry describes development on `feat/inference-usability`; no version has
been published by this work.

## 0.15.0

### Highlights

- **Every pipe is type-safe by default.** A step whose input does not accept the previous step's output is now a compile error in `pipe`, `pipeAsync`, `pipeSideEffect` and `pipeAsyncSideEffect` — including the shape reported in [#5](https://github.com/superlucky84/fp-pack/issues/5). Previously these mismatches could silently resolve to `never` or `(input: any) => any`. Error messages name the mismatch (`PipeError<number, string>`).
- **Better inference, not worse.** Inline lambdas inside generic helpers now infer in function-first pipelines too, e.g. `pipe(double, tap((x) => x.toFixed()), addTen)` (this used to be `any`).
- **Precise SideEffect types.** `pipeSideEffect` / `pipeAsyncSideEffect` return the exact union of effects (`string | SideEffect<'NOT_FOUND' | 'INVALID'>`), or plain `T` when no step can return a `SideEffect`. `runPipeResult(result)` is therefore precise without explicit generics.
- **Four pipes instead of eight.** `pipeStrict`, `pipeAsyncStrict`, `pipeSideEffectStrict` and `pipeAsyncSideEffectStrict` are now deprecated aliases of the base pipes and will be removed in 1.0.
- **Inference without repeated annotations**, including 32 steps after the first argument and `pipeWithDeps` value parameters. Longer chains of already typed functions use a checked fallback; split longer inline chains to preserve contextual inference.
- **Equivalent wrapper guarantees.** Default and deprecated variants share the same `pipeWithDeps` inference and mismatch checks, including `from()`.
- **Optional/default pipeline inputs remain optional.**
- Verified on TypeScript 5.9.3, 6.0.3 and 7.0.2; the build toolchain stays on 5.9.
- **Working CommonJS exports.** `require('fp-pack')` and `require('fp-pack/stream')` now resolve to `.umd.cjs` bundles. Existing browser `.umd.js` paths remain available.
- **Publication checks run automatically.** `npm publish` validates types, runtime behavior, the installed tarball and documentation, and rebuilds the package with versioned AI guidance. The tarball now includes this changelog and excludes type-test declaration fixtures from `dist`.

### Migration

Pipeline execution behavior is unchanged. The pipeline changes are type-level; package entry points also repair CommonJS loading.

1. **Replace the deprecated aliases** at your convenience: `pipeStrict` → `pipe`, `pipeAsyncStrict` → `pipeAsync`, `pipeSideEffectStrict` → `pipeSideEffect`, `pipeAsyncSideEffectStrict` → `pipeAsyncSideEffect`.
2. **New compile errors expose mismatches or missing inference context** that older overloads hid. Typical fixes:
   - Function-first pipeline that starts with a generic step gives TS no input type:
     ```ts
     // before (was silently `(input: any) => any`)
     const sortedUnique = pipe(uniq, sort((a: string, b: string) => a.localeCompare(b)));
     // after (reusable function; the input anchors inference)
     const sortedUnique = (values: string[]) =>
       pipe(values, uniq, sort((a, b) => a.localeCompare(b)));
     ```
     `pipeHint` or a typed first step also works.
   - Unary pipelines called with several arguments: `pipe(range, toArray)(0, 5)` → `pipe(range(0, 5), toArray)`.
   - A `Promise`-returning step inside sync `pipe` → use `pipeAsync`.
3. **`pipeSideEffect` result types are narrower.** `T | SideEffect<any>` becomes `T | SideEffect<E>` or plain `T`. The new types are assignable to the old ones, so annotations like `const r: T | SideEffect<any> = …` keep compiling. Code that relied on `runPipeResult(...)` being `any` now gets the precise union.
4. **`pipeWithDeps`** now rejects incompatible steps for every variant, preserves precise effect types, and infers intermediate values without repeated annotations. Declare dependency contracts at the steps that use them; their intersection determines the final deps argument.
5. **Long inline chains:** contextual inference covers 32 steps after the first argument. Compose smaller pipelines beyond that boundary. The fallback no longer accepts unannotated callbacks by inventing `any`.
