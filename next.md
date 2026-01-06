# Next: pipe type refinement (targeted validation)

## Goal
- Keep inference friendly (contextual typing survives).
- Fail at the exact mismatched function position.
- Avoid "never swallow" for mismatches.

## Current state
- `PipeCheck` is applied on the whole tuple, which can degrade inference.
- Strict versions now fail fast but require more explicit typing in tests.
- `pipeAsyncSideEffect` uses `FirstAsyncOrSync` to avoid `from(...)` matching unary overloads.

## Proposed direction (Targeted Parameter Validation)
- Move validation from tuple-level recursion to per-parameter checks in overloads.
- Validate "actual function type" against the expected input.
- Use `NoInfer` to prevent reverse inference from later functions.

### Suggested types
```ts
type PipeError<From, To> = { __pipe_error: ['pipe', From, '->', To] };
type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnOutput<F> = F extends (...args: any[]) => infer R ? R : never;
type NoInfer<T> = [T][T extends any ? 0 : never];

type ValidateFn<Fn, Expected> =
  [FnInput<Fn>] extends [NoInfer<Expected>]
    ? Fn
    : Fn & PipeError<Expected, FnInput<Fn>>;
```

### Overload pattern (example)
```ts
function pipe<B, C, R>(
  ab: (a: B) => C,
  bc: ValidateFn<(b: C) => R, C>
): (a: B) => R;
```

## Notes / pitfalls
- Validation must use the *actual function type* (`FnInput<Fn>`), not a pre-fixed `(a: B) => C`.
- This is a tradeoff: inference improves, but some curried/HOF cases still need `pipeHint`.
- Keep `PipeCheck` only for the generic fallback overload (variadic).

## Candidate test cases
- `zip`, `groupBy`, `sortBy`, `uniqBy` in `pipe` and `pipeSideEffect*`.
- `retry`, `timeout`, `debounce`, `throttle` in async pipelines.
- `match`, `replace`, `split`, `equals` in string/equality pipelines.

## Files to update
- `src/implement/composition/pipe.ts`
- `src/implement/composition/pipeSideEffect.ts`
- `src/implement/composition/pipeSideEffectStrict.ts`
- `src/implement/async/pipeAsync.ts`
- `src/implement/async/pipeAsyncSideEffect.ts`
- `src/implement/async/pipeAsyncSideEffectStrict.ts`
- Type tests in `src/implement/composition/*.type-test.ts`
