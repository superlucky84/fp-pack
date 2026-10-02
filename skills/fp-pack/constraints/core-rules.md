# Core Rules

- Use `pipe`/`pipeAsync` for 2+ steps; for a single step, call the function directly.
- Every pipe checks each step; do not use the deprecated `*Strict` variants (`pipeStrict`, `pipeAsyncStrict`, `pipeSideEffectStrict`, `pipeAsyncSideEffectStrict`).
- Prefer value-first: `pipe(value, ...)` / `pipeAsync(value, ...)` runs immediately and improves inference (the input anchors types). Use functions-first only when you need a reusable pipeline.
- Let pipe infer intermediate parameters; do not add assertions to silence a broken chain. Contextual inference covers 32 steps after the first argument. Compose smaller pipelines beyond that limit; longer already typed chains remain checked.
- `pipeWithDeps` infers intermediate values and intersects dependency contracts. Default and deprecated variants have identical checks. Annotate the dependency contract where needed, not every value parameter.
- If the first arg is a function, it's treated as composition; wrap function values with `from()`.
- Keep pipeline functions unary; prefer data-last, curried helpers.
- `map`/`filter` are for arrays/iterables, not single values.
- Use `from()` only for constants or 0-arg pipelines (including function values you need to pass as data). Otherwise pass data as the first argument.
- Use `pipeSideEffect*` only when you need early exit; otherwise use `pipe`/`pipeAsync`.
- Never call `runPipeResult`/`matchSideEffect` inside pipelines; call at boundaries.
- Prefer `isSideEffect` for precise narrowing; `runPipeResult` for unwrapping (pipe results are precise; use generics only for values you widened yourself).
- `SideEffect` is an instance type: use `SideEffect<E>` (not `typeof SideEffect`).
- If TS inference stalls in data-last generics, use `pipeHint` or a tiny wrapper.
- Use `fp-pack/stream` for large/lazy iterables; array/object utils for small/eager data.
- Keep DOM/imperative work at the edge; use fp-pack for data transforms.
- Avoid mutation; return new objects/arrays.
- When unsure, check `dist/index.d.ts` or `dist/stream/index.d.ts`.

Note: For trivial one-liners, using native JS directly is fine.
Reach for fp-pack when composition adds clarity or reuse.
Keep pipelines short and readable.
