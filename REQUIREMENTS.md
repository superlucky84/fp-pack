# REQUIREMENTS — Pipe Soundness & Variant Consolidation

Status: **Accepted — 4-pipe model (DC-2 = B), implemented on `feat/pipe-soundness`**
Owner: superlucky84
Related: [Issue #5](https://github.com/superlucky84/fp-pack/issues/5), `DESIGN.md` § Pipe Soundness Revision, `IMPLEMENT.md`, `MANUAL_TEST_CHECKLIST.md`
Supersedes: `next.md` (targeted-validation idea; its findings are folded in here)

## 1. Background

Issue #5 reported that `pipeSideEffectStrict(1, fn1, fn2)` (with `fn1: (id: number) => number` and `fn2: (s: string) => string`) compiles. The v0.12.1/v0.13.0 response added `pipeStrict` / `pipeAsyncStrict` and documented the gap as a fundamental TypeScript limitation (`DESIGN.md` § Design Trade-offs and § Completeness Statement).

Research on 2026-10-01 against TypeScript 5.9.3, 6.0.3, and 7.0.2 showed:

- **TS 7 does not change type inference.** TS 7.0 claims type-checking parity with 6.0. The only type-level change is Unicode handling in template literal types. TS 6.0's change (`this`-less methods no longer count as context-sensitive) does not affect arrow-function pipe steps. All baseline probes gave identical results on 5.9, 6.0, and 7.0.
- **The mismatch leak is not an inference limitation. It comes from the overload set.** When the typed overloads correctly reject a mismatched call, resolution falls through to the variadic fallback overloads:
  - The data-first fallback (`...funcs: PipeCheckWithInput<A, Fns>`) wraps `Fns` in a conditional type. Inference fails, so the call resolves to `never` instead of an error.
  - The untyped catch-all (`(...funcs: Array<UnaryFn<any, any>>) => (input: any) => any`) accepts any function-first chain.
- A second, independent bug: `pipe({ a: 1, b: 2 }, (o: { a: number }) => o.a)` returns `never` (it should be `number`). The cause: `A` gets inferred from the first step's parameter, which triggers an excess-property failure.

## 2. Goals

- G1. The default `pipe`, `pipeAsync`, `pipeSideEffect`, and `pipeAsyncSideEffect` reject every step-to-step type mismatch at compile time, with no silent `never` or `any` results.
- G2. Keep the current inference DX: inline lambdas, inline→predefined, predefined→inline, curried generic utilities (`map`, `filter`, `prop`, `sortBy`, `zip`, …), `from()`, and zero-arg-first pipelines.
- G3. Reduce the public pipe surface. `pipeStrict` and `pipeAsyncStrict` become redundant once G1 holds.
- G4. Support TypeScript 5.9, 6.0, and 7.0 with identical behavior.

## 3. Non-Goals

- NG1. Changing runtime behavior of any pipe (runtime code is untouched apart from brand properties).
- NG2. Absorbing the SideEffect pipes into `pipe` / `pipeAsync` (the 2-pipe model, DC-2 Option C). **Rejected**: it conflicts with the explicit early-exit / handle-at-the-boundary philosophy (see DESIGN DC-2).
- NG3. Rewriting `pipeWithDeps` semantics. Only its variant-dispatch mechanism is in scope.
- NG4. Raising the minimum TypeScript version.

## 4. Functional Requirements

| ID | Requirement | Verified by |
|----|-------------|-------------|
| FR-1 | `pipe(1, numId, strId)` is a compile error (issue #5 shape) | probe P1, `MT-1` |
| FR-2 | `pipe(1, numId, (s: string) => …)` is a compile error | probe P2 |
| FR-3 | Function-first `pipe(numId, strId)` is a compile error | probe P3 |
| FR-4 | A union input flowing into a narrower first step is an error (`number \| string` → `(n: number) => …`) | probe P8 |
| FR-5 | 11+ step pipelines are still supported and mismatches inside them are errors | probe P12, existing `purePipeEleven*` tests |
| FR-6 | A subtype input into a supertype-param step type-checks and keeps the result type | probe P7 |
| FR-7 | Inline / mixed / curried-generic inference unchanged | probes P4–P6, P9–P11, all existing `*.type-test.ts` |
| FR-8 | Mismatch errors name the `PipeError<From, To>` pair for data-first calls | `MT-2` |
| FR-9 | `pipeWithDeps(variant)` resolves to the correct mode for every variant | `pipeWithDeps.type-test.ts` |
| FR-10 | Same results under TS 5.9 / 6.0 / 7.0 | CI matrix (IMPLEMENT Phase 5) |
| FR-11 | Inline lambdas inside generic helpers infer in **both** call styles (`pipe(double, tap((x) => …))`, `pipe(zip(a, b), filter(([e]) => …))`) | `pipe.soundness.type-test.ts` |
| FR-12 | An `any` input is treated as data, never as a function-first step | `pipe.soundness.type-test.ts` |

## 5. Constraints

- C1. ~~Minimum consumer TypeScript becomes 5.4~~. Not needed: the implementation keeps the local `NoInfer` shim (DESIGN DC-4).
- C2. Pre-1.0 semver: tightening types is released as a **minor** version (0.15.0) with a migration note.
- C3. Type-check cost must not regress. Measured: the candidate is slightly cheaper (TS 5.9: 220k vs 258k instantiations; TS 7.0: check time 0.071s vs 0.096s).

## 6. Compatibility / Migration Concerns

- Code that previously compiled to `never` or `(input: any) => any` because of a mismatch will now error. This is intended, but the release notes must call it out.
- Code that previously relied on `A` being inferred from the first step's parameter (rather than the input) may see a different `A`. No existing test depends on this.
- Function-first pipelines whose first step is generic (`pipe(uniq, …)`, `pipe(pick([...]), …)`) now report errors instead of becoming `(input: any) => any`. Fix with data-first, a typed wrapper or `pipeHint` (CHANGELOG migration, DESIGN DC-7).
- All four `*Strict` imports must keep working (deprecated aliases, DC-1).
- `pipeSideEffect*` result types become narrower: `T | SideEffect<any>` turns into `T | SideEffect<E>`, or plain `T` when no step can produce an effect. Every new type is assignable to the old one (guarded by the `…ExpectedLegacy` assertions). Code that relied on `runPipeResult(...)` being `any` will now see the precise union.

## 7. Assumptions

- A1. The existing type-test corpus (`src/**/*.type-test.ts`) is representative of real usage. Phase 4 adds a docs/demo corpus check to reduce this risk.
- A2. TS 7.x minor releases keep 6.0 parity for inference.
