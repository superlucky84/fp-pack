# fp-pack Design Document

This document describes the internal design decisions and architectural choices made in fp-pack.

## Table of Contents

- [Pipe Architecture](#pipe-architecture)
  - [Overview](#overview)
  - [Design Philosophy](#design-philosophy)
  - [Pipe Variants Matrix](#pipe-variants-matrix)
  - [Type System Architecture](#type-system-architecture)
  - [Overload Strategy](#overload-strategy)
  - [ValidateFn Mechanism](#validatefn-mechanism)
  - [SideEffect Handling](#sideeffect-handling)
  - [pipeWithDeps Wrapper](#pipewithdeps-wrapper)
  - [Design Trade-offs](#design-trade-offs)
  - [Completeness Statement](#completeness-statement)
- [Pipe Soundness Revision (0.15.0)](#pipe-soundness-revision-0150)

---

## Pipe Architecture

> **0.15.0:** The sections below describe the 0.14 architecture (8 pipe variants, `ValidateFn`, separate overload groups) and are kept as history. The current design is in [Pipe Soundness Revision (0.15.0)](#pipe-soundness-revision-0150): 4 pipes, one signature per arity, deprecated `*Strict` aliases.

### Overview

The pipe system is the core of fp-pack, providing function composition utilities with comprehensive TypeScript type support. The architecture consists of 9 pipe variants designed to cover all common use cases while maintaining optimal developer experience (DX) and type safety.

### Design Philosophy

The pipe system follows these core principles:

1. **Inference-First for DX**: Default pipe variants prioritize TypeScript's natural type inference, allowing inline lambdas to "just work" without explicit type annotations.

2. **Explicit Strictness**: Strict variants (`*Strict`) provide compile-time type checking at each pipeline step, catching mismatches early at the cost of requiring more type hints.

3. **Separation of Concerns**: Rather than attempting to achieve both perfect inference and strict validation in a single function (which is impossible due to TypeScript limitations), we provide separate variants for each use case.

4. **Consistency**: All variants follow identical structural patterns, making the API predictable and learnable.

### Pipe Variants Matrix

| Function | Sync/Async | SideEffect | Strict | Primary Use Case |
|----------|------------|------------|--------|------------------|
| `pipe` | sync | ❌ | ❌ | General-purpose, inline lambdas |
| `pipeStrict` | sync | ❌ | ✅ | Pre-defined function composition |
| `pipeSideEffect` | sync | ✅ | ❌ | Error handling with early return |
| `pipeSideEffectStrict` | sync | ✅ | ✅ | Strict error handling |
| `pipeAsync` | async | ❌ | ❌ | Async operations, inline lambdas |
| `pipeAsyncStrict` | async | ❌ | ✅ | Pre-defined async composition |
| `pipeAsyncSideEffect` | async | ✅ | ❌ | Async error handling |
| `pipeAsyncSideEffectStrict` | async | ✅ | ✅ | Strict async error handling |
| `pipeWithDeps` | wrapper | all | - | Dependency injection pattern |

### Type System Architecture

#### Core Type Definitions

Each pipe variant defines its own set of core types for independence and clarity:

```typescript
// Error marker type for compile-time feedback
type PipeError<From, To> = { __pipe_error: ['pipe', From, '->', To] };

// Prevents TypeScript from inferring through this position
type NoInfer<T> = [T][T extends any ? 0 : never];

// Function type extractors
type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnOutput<F> = F extends (...args: any[]) => infer R ? R : never;

// For async variants
type FnValue<F> = Awaited<FnReturn<F>>;

// For SideEffect variants
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type MaybeSideEffect<T> = T | SideEffect<any>;
```

#### ValidateFn Type

The validation mechanism differs between permissive and strict variants:

**Permissive (pipe, pipeAsync, etc.):**
```typescript
type ValidateFn<Fn extends UnaryFn<any, any>, Expected> =
  (Fn extends (a: NoInfer<Expected>) => any
    ? Fn
    : Fn & PipeError<Expected, FnInput<Fn>>) &
  ((a: NoInfer<Expected>) => any);
```

**Strict (pipeStrict, pipeAsyncStrict, etc.):**
```typescript
type ValidateFn<Fn extends UnaryFn<any, any>, Expected> =
  ([Expected] extends [FnInput<Fn>]
    ? Fn
    : Fn & PipeError<Expected, FnInput<Fn>>) &
  ((a: NoInfer<Expected>) => any);
```

The key difference: Strict variants use tuple wrapping `[Expected] extends [FnInput<Fn>]` for more rigorous type checking.

### Overload Strategy

Each pipe variant supports three usage patterns through function overloads:

#### 1. Data-First Pattern
```typescript
// Value flows through immediately
pipe(1, fn1, fn2, fn3)  // Returns result directly
```

#### 2. Function-First with ZeroFn
```typescript
// First function takes no arguments
pipe(() => 1, fn1, fn2)  // Returns () => result
```

#### 3. Function-First with UnaryFn
```typescript
// Creates a reusable pipeline
pipe(fn1, fn2, fn3)  // Returns (input) => result
```

#### Overload Structure

Each variant provides:
- **10 explicit overloads** for each pattern (1-10 functions)
- **1 fallback overload** using `PipeCheck` for 11+ functions
- Total: ~30+ overloads per variant

**Data-First Overloads (Permissive):**
```typescript
function pipe<A, B, C>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: B) => C  // Simple generic, no validation
): C;
```

**Data-First Overloads (Strict):**
```typescript
function pipeStrict<A, B, C>(
  input: NonFunction<A>,
  ab: (value: A) => B,
  bc: (value: NoInfer<B>) => C  // NoInfer blocks inference
): C;
```

**Function-First Overloads (All variants):**
```typescript
function pipe<F1 extends UnaryFn<any, any>, F2 extends UnaryFn<FnOutput<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnOutput<F1>>  // Always uses ValidateFn
): (a: FnInput<F1>) => FnOutput<F2>;
```

### ValidateFn Mechanism

#### How It Works

1. **Type Extraction**: `FnInput<Fn>` extracts the parameter type of the function
2. **Compatibility Check**: Compares `Expected` (previous output) with `FnInput<Fn>` (current input)
3. **Error Injection**: On mismatch, intersects `Fn` with `PipeError<Expected, FnInput<Fn>>`
4. **Compile Feedback**: The `PipeError` type appears in IDE hover information

#### Example Error Output

```typescript
const fn1 = (id: number) => id;
const fn2 = (userName: string) => userName;

pipeStrict(1, fn1, fn2);
// Error: Type '(userName: string) => string' is not assignable...
// Hover shows: { __pipe_strict_error: ['pipeStrict', number, '->', string] }
```

### SideEffect Handling

#### Runtime Behavior

SideEffect variants implement early-return semantics:

```typescript
function pipeSideEffect(...args: Array<any>) {
  const run = (init: any, funcs: Array<(input: any) => any>) => {
    let acc = init;
    for (const fn of funcs) {
      if (isSideEffect(acc)) {
        return acc;  // Early return on SideEffect
      }
      acc = fn(acc);
    }
    return acc;
  };
  // ...
}
```

#### Type-Level SideEffect Tracking

**Permissive SideEffect:**
```typescript
type MaybeSideEffect<T> = T | SideEffect<any>;
type PipeResult<F> = MaybeSideEffect<FnValue<F>>;
```

**Strict SideEffect:**
```typescript
type EffectOfFn<F> = EffectOfReturn<FnReturn<F>>;
type EffectsOf<Fns extends AnyFn[]> = EffectOfFn<Fns[number]>;
type StrictResult<FLast, Fns extends AnyFn[]> =
  MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns>>;
```

Strict variants track the exact error types from each step, providing precise union types in the result.

### pipeWithDeps Wrapper

`pipeWithDeps` enables dependency injection by wrapping any pipe variant:

```typescript
const myPipe = pipeWithDeps(pipeSideEffectStrict);

// Usage: each step receives (value, deps)
const result = myPipe(
  initialValue,
  (value, deps) => deps.service.process(value),
  (value, deps) => deps.logger.log(value)
)(dependencies);
```

#### Type Preservation

Uses branded types to preserve strict behavior:

```typescript
const pipeStrictWithBrand = pipeStrict as typeof pipeStrict & {
  readonly __pipe_strict: true
};
```

`pipeWithDeps` detects these brands via overloads to return the correct wrapped type.

### Design Trade-offs

#### Why Not a Single "Smart" Pipe?

We investigated `SmartValidateFn` - an approach attempting to validate type compatibility while preserving inference:

```typescript
type AreCompatible<A, B> = A extends B ? true : B extends A ? true : false;
type SmartValidateFn<Fn, Expected> =
  AreCompatible<Expected, FnInput<Fn>> extends true
    ? Fn
    : Fn & PipeError<Expected, FnInput<Fn>>;
```

**Test Results:**

| Test Case | Result |
|-----------|--------|
| Inline + Inline | ✅ Works |
| Pre-defined + Pre-defined (type match) | ✅ Works |
| Pre-defined + Pre-defined (type mismatch) | ✅ Catches error |
| **Inline → Pre-defined (mixed)** | ❌ **Inference breaks** |

The mixed case (`pipe(1, x => x.toString(), strToStr)`) causes the second function's parameter to be inferred as `unknown` instead of `string`.

**Conclusion**: TypeScript's generic inference algorithm cannot simultaneously:
1. Allow natural type flow for inference
2. Validate type compatibility at each step

This is a fundamental limitation of TypeScript's type system, not a solvable problem.

> **Superseded (2026-10-01):** The `SmartValidateFn` conclusion still holds, but it was not the reason `pipe` missed mismatches. The leak came from the variadic fallback overloads. See [Pipe Soundness Revision](#pipe-soundness-revision-0150).

#### The Chosen Solution: Separation

| Approach | Inference | Validation | Use Case |
|----------|-----------|------------|----------|
| `pipe` | ✅ Excellent | ⚠️ Limited | Inline lambdas (~99% of cases) |
| `pipeStrict` | ⚠️ Limited | ✅ Full | Pre-defined function composition |

This separation provides:
- Best DX for the common case (inline lambdas)
- Full type safety when explicitly needed (strict variants)
- No breaking changes or regressions
- Clear mental model for users

### Completeness Statement

> **Superseded (2026-10-01):** The statements below were disproved by experiment. See [Pipe Soundness Revision](#pipe-soundness-revision-0150).

**As of TypeScript 5.9.3, the pipe architecture represents a complete and optimal implementation within the constraints of TypeScript's type system.**

#### What Has Been Achieved

1. **Full Pattern Coverage**: All combinations of sync/async, SideEffect, and strict modes
2. **Optimal Inference**: Data-first overloads provide seamless inference for inline lambdas
3. **Strict Validation**: Function-first overloads and strict variants catch type mismatches
4. **Consistent API**: All 9 variants follow identical structural patterns
5. **Error Feedback**: `PipeError` types provide clear compile-time diagnostics
6. **Dependency Injection**: `pipeWithDeps` wrapper supports all variants

#### Why No Further Improvements Are Possible

1. **TypeScript Limitation**: The inference vs. validation trade-off is fundamental to TypeScript's generic resolution algorithm
2. **Overload Exhaustion**: All meaningful overload combinations are covered
3. **Runtime Optimization**: Implementation uses simple loops with minimal overhead
4. **Type Complexity Balance**: Current types are complex enough for correctness but not so complex as to slow down IDE performance

#### Recommended Usage

```typescript
// For inline lambdas (most common) - use permissive variants
pipe(data, x => transform(x), y => format(y))
pipeAsync(data, async x => await fetch(x), y => parse(y))

// For pre-defined function composition - use strict variants
const fn1 = (x: number) => x.toString();
const fn2 = (x: string) => x.toUpperCase();
pipeStrict(1, fn1, fn2)  // Type-checked at each step

// For error handling with early return
pipeSideEffect(data, validate, process, save)
pipeSideEffectStrict(data, validate, process, save)  // With exact error types

// For dependency injection
const myPipe = pipeWithDeps(pipeSideEffectStrict);
myPipe(data, step1, step2)(deps);
```

---

*Last reviewed: 2026-02-05*
*TypeScript version: 5.9.3*
*fp-pack version: 0.14.0*

---

## Pipe Soundness Revision (0.15.0)

Status: **Implemented on `feat/pipe-soundness`** with the **4-pipe model** (DC-2 = B). Every change was first validated in a scratch copy of `src` (see [Evidence](#evidence)). Requirements: `REQUIREMENTS.md`. Plan and progress: `IMPLEMENT.md`.

### Root Cause

TypeScript 7 does not change inference (it claims 6.0 parity), and the baseline probes behave identically on 5.9.3, 6.0.3, and 7.0.2. The missed mismatches come from **overload fall-through**:

| Call | Typed overload | Falls through to | Result today |
|------|----------------|------------------|--------------|
| `pipe(1, numId, strId)` | rejects (correct) | data-first `...funcs: PipeCheckWithInput<A, Fns>` | `never`, no error |
| `pipe(numId, strId)` | rejects (correct) | catch-all `(...funcs: Array<UnaryFn<any, any>>)` | `(input: any) => any` |
| `pipe(1 as number \| string, numId, …)` | rejects | data-first fallback | `string`, no error |
| `pipe({ a: 1, b: 2 }, (o: { a: number }) => o.a)` | rejects (**wrongly**: `A` inferred from the step param, so excess-property error) | data-first fallback | `never` |

`PipeCheckWithInput` is a conditional type over `Fns`, so TypeScript cannot infer `Fns` through it and the validation never fires. `PipeCheck<Fns> = Fns & (…)` (a naked intersection) does infer correctly. The function-first fallback already uses it.

### Changes

Applied to the four core pipes: `pipe`, `pipeAsync`, `pipeSideEffect`, `pipeAsyncSideEffect`.

1. **One signature per arity serves both call styles.** Data-first (`pipe(x, f, g)`) and function-first (`pipe(f, g, h)`) calls with the same number of arguments now share a single overload:
   ```ts
   type IsFn<I> = 0 extends 1 & I ? false : [I] extends [AnyFn] ? true : false; // `any` input is data
   type Head<I> = IsFn<I> extends true ? FnOutput<I> : I;
   type Result<I, Rs extends any[]> = IsFn<I> extends true
     ? PipeEntry<I, Last<Rs, FnOutput<I>>>   // (a) => R, () => R for zero-arg, (input?) => R for from()
     : Last<Rs, I>;

   function pipe<I, R1, R2>(first: I, s1: (value: Head<I>) => R1, s2: (value: R1) => R2): Result<I, [R1, R2]>;
   ```
   `Head<I>` is a conditional type, so `I` is inferred from `first` only. That replaces the `NoInfer<A>` trick: subtype inputs work and a wider union input into a narrower first step is an error. The local `NoInfer` shim, the separate data-first / ZeroFn / FromFn / F-generic function-first groups and `ValidateFn` are gone.
2. **Sound diagnostic fallback for 11+ steps, placed last** (`PipeCheckFrom`). It also makes mismatch messages name `PipeError<From, To>`.
3. **Delete the untyped catch-all overload** (`(...funcs: Array<…>) => (input: any) => any`).
4. **Unique brands per variant** so `pipeWithDeps`'s `typeof`-based dispatch keeps working.

#### Why one signature (and not separate groups)

TS tries overloads in order, and while inferring a candidate it contextually types lambdas nested in generic helper calls (`tap((x) => …)`, `filter(([e]) => …)`). Those parameter types are fixed permanently, even if the candidate is then rejected. With separate groups, whichever group came first pre-typed the other style's lambdas:

| Order | Breaks |
|-------|--------|
| data-first group first | `pipe(double, tap((x) => x.toFixed()))`: `x` fixed as the function type → error |
| function-first group first | `pipe(zip(a, b), filter(([e]) => …))`: `e` fixed as `unknown` → error (StreamZip docs example, which inferred precisely in 0.14) |

With one signature per arity there is no earlier candidate to pre-type anything. Both rows now work, as does every case in the issue #5 probe set.

Intermediate attempts that were rejected: F-generic function-first overloads with `ValidateFn` (cannot infer `tap((x) => …)` at all); plain function-first overloads before or after data-first (one of the two rows above always breaks); reordering ZeroFn/FromFn groups (TS's subtype pass picks the plain overload over `from()` anyway).

#### Behavior that is new and intentional

- Function-first pipelines whose **first step is generic** (`pipe(uniq, sort(...))`, `pipe(pick([...]), ...)`) give TS no input type, so later steps see `unknown` and mismatches are reported. In 0.14 they compiled only because the catch-all returned `(input: any) => any`. Fix: data-first (`pipe(values, uniq, ...)`), a typed wrapper (`(values: string[]) => pipe(values, ...)`) or `pipeHint`.
- Calling a unary pipeline with two arguments (`pipe(range, toArray)(0, 5)`) is an error. Use `pipe(range(0, 5), toArray)`.

### Implementation Notes (4-pipe model)

- `pipeSideEffect` / `pipeAsyncSideEffect` now hold the former `*SideEffectStrict` implementation with S1 + S2 applied. Internal `Strict*` type names were renamed to `Effect*`.
- Function-first SideEffect pipelines return `EffectUnarySignatures<A, R, E>`, a conditional on `E` that TS resolves eagerly. Hovers therefore show the call signatures (`{ (input: number): string | SideEffect<'LOW'>; <EIn>(input: number | SideEffect<EIn>): … }`) instead of an internal alias.
- `pipeWithDeps` has 4 modes (`sync`, `async`, `sideEffect`, `asyncSideEffect`). `pipeWithDeps(pipeSideEffect)` keeps the 0.14 argument handling (unchecked `Steps`, so untyped lambda steps still infer) with precise effect results. The deprecated `*SideEffectStrict` aliases dispatch to `PipeWithDepsSideEffectChecked`, which keeps their old checked-argument behavior. This is the one place where the strict aliases still differ, and it must be resolved before removing them in 1.0.
- Brands: `__pipe`, `__pipe_async`, `__pipe_side_effect`, `__pipe_async_side_effect` on the core pipes. The aliases keep or add `__pipe_strict`, `__pipe_async_strict`, `__pipe_side_effect_strict`, and `__pipe_async_side_effect_strict`.
- Test helper fix: `EffectUnion<T>` in the type-tests returned `unknown` for effect-free results (an `Extract` that is `never` is not distributive). It now returns `never`.
- Changed expectations keep the old type as `…ExpectedLegacy` with an `Extends<typeof x, …ExpectedLegacy>` guard. Every new type is assignable to what 0.14 promised.

### Variant Consolidation

| Variant | After revision | Evidence |
|---------|----------------|----------|
| `pipeStrict` | Redundant. Can be an alias of `pipe` (+ `__pipe_strict` brand) | v14: 0 errors, including all `pipeStrict` `@ts-expect-error` tests |
| `pipeAsyncStrict` | Redundant. Alias of `pipeAsync` | v14: 0 errors |
| `pipeSideEffectStrict` | **Not redundant.** It returns precise effect unions (`MaybeSideEffect<T, E1 \| E2>`), while `pipeSideEffect` returns `SideEffect<any>` | v15: 60 effect-type assertions fail when aliased |
| `pipeAsyncSideEffectStrict` | Not redundant (same reason) | v15 |

So the core pipe surface goes from **8 to 6** functions with no loss of capability. It can go to **4** only if DC-2 is accepted.

### SideEffect Consolidation Experiments (DC-2)

All of these start from the 6-pipe candidate. `research/pipe-soundness/reproduce.sh se4|se2` reproduces them.

**Step S1 — sound precise SideEffect pipe.** Apply the soundness recipe to `*SideEffectStrict`:
- intrinsic `NoInfer`, only on the first data-first step;
- remove `NoInfer` from the later steps (`UnaryFn<NonSideEffect<B>, C>`);
- use `PipeCheckFrom` as the diagnostic fallback.

Then alias `pipeSideEffect` / `pipeAsyncSideEffect` to it. Result: **no inference failures at all.** No implicit `any`, no lost lambda contexts, and every `pipeSideEffect` and probe case still compiles or errors as before. Every remaining failure is an `Equal<…>` assertion whose expected type changed. Runtime is unchanged (both implementations are identical).

**Step S2 — collapse `SideEffect<never>`.** `MaybeSideEffect<T, E> = [E] extends [never] ? T : T | SideEffect<E>`. A pipeline with no SideEffect-returning step now returns plain `T` instead of `T | SideEffect<never>` (or the old `T | SideEffect<any>`).

**Steps S4 + S5 — also absorb `pipe` / `pipeAsync`.** Two more changes:
- an effect-free function-first pipeline returns a plain `(input: A) => R` instead of the overloaded callable;
- a step returning `any` contributes no effect.

Then alias `pipe` / `pipeAsync` to the precise SideEffect pipes.

| Mode | Public pipes | Type-test errors (TS 5.9 / 6.0 / 7.0) | Runtime tests |
|------|-------------|------------------------------------------|---------------|
| `candidate` | 6 | 0 / 0 / 0 | 386/386 |
| `se4` (S1+S2) | **4**: `pipe`, `pipeAsync`, `pipeSideEffect`, `pipeAsyncSideEffect` | 57 / 57 / 57 | 386/386 |
| `se2` (S1+S2+S4+S5) | **2**: `pipe`, `pipeAsync` | 67 / 67 / 67 | 386/386 |

What the errors are:

| Category | se4 | se2 | Nature |
|----------|-----|-----|--------|
| `pipeSideEffect*` results: `T \| SideEffect<any>` → `T \| SideEffect<E>` (precise) or `T` (no effects) | ✔ | ✔ | **Intended type change.** Test expectations must be rewritten |
| `pipeSideEffect*` function-first: `(a) => R` → overloaded callable `{ (input: A): …; <EIn>(input: A \| SideEffect<EIn>): … }` | ✔ | only when effects exist | Intended change. Hover gets more verbose |
| `*SideEffectStrict` results: `T \| SideEffect<never>` → `T` | ✔ | ✔ | Intended (S2) |
| `runPipeResult` expectations (2) | ✔ | ✔ | Follows from the precise effect types |
| `pipeWithDeps` (6 in se4, 13 in se2) | ✔ | ✔ | **Real work item.** Its mode dispatch and `ValidateStep` assume the old signatures and must be rewritten for the merged variants |
| Pure `pipe` / `pipeAsync` / `pipeStrict` type tests | — | **all pass** (including the 12 probes) | — |
| Feeding a `SideEffect` into an **effect-free** function-first pipeline (`pipeSideEffect(f, g)(SideEffect.of(…))`) | — | 2 errors | **Capability regression in se2.** Making it generic (`<EIn = never>(input: A \| SideEffect<EIn>) => …`, experiment S6) fixes it but changes the hover of *every* pure function-first pipeline (123 errors). Not recommended |

Runtime note for se2: `pipe` would short-circuit when a step returns a `SideEffect` (today it passes the object through). The existing runtime suite passes unchanged, but this is a behavior change for any user who returns `SideEffect` from a plain `pipe`.

### Decision Checklist

- [x] **DC-1** → all four `*Strict` variants are `@deprecated` branded aliases in 0.15.x, to be removed in 1.0.
- [x] **DC-2** → **Option B (4 pipes).** Option C is rejected because it conflicts with the SideEffect philosophy. `pipeSideEffect*` is the explicit opt-in for early exit, and the effect is handled once at the boundary (`core-rules.md`: "Use `pipeSideEffect*` only when you need early exit"). If plain `pipe` short-circuits too, a pure outer pipeline can no longer receive a SideEffect as a value and handle it. In `pipe(input, validatePipeline, (r) => isSideEffect(r) ? fallback(r) : r)` the handler step would never run. Original options, for the record — how far to consolidate the SideEffect family (see [SideEffect Consolidation Experiments](#sideeffect-consolidation-experiments-dc-2)).
  - Option A (6 pipes): keep `*SideEffectStrict` separate. No type changes for anyone.
  - Option B (**4 pipes, recommended**): `pipeSideEffect` becomes precise (S1+S2) and `*SideEffectStrict` become deprecated aliases. Inference is unaffected. Result types become *narrower* (`SideEffect<any>` → `SideEffect<E>` or plain `T`). That is assignable to the old types in almost all user code, but it is a visible type change and needs a release note. It also requires the `pipeWithDeps` rework.
  - Option C (2 pipes): additionally make `pipe` / `pipeAsync` the SideEffect-aware pipes. All pure type tests and runtime tests pass. Costs: the runtime short-circuit behavior change, the "SideEffect into an effect-free pipeline" regression, and `pipeWithDeps` rework. **Recommended as a 1.0 follow-up, not in 0.15.**
- [x] **DC-3** → Option A for 0.15 (accept it; it is still an error). Function-first mismatch message. Today it is `… not assignable to parameter of type 'never'` (the last overload is data-first, so `NonFunction<fn>` = `never`). Option A: accept it for now. Option B: add a function-first diagnostic overload, which needs ordering experiments.
- [x] **DC-4** → no change. The final design needs no `NoInfer` at all (Change 1), so the minimum supported TypeScript stays where it was.
- [x] **DC-5** → deferred. Add the CI matrix first. Known TS 7 blocker: `sideEffect.ts` `runPipeResult<T, R>(result: SideEffect<R>): R` declares an unused `T`, which TS 7 reports as TS6196 (5.9/6.0 do not). This is pre-existing and needs an API-compatible fix before switching. Upgrade the dev toolchain to TS 7 (`typescript@7.0.2`). Measured type-check time is about 5× faster than 5.9. Also needs a `vite-plugin-dts` compatibility check (it uses the TS API, which TS 7 changes). **Recommended:** add a CI matrix for 5.9 / 6.0 / 7.0 first, then switch the default later.
- [x] **DC-7** → function-first pipelines that start with a generic step are reported instead of silently becoming `any` (see "Behavior that is new and intentional"). Documented in the CHANGELOG migration notes. Known pre-existing stream typing gap: `pipeAsync(zip(asyncGenA(), asyncGenB()), map(([a, b]) => …))` still cannot type the destructured tuple (it was `never` in 0.14 too).
- [x] **DC-6** → 0.15.0 with a migration note (version bump happens at release time). Release version. **Recommended:** 0.15.0 (pre-1.0 minor) with a "stricter types" migration note.

### Evidence

Reproduce with `research/pipe-soundness/` (probe file + transform script + README). Results:

| Variant (scratch copy) | Repo type-tests + 12 probes, errors on TS 5.9 / 6.0 / 7.0 |
|---|---|
| v0 baseline | 5 / 5 / 5 (P1, P2, P3, P8, P12 not caught; P7 → `never`) |
| v1/v2 `pipe` := `pipeStrict` (shim / intrinsic `NoInfer`) | 10 / 10 / 10 (breaks inline→predefined, subtype input, `pipeWithDeps`) |
| v5 remove fallbacks only | 6 / 6 / 6 (11+ steps unsupported, P7 still broken) |
| v6/v7 per-step `F extends …` generics | 12 / 12 / 12 (curried generic utils lose inference) |
| **v13 Changes 1–5 on all four permissive pipes** | **0 / 0 / 0** |
| v14 = v13 + `pipeStrict` / `pipeAsyncStrict` as aliases | **0 / 0 / 0** |
| v15 = v14 + SideEffectStrict as aliases of the *old* `pipeSideEffect` | 60 / 60 / 60 |
| S0 = v14 + `pipeSideEffect` as alias of the *original* `pipeSideEffectStrict` | 48 / 48 / 48 (all are `Equal` expectation changes) |
| `se4` (S1+S2), 4 pipes | 57 / 57 / 57 (expectation changes + `pipeWithDeps`) |
| `se2` (S1+S2+S4+S5), 2 pipes | 67 / 67 / 67 (as above + 2 SideEffect-input regressions) |
| S6 = se2 + generic SideEffect input on effect-free pipelines | 123 / 123 / 123 (every pure function-first hover changes) |
| **Final: unified signature (`research/pipe-soundness/unified.py`) on the 4-pipe model** | **0 / 0 / 0** (repo type-tests incl. `pipe.soundness.type-test.ts`); runtime 386/386 |

Docs-corpus check (every `fp-pack` code sample on the docs site, ~1,460 snippets, compiled against 0.14 and against the final build, ignoring undefined-name noise): 0.14 = 502 errors, final = 357. Every snippet that newly failed was either wrong (sync `pipe` over `fetch`, array `flatten` on a generator, `pipe(range, toArray)(0, 5)`) or relied on the `any` catch-all; all were rewritten. Two remain: one placeholder snippet with undefined identifiers, and the pre-existing stream gap in DC-7. Type-check cost: 126k instantiations vs 214k at 1c645a7 and 258k in 0.14 (TS 5.9).

*Recorded: 2026-10-01 · TypeScript 5.9.3 / 6.0.3 / 7.0.2 · fp-pack 0.14.0 @ fe36dc5*
