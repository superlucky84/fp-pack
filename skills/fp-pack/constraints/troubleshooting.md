# Troubleshooting Type Errors (Fast Checks)

- Is every step unary? (Pipelines expect one input each.)
- Are you using array/iterable helpers (`map`, `filter`, `reduce`) on non-arrays?
- Did you forget a default case in `cond` (`[() => true, () => ...]`)?
- Are you returning `SideEffect` from a `pipe` pipeline? (Use `pipeSideEffect*`.)
- Are you calling `runPipeResult` inside a pipeline? (Move it to the boundary.)
- Are you mixing async steps in `pipe` instead of `pipeAsync`?
- Did a data-last generic fail to infer? (Use `pipeHint` or a tiny wrapper.)
- Are you using `from()` for constants only, not normal input?
- Is a DOM/imperative step inside the pipeline? (Move it to the edge or use `tap`.)
- Check `dist/index.d.ts` / `dist/stream/index.d.ts` for the expected signature.

If the error persists, reduce the pipeline to the smallest failing step and add types there first.
