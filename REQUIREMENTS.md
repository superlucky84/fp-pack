# REQUIREMENTS — Inference Usability

## Active revision — combined-branch review fixes (2026-10-23)

Branch `ccr-80cfc3e1-vwp61m` fast-forwards `feat/inference-usability`,
`feat/curry-n` and `feat/inference-playground` (`2958e5d`) for one review against
`main`. Findings were checked against the IU/CN/PG intent recorded in these
documents and the ctxbin handoffs. Intended and documented, so unchanged: sync
accumulators reject Promise values (IU-DC-2), zip closes both inputs (IU-07),
required `prop` reads omit undefined (IU-DC-4). Two findings need changes:

| ID | Requirement | Validation |
|---|---|---|
| RF-01 | Async `zip`/`zipWith` report an input rejection immediately, even while the other input's read is pending; that input still closes once its read settles. IU-07 early-termination cleanup is unchanged | regressions that time out before the fix; existing cleanup tests |
| RF-02 | `compose` docs and CHANGELOG match IU-DC-5: no unchecked array catch-all; dynamic lists use a tuple or an explicit fold | docs signature, migration entry, compiler probe of the alternatives |

Scope: no public type, dependency or version change; no merge or publication.

## Active feature — interactive playground (2026-10-23)

Branch `feat/inference-playground`, based on curryN `3e46200`. The user wants
an enjoyable, varied hands-on way to validate the inference improvements and new
API. These PG-* contracts use the canonical root four-document set.

| ID | Requirement | Validation |
|---|---|---|
| PG-01 | Discoverable EN/KO full-width playground inside the existing docs | routes, sidebar, search and site build |
| PG-02 | Six labs cover curryN defaults/optional/rest/zero/reuse, readonly order pipelines, evolve/mergeDeep/optional paths, sync/async lazy streams and iterator cleanup, control/effect short-circuiting, and editable inference examples | runtime scenarios and browser interaction |
| PG-03 | Controls, curated presets and random challenges change real library execution; show input, pipeline stages, output and expected checks | independent expected-value regression suite |
| PG-04 | Editable TypeScript uses a real browser worker compiler with this checkout's source signatures; show inferred variable types and diagnostics, including intentionally invalid cases | positive/negative compiler fixtures and worker smoke |
| PG-05 | Busy/error states, stale async result protection, reset, repeatable checks and accessible mobile controls work | hardening and browser checks |
| PG-06 | Provide a ready-to-open private demo URL and preserve source in a new GitHub branch; save/read back ctxbin handoff | deployment, remote head and context readback |

Scope: demo/docs only; no library behavior, dependencies or versions change.
Compiler editing validates types only; runtime panels execute the selected form
controls, and the UI makes that distinction explicit. No backend or external API
is needed. Every runtime preset must have an independent expected result. Hosted
artifact is built from the same checkout, retaining the docs' existing base path
for GitHub Pages while the private demo uses a root-relative build.

## Active feature — curryN (2026-10-23)

Branch `feat/curry-n`, based on `6727836` from `feat/inference-usability`.
The user requested explicit-arity currying for default, optional and rest
parameters while preserving inference. The canonical root documents remain in
use; the completed IU-* revision below remains the feature's baseline.

| ID | Requirement | Validation |
|---|---|---|
| CN-01 | Export `curryN(arity, fn)` and its reusable result type; infer parameters/results from fn | source and installed declarations |
| CN-02 | Execute once the total supplied count reaches arity; support grouped, empty and reusable partial calls | runtime and exact type regressions |
| CN-03 | Defaults, optional parameters, required prefixes plus rest, and explicit undefined follow JavaScript function calls | paired runtime/type examples |
| CN-04 | Zero arity returns a callable and invokes only when called | execution counter and zero-arity types |
| CN-05 | Reject incompatible argument values, omitted required parameters at completion, invalid counts and finite-parameter overflow | negative type/runtime cases |
| CN-06 | Retain callback contextual types, Promise/literal results and compatibility with all four pipe modes | inference corpus without corrective casts |
| CN-07 | Existing curry and its public types retain their behavior | existing tests and unchanged implementation |
| CN-08 | Ship coherent EN/KO docs, navigation, README, guidance and package checks; update ctxbin handoff after push | docs/build/compiler matrix and readback |

