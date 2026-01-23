# Core Rules

- Use `pipe`/`pipeAsync` for 2+ steps; for a single step, call the function directly.
- Use `pipeStrict`/`pipeAsyncStrict` when you want stricter mismatch detection; otherwise stick to `pipe`/`pipeAsync`.
- Prefer value-first: `pipe(value, ...)` / `pipeAsync(value, ...)` runs immediately and improves inference (the input anchors types). Use functions-first only when you need a reusable pipeline.
- If the first arg is a function, it's treated as composition; wrap function values with `from()`.
- Keep pipeline functions unary; prefer data-last, curried helpers.
- `map`/`filter` are for arrays/iterables, not single values.
- Use `from()` only for constants or 0-arg pipelines (including function values you need to pass as data). Otherwise pass data as the first argument.
- Use `pipeSideEffect*` only when you need early exit; otherwise use `pipe`/`pipeAsync`.
- Never call `runPipeResult`/`matchSideEffect` inside pipelines; call at boundaries.
- Prefer `isSideEffect` for precise narrowing; `runPipeResult` for unwrapping (use generics if widened).
- `SideEffect` is an instance type: use `SideEffect<E>` (not `typeof SideEffect`).
- If TS inference stalls in data-last generics, use `pipeHint` or a tiny wrapper.
- Use `fp-pack/stream` for large/lazy iterables; array/object utils for small/eager data.
- Keep DOM/imperative work at the edge; use fp-pack for data transforms.
- Avoid mutation; return new objects/arrays.
- When unsure, check `dist/index.d.ts` or `dist/stream/index.d.ts`.

Note: For trivial one-liners, using native JS directly is fine.
Reach for fp-pack when composition adds clarity or reuse.
Keep pipelines short and readable.
