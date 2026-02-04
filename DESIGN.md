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

---

## Pipe Architecture

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