Execution policy: arity is a nonnegative integer literal in 0–32. It is a minimum
execution threshold: extra arguments in the completing call are forwarded if
valid for the original remaining signature. Supplying undefined counts as one
argument. Empty calls retain the partial stage while a positive count remains.
The static count must permit a valid original function call; a required parameter
cannot be skipped by choosing a smaller count. Runtime count validation also
protects JavaScript callers. No placeholder arguments or inferred end-of-rest
marker is introduced. Standalone/bound functions are supported; explicit this
contracts must be bound before currying.

Known boundaries: arbitrary generic function relationships are limited by
Parameters/ReturnType extraction. For an unbounded argument spread that might
not reach the threshold, preserve an unknown result rather than inventing a
completed return type. Literal tuples retain exact stages. No dependencies,
version change, main merge or publication are part of this feature.

## Active revision — 2026-10-22

Branch: `feat/inference-usability`; baseline: `b9a92e0` (0.15.0).
Canonical documents remain at the package root because this change crosses object,
array, nullable, control, composition and stream APIs. The earlier pipe revision
below is historical where this revision supersedes it. Workflow: the user-requested
ctxbin `doc-driven-designer-v1` skill and agent rule (loaded 2026-10-22).

**User goal:** when an input type is known, ordinary pipelines preserve exact
intermediate and result types without extra generics, casts or callback annotations.
Valid programs must infer usefully; invalid programs must fail instead of escaping
through `any`, `unknown` or `never`.

| ID | Requirement | Validation |
|---|---|---|
| IU-01 | `evolve` infers transformer inputs and transformed property outputs; shallow/deep merge reflect runtime overwrite order | object inference and runtime regressions |
| IU-02 | Required/optional properties work equally in direct and curried `prop`/`pick`/`omit`; required reads do not invent undefined | object inference tests |
| IU-03 | Path reads/writes and deep array flattening derive outputs from inputs; unconstrained output generics cannot fabricate types | positive and negative path/flatten tests |
| IU-04 | Empty-array, object and null defaults retain the actual nullable input type | getOrElse pipeline regressions |
| IU-05 | Nonmutating array APIs accept readonly inputs; predicates preserve narrowing where valid | readonly and guard regression matrix |
| IU-06 | Saved/inline curried stream steps retain generics and support their declared input modes | stream type tests and runtime tests |
| IU-07 | Stream declarations match execution for sync/async callbacks; Promise predicates never silently count as true; strings are iterables | rejected invalid calls, async-source execution and cleanup tests |
| IU-08 | compose rejects incompatible connections; single generic pipe steps preserve relationships where TypeScript permits | composition regressions |
| IU-09 | Curried branch results are inferred at the call supplying them; curry's supported argument groupings match execution | control/curry positive and negative tests |
| IU-10 | matchSideEffect preserves the effect type at the handling boundary | effect inference tests |
| IU-11 | New positive usability cases contain no corrective casts/callback annotations; check callback types as well as outputs | new usability corpus and packed consumer |
| IU-12 | Existing runtime behavior stays compatible except documented correctness fixes; source, declarations, ESM/CJS and docs agree | baseline, hardening and integration gates |

Constraints: no dependencies, no publication or main merge, preserve the four pipe
modes and generated 32-step boundary, preserve current compiler support. Do not
replace missing inference with unchecked catch-alls. Input model declarations and
external API contracts are legitimate context, not corrective hints.

Explicit boundaries: arbitrary generic function transformations and fully untyped
function-first callbacks cannot always be inferred by TypeScript. We improve
verified cases and document remaining boundaries, rather than promise universal
inference. Existing explicit legacy path result arguments will be evaluated for
compatibility, but must not provide an unchecked escape through inferred APIs.

Migration: tighter utility contracts may expose invalid callers; document the
changes under an unreleased changelog entry. Async stream computations use the
existing `toAsync` input boundary (see IU-DC-2), not a new wrapper or type hint.

Hardening scope: optional transformation tables retain the original value when
their transformer is absent; deep merge includes enumerable symbol keys. Stream
callback constraints distinguish raw sync Promise elements from resolved async
elements, and accumulator initial values are synchronous values.

## Historical requirements — Pipe Soundness & Variant Consolidation

Status: **Inference-first hardening and 0.15.0 publication preparation validated locally**
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
- G5. Inference is a primary product requirement: users and AI should compose ordinary pipelines without adding assertions or repeated parameter/return annotations. Accepting a valid call as accidental `any` / `never`, or requiring hints for an already inferable case, is not success. Every safety regression must have a paired positive inference check.

## 3. Non-Goals

- NG1. Changing runtime behavior of any pipe (runtime code is untouched apart from brand properties).
- NG2. Absorbing the SideEffect pipes into `pipe` / `pipeAsync` (the 2-pipe model, DC-2 Option C). **Rejected**: it conflicts with the explicit early-exit / handle-at-the-boundary philosophy (see DESIGN DC-2).
- NG3. Changing `pipeWithDeps` runtime semantics. Its inference and argument validation are in scope; default and deprecated variants must provide equivalent guarantees.
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
| FR-13 | Long pipelines retain contextual types; a fallback must never manufacture `any` for an unannotated callback | long-chain positive/negative type tests |
| FR-14 | `pipeWithDeps` infers value flow and dependency intersections, and rejects mismatches for all four modes and their aliases, including `from()` | wrapper inference and mismatch type tests |
| FR-15 | Optional/default first parameters remain optional, including long chains | entry-shape type tests and runtime checks |
| FR-16 | Valid inference tests assert concrete result and intermediate types without corrective casts; error cases alone are insufficient | inference regression corpus |
| FR-17 | Version, README, EN/KO site and packaged guidance describe 0.15.0 consistently, including migration and inference limits | documentation review and builds |
| FR-18 | After merging and installing dependencies, `npm publish` automatically validates and builds the release; main and stream package exports work with ESM and CommonJS | publish dry run and installed-tarball smoke checks |

Explicit `any`, unchecked assertions, and TypeScript's own structural assignability rules are outside a universal soundness guarantee. Any practical contextual-inference boundary must be documented and must fail safely beyond it.

## 5. Constraints

- C1. No new minimum-version requirement from `NoInfer`: the current core and wrapper signatures do not use it. This follow-up validates TS 5.9.3 / 6.0.3 / 7.0.2; the historical oldest-consumer release check remains tracked separately.
- C2. Pre-1.0 semver: tightening types is released as a **minor** version (0.15.0) with a migration note.
- C3. Keep comparable-corpus type instantiations within the implementation plan's 20% budget. TS 5.9 measurement: `a00dcd7` = 126,084; follow-up with the existing corpus = 144,800 (+14.8%). Including the new inference/boundary regressions = 232,065. Compare equivalent test corpora when evaluating implementation cost.

## 6. Compatibility / Migration Concerns

- Code that previously compiled to `never` or `(input: any) => any` because of a mismatch will now error. This is intended, but the release notes must call it out.
- Code that previously relied on `A` being inferred from the first step's parameter (rather than the input) may see a different `A`. No existing test depends on this.
- Function-first pipelines whose first step is generic (`pipe(uniq, …)`, `pipe(pick([...]), …)`) now report errors instead of becoming `(input: any) => any`. Fix with data-first, a typed wrapper or `pipeHint` (CHANGELOG migration, DESIGN DC-7).
- All four `*Strict` imports must keep working (deprecated aliases, DC-1).
- `pipeSideEffect*` result types become narrower: `T | SideEffect<any>` turns into `T | SideEffect<E>`, or plain `T` when no step can produce an effect. Every new type is assignable to the old one (guarded by the `…ExpectedLegacy` assertions). Code that relied on `runPipeResult(...)` being `any` will now see the precise union.

## 7. Assumptions

- A1. The existing type-test corpus (`src/**/*.type-test.ts`) is representative of real usage. Phase 4 adds a docs/demo corpus check to reduce this risk.
- A2. TS 7.x minor releases keep 6.0 parity for inference.
