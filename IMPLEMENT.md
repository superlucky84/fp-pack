# IMPLEMENT — Inference Usability

## Active feature — interactive playground (2026-10-23)

Branch `feat/inference-playground`, baseline `3e46200`.

1. [x] **PG Phase 0 — Contracts/baseline.** Align PG-* docs. Entry: clean curryN
   branch. Gate: inherited source types/runtime and docs type-check.
2. [x] **PG Phase 1 — Implementation.** Build typed scenario engine, six-lab UI,
   presets/challenges, real compiler worker and docs discovery. Gate: source
   baseline plus docs types, deterministic expected runtime and compiler cases.
3. [x] **PG Phase 2 — Test Hardening.** Cover default/undefined/zero/rest/reuse,
   empty collections, optional reads, streams/cleanup, effect early exit,
   positive/negative compiler examples, async supersession and recovery.
   Gate: source baseline, scenario/compiler suite, accessible responsive browser
   interaction when available.
4. [ ] **PG Phase 3 — Integration Test.** Docs lint/type/build, packed consumer
   baseline, root-relative hosted build, browser/asset smoke, commit/push,
   private Site deployment and ctxbin handoff readback. Gate: evidence recorded,
   remote HEAD verified, ready-to-open URL and known limitations documented.

Handoff (implementation checkpoint):

- done: PG phases 0–2. Baseline inherited 414 tests, source types and docs types
  passed. Six labs and 21 independent runtime presets, eight editable positive/
  negative examples, actual worker compiler, stale-run protection and cleanup
  are implemented. New coverage: 23 scenario/session tests plus 30 compiler tests.
- validation: all 467 tests in 167 files pass; source types and docs types/lint
  pass. Standard `/fp-pack/` docs build and standalone `/` build pass. Installed
  ESM/CJS metadata/runtime, TS 5.9.3 consumer and declaration emission pass with
  59 existing marked docs examples. No library implementation changed.
- browser: Chromium desktop 1440x1000 and mobile 390x844 passed against dev and
  production builds: all 21 UI checks, real worker inference/invalid examples,
  edited code, async supersession, language/docs navigation and optional controls;
  no unexpected page/console errors or horizontal overflow. Evidence in
  `/tmp/fp-playground-browser.log` and `...-production-browser.log`.
- next: finish source snapshot, GitHub push, private Site deployment and ctxbin
  readback; record deployed URL/final commit in the completion handoff. The Site
  helper scripts are not mounted in this runtime; use ordinary Git with the
  returned short-lived credential through stdin and native Sites archive tools.
- blockers: none. The compiler is a 7.1 MB uncompressed worker loaded on demand;
  first check can take longer. Existing docs chunk warning remains. Baseline
  commit `3e46200eb151c4a70f38ff56e1765f58b74eba29`; this checkpoint follows.
  Hosted identity is separate from fp-pack git; credentials remain outside files.

## Active feature — curryN (2026-10-23)

Branch `feat/curry-n`, baseline `6727836` (completed inference feature).
Follow REQUIREMENTS CN-* and DESIGN CN-DC-*. Every phase runs
`npm run test:types` and `node_modules/.bin/vitest run` as baseline gates.

1. [x] **CN Phase 0 — Contracts/baseline.** Read ctxbin handoff and requested
   doc-driven skill/rule. Resolve the four documents and verify inherited tests.
   Exit: documented call policy and baseline 403 tests/types pass.
2. [x] **CN Phase 1 — Implementation.** Add failing runtime/type cases, then
   collector, checked tuple types and exports. Exit: CN-01–07 regressions and
   baseline pass; library/declaration build and installed consumer pass.
3. [x] **CN Phase 2 — Test Hardening.** Exercise 0/32, optional+rest combinations,
   empty/grouped/reused calls, explicit undefined, literal/Promise/callback types,
   invalid/union counts, uncertain spreads and all pipe modes. Exit: paired
   positive/negative cases and baseline pass; type-cost evidence recorded.
4. [x] **CN Phase 3 — Integration Test.** Add the fixture and marked documentation
   examples to the installed consumer; update EN/KO routes/search/sidebar,
   README/changelog and authoring guidance. Exit: baseline, build, ESM/CJS,
   TS 5.9/6.0/7.0 installed declaration checks and docs lint/build pass. Commit,
   push feature branch, then save and read back ctxbin handoff.

Handoff:

- done: all CN phases. The inherited 403 tests/types passed before the new
  regressions failed on the missing API. Final source types, generated-signature
  check and all 414 runtime tests (165 files) pass. Library/declaration build,
  installed ESM/CJS execution, exported inferred partials and 59 marked README/
  EN/KO examples pass consumer type/declaration checks on TS 5.9.3 / 6.0.3 / 7.0.2
  with exact optional properties. Docs lint/build and git diff --check pass.
- decisions validated: a never[] callable constraint retains default parameter
  inference without contextual any. A public stage interface fixes TS4023 for
  exported inferred partials. Function unions intersect their valid prefixes and
  consume each possible remaining signature; applying NoInfer to the completed
  guard preserves branch distribution. Arbitrary generic extraction and
  uncertain-length spreads retain unknown instead of inventing a precise result.
- cost: whole-corpus instantiations 275,788 → 326,411 (+18.4%, new fixture included).
- next: optional interactive IDE/browser checks and owner review. Implementation
  is complete. Final pushed HEAD and continuation notes are recorded in ctxbin
  `fp-pack/feat/curry-n`; the parent context points to this follow-up.
- blockers: none. Latest implementation commit `343f12e` (hardening), original
  implementation `b149416`; this integration/documentation checkpoint follows.
  Parent is `feat/inference-usability` at `6727836`; main remains unmerged.
- environment: ctxbin credentials remain outside git; use NODE_USE_ENV_PROXY=1
  here. No version or dependency changes, main merge, publication or PR creation.

## Active work — 2026-10-22

Branch `feat/inference-usability`, baseline `b9a92e0`. Follow REQUIREMENTS IU-* and
DESIGN IU-DC-*. The root four-document set is canonical; dated sections below are
historical and do not prescribe changes to the current implementation.

Baseline for every phase: `npm run test:types` and `node_modules/.bin/vitest run`.
Build/consumer gate for each implementation phase: `npm run build` then
`npm run test:package`. These run the same underlying scripts as the pnpm commands
without pnpm 11's environment-specific automatic dependency reinstallation.

1. [x] **IU Phase 0 — Baseline and contracts.** Entry: clean baseline, review
   reproduced failures. Align the four documents, record decisions, add regression
   cases before their fixes. Exit: baseline verified; failing cases attributable
   to the documented contracts. Baseline: types/runtime and existing build/consumer evidence.
2. [x] **IU Phase 1 — Data transformations.** Fix evolve/merge/path/flatten,
   optional property access, defaults, readonly inputs and narrowing. Entry:
   decisions resolved and regression failures recorded. Exit: IU-01–05 and
   baseline plus build/consumer pass with precise inferred output checks.
3. [x] **IU Phase 2 — Stream contracts.** Repair deferred generics/returned
   overloads, async-mode declarations and guards, iterable detection and guard
   narrowing. Entry: Phase 1 green. Exit: IU-06–07 and baseline plus build/consumer
   pass, including sync/async and stored-step tests.
4. [x] **IU Phase 3 — Composition and boundaries.** Repair compose validation,
   staged branch/curry declarations, supported generic pipe entry and effect
   matching. Entry: Phase 2 green. Exit: IU-08–10 and baseline plus build/consumer
   pass; inference boundaries documented without unchecked overloads.
5. [x] **IU Phase 4 — Test Hardening.** Entry: implementation phases green.
   Exercise cross-mode combinations, optional/readonly/union/defaults, iterator
   cleanup, invalid calls, callback types and source test cost. Remove corrective
   casts from the newly covered usability scenarios. Exit: IU-11 and baseline
   pass; no unexplained any/unknown/never in positive examples.
   Include optional transformation tables, symbol merge keys, saved callbacks on
   Promise elements, accumulator mode rejection and both zip cleanup paths.
6. [x] **IU Phase 5 — Integration Test.** Entry: hardening green. Add packed
   consumer checks, run library/declaration build, ESM/CJS package checks, docs
   lint/build and supported compiler matrix when available. Update README,
   changelog and affected EN/KO guidance. Exit: IU-12; all executed results and
   remaining manual checks recorded; working tree review completed.

### Current handoff

- done: Phase 0 baseline (388 runtime tests/types); Phase 1 regression failures
  reproduced before fixes, then types, 393 runtime tests, build and installed
  consumer passed. Required property reads and readonly function inputs required
  corresponding precise expectation updates in historical tests. Removed unsafe
  explicit path-output type arguments from their consumers. `drop(0)` retains
  reference identity, so its readonly input overload returns a readonly array.
- done: Phase 2 source-derived stream signatures preserve inline inference and
  stored partial applications across sync/async inputs. Async predicates and
  accumulators require async input; untyped sync misuse throws a clear error.
  Strings are iterable, deep flattening keeps string leaves atomic, and zip closes
  both inputs. Types, 398 runtime tests, build and installed consumer passed.
- done: Phase 3 regression cases failed before fixes. Staged branch results,
  guard narrowing, heterogeneous cond/fold results, grouped curry calls, checked
  compose fallbacks and effect matching now infer precisely. Tuple-constrained
  unary signatures preserve generic relationships in pipe/pipeAsync while
  retaining optional/zero/from entries. Effect pipes retain their existing
  overloaded effect-input protocol. Types, 399 runtime tests, build and installed
  consumer passed.
- done: Phase 4 added cross-mode, readonly/default, optional/union/path, symbol,
  negative callback/accumulator and iterator cleanup regressions. Fixed absent
  evolve transforms, readonly array defaults, required array-property paths and
  symbol deep merge. Homomorphic deep-value mapping preserves symbol names during
  declaration emission. Types, 403 runtime tests, build and installed consumer pass.
- done: Phase 5 expanded the packed consumer to all four new inference fixtures
  plus 50 marked README/EN/KO examples, compiled verbatim. TS 5.9.3 / 6.0.3 /
  7.0.2 pass consumer checks and declaration emission with exact optional types;
  source checks on all three also passed during integration. Optional-merge
  assertions check readable values and key optionality independently because
  compiler versions differ in whether implicit undefined is displayed as an
  explicit optional write type. Installed ESM/CJS execution, library/declaration
  build, docs lint/build, final source types and all 403 runtime tests pass.
  Integration also tightened stream.flatten's sync/async inner-iterable contract.
  The review and remaining inference boundaries are in
  `research/inference-usability/README.md`. No version/dependency changes.
- cost: baseline whole corpus 232,065 instantiations; final whole corpus including
  new regressions 275,788 (+18.8%). Timing is not treated as a stable benchmark.
- done: feature branch pushed to origin and remote head verified at `90afb0b`.
- next: implementation is complete. Interactive IDE/browser sign-off remains a
  separate manual check; owner review and a future release use this feature branch.
- blockers: none. Credentials are stored only in the environment's private ctxbin
  configuration, outside the repository. ctxbin needs `NODE_USE_ENV_PROXY=1` here.
- latest implementation/integration commit: `90afb0b` (Phase 5). This final
  handoff checkpoint is documentation-only. Phase 4: `cc6f7aa`;
  Phase 3: `2c8c17b`; Phase 2: `0b21119`;
  Phase 1: `f79a00f`; contracts: `13385a8`; baseline: `b9a92e0`.

## Historical plan — Pipe Soundness & Variant Consolidation

Source of truth: `REQUIREMENTS.md` (what), `DESIGN.md` § Pipe Soundness Revision (how and decisions), `MANUAL_TEST_CHECKLIST.md` (release gate).

## Active release preparation — 0.15.0 (2026-10-02)

1. [x] Update version, packaged files, and automatic publication validation/build scripts; repair CommonJS entry points while retaining browser UMD paths.
2. [x] Align README, changelog, EN/KO site and AI guidance with migration requirements, precise effects and the 32-step contextual inference boundary.
3. [x] Harden installed-tarball checks for versioned metadata/guidance, ESM and CommonJS exports and declaration emission.
4. [x] Run the publication dry run, documentation checks and compiler matrix against the release artifact; record results and remaining owner actions.

Exit: a merge followed by dependency installation and `npm publish` requires no manual version edit or build. No publication, tag or remote merge is performed by this task. Historical IDE and remote CI sign-off items below remain separately recorded.

## Active follow-up — inference-first hardening (2026-10-02)

Entry: `a00dcd7`, clean tree; review reproduced remaining inference/safety gaps. These phases take priority over the historical release checklist below.

1. [x] **Regression baseline:** paired positive/negative tests for long unannotated chains, all wrapper modes/aliases, `from()`, and optional entries; confirmed failures before implementation.
2. [x] **Signature implementation:** 32 generated contextual steps, checked fallback with no contextual `any`, unified wrapper inference/validation, preserved entry call shapes. Existing and added type tests pass.
3. [x] **Test hardening:** exercised inference cutoff/fallback, curried helpers, readonly/union inputs, effect unions and dependency intersections; existing overloaded/generic probes checked during review. Type/runtime suites pass; comparable cost +14.8%.
4. [x] **Integration:** declaration build and isolated packed consumer for main/stream exports, including exported wrappers; EN/KO migration guidance and examples updated and compiled against the packed package.

Exit: new failures fixed with no added annotations in positive examples; default/alias wrappers equivalent; known inference boundaries documented; all executed checks recorded. Release/publish and remote branch-protection changes are separate work.
Reproduction kit: `research/pipe-soundness/` (`reproduce.sh baseline|candidate`).

Global baseline gate (run at the end of every phase):

```bash
pnpm test:types          # tsc --noEmit (repo TS version)
pnpm vitest run          # runtime tests
pnpm build
node scripts/check-packed-pipe.mjs  # optional args: paths to additional tsc entrypoints
```

`research/pipe-soundness/reproduce.sh` and its transforms reproduce intermediate historical experiments; they are not the current implementation generator. Use `scripts/generate-pipe-overloads.mjs` and its `--check` mode for current signatures.

---

## Phase 0 — Decisions (blocking)

- [x] Resolve DC-1 … DC-6 in `DESIGN.md` (check the box and record the chosen option inline).
- [x] Mark `next.md` as superseded (header line pointing to `REQUIREMENTS.md`) or delete it.

Exit criteria: no `[ ]` left in the DESIGN decision checklist, or the remaining items are explicitly deferred with a target version.

## Phase 1 — Red tests first

- [x] Add `src/implement/composition/pipe.soundness.type-test.ts`, porting `research/pipe-soundness/probe.ts` (P1–P12).
- [x] Add async / SideEffect counterparts of P1, P3, P7, P8 for `pipeAsync`, `pipeSideEffect`, `pipeAsyncSideEffect`.

Baseline tests: the new file **fails** on current code (expected: unused `@ts-expect-error` at P1/P2/P3/P8/P12, P7 assertion). Commit with `// @ts-expect-error` cases intact so the failure is visible; or land together with Phase 2 if CI must stay green.
Exit criteria: failure list matches `reproduce.sh baseline` exactly.

## Phase 2 — Sound overloads (Changes 1–4) on the four permissive pipes

Files: `composition/pipe.ts`, `async/pipeAsync.ts`, `composition/pipeSideEffect.ts`, `async/pipeAsyncSideEffect.ts`.

- [x] ~~Remove the local `NoInfer` shim~~. Kept the shim instead (hover hygiene, no min-TS bump; DESIGN Change 1).
- [x] Change the first data-first step to `NoInfer<A>` in all 10 data-first overloads.
- [x] Add `PipeCheckFrom`. Replace the `PipeCheckWithInput` data-first fallback with the diagnostic overload, placed **last** before the implementation.
- [x] Delete the untyped catch-all overload.
- [x] Delete `PipeCheckWithInput` if it is no longer referenced.

Baseline tests: Phase 1 tests are green. All existing `*.type-test.ts` are green **except** `pipeWithDeps.type-test.ts` (expected to fail until Phase 3, per experiment v11).
Exit criteria: `reproduce.sh` shows the same results as the in-repo `pnpm test:types` (apart from `pipeWithDeps`).

## Phase 3 — Brands for `pipeWithDeps` dispatch (Change 5)

- [x] Add a unique brand to `pipe`, `pipeAsync`, `pipeSideEffect`, `pipeAsyncSideEffect`, `pipeSideEffectStrict`, `pipeAsyncSideEffectStrict`. Keep `__pipe_strict` and `__pipe_async_strict`.
- [x] Update `pipeWithDeps.ts` overloads to match on brands (`typeof x` already includes the brand once exported branded). Check overload order.
- [ ] Runtime: brands are non-enumerable `defineProperty`. Add one vitest check that `pipe.length` and call behavior are unchanged.

Baseline tests: `pnpm test:types` has 0 errors. `pipeWithDeps.test.ts` and `pipeWithDeps.type-test.ts` are green.
Exit criteria: candidate results equal experiment v13 (0/0/0).

## Phase 4 — Consolidation (per DC-1 / DC-2)

- [x] (DC-1) Re-implement `pipeStrict` / `pipeAsyncStrict` as branded aliases of `pipe` / `pipeAsync`, with JSDoc `@deprecated Use pipe — it is now strict by default.`
- [x] (DC-2 = B) Apply S1+S2 (`transform_strict.py`, `sideeffect_precise.py --collapse`) to `*SideEffectStrict`. Make `pipeSideEffect` / `pipeAsyncSideEffect` the precise implementation and turn `*SideEffectStrict` into `@deprecated` branded aliases.
- [x] (DC-2 = B) Rewrite the ~50 `Equal<…>` expectations in `pipe*.type-test.ts` / `runPipeResult.type-test.ts` to the precise types. Every rewritten expectation must be *narrower than or equal to* the old one; add an `Extends<New, Old>` assertion next to each as a compatibility guard.
- [x] (DC-2 = B) Rework `pipeWithDeps` dispatch and `ValidateStep` for the merged SideEffect variants. This covers the 6 `pipeWithDeps` errors in `reproduce.sh se4`.
- [-] ~~(DC-2 = C, 1.0 only)~~ Rejected (philosophy). Additionally apply `--fnfirst --anyguard` and alias `pipe` / `pipeAsync`. Resolve the "SideEffect into an effect-free pipeline" regression (2 tests) first.
- [x] Remove the now-dead code from the strict files (the ~570 lines of overloads each).
- [x] Docs corpus check: extract code samples from `docs/src/pages/*.tsx`, `README.md`, `fp-pack-full.md`, and `skills/fp-pack/**` and type-check them against the new build (a script or a manual pass). Record any sample that changes from compile to error.

Baseline tests: all type-tests are green, including the `pipeStrict` `@ts-expect-error` cases now served by the alias (experiment v14).
Exit criteria: the public export list is unchanged (aliases kept). Bundle size is equal or smaller (`pnpm build` and compare `dist/index.mjs`).

## Phase 5 — Toolchain & TS matrix (DC-4 / DC-5)

- [ ] CI job matrix: `typescript@5.9.3`, `@6.0`, `@7.0.2` running `tsc --noEmit -p .`.
- [ ] Consumer smoke job on the oldest TS version currently supported (DC-4: unchanged) that type-checks `dist/index.d.ts` usage only.
- [ ] (DC-5) Check that `vite-plugin-dts` works under TS 7 before switching the devDependency.
- [ ] (DC-5) Fix the pre-existing TS6196 in `sideEffect.ts` (`runPipeResult<T, R>` overload) without breaking explicit-generic call sites.

Baseline tests: all matrix jobs are green.
Exit criteria: the matrix is required in branch protection.

## Phase 6 — Documentation

- [~] `DESIGN.md`: the 0.14 architecture sections now carry a banner pointing to the revision; a full rewrite is deferred. Move the "Pipe Soundness Revision" content into the main architecture sections. Rewrite the Variants Matrix, the Design Philosophy item 3, and the Completeness Statement. Keep the superseded notes as a short history.
- [x] Docs site: `PipeChoiceGuide(_ko)`, `Pipe(_ko)`, `PipeStrict(_ko)`, `PipeAsync(_ko)`, `PipeAsyncStrict(_ko)`, `Guide(_ko)`, `Home(_ko)`, `Sidebar`, `Layout`, `apiData.ts`.
- [x] `README.md`, `fp-pack-full.md`, `fp-pack-agent-addon.md`, `skills/fp-pack/SKILL.md`, `skills/fp-pack/constraints/core-rules.md`: default pipes check compatibility and infer precise effects; all `*Strict` names are deprecated compatibility aliases.
- [x] Release notes for 0.15.0 with a migration section (code that silently became `never` / `any` now errors).

Baseline tests: `pnpm docs:build` and `pnpm docs:lint` pass.
Exit criteria: `grep -rn "pipeStrict" docs README.md skills` only hits deprecation notes.

## Phase 7 — Test Hardening

- [ ] Negative-case sweep: for every curried util used in `pipe.util.*.type-test.ts`, add one mismatched-step `@ts-expect-error`.
- [ ] Edge cases: generic step (`identity`), overloaded step function, optional-param step `(x?: number)`, default-param step `(a, b = 1)`, `readonly T[]` → `T[]` (must error), `any` / `unknown` input, `as const` input, `from()` in the middle of a pipeline.
- [ ] Error-message snapshot: compile P1 and P3 in a fixture and assert the `PipeError<…>` text appears (guards DC-3 and FR-8).
- [ ] Perf guard: record `--extendedDiagnostics` instantiations for the type-test project. Fail if they grow more than 20% over the Phase 3 number (baseline 220,851 on TS 5.9).

Exit criteria: all green on the TS matrix.

## Phase 8 — Integration Test

- [ ] `pnpm build`, then `npm pack`, then install the tarball into a fresh consumer project (TS 5.4, 5.9, 7.0). Type-check a consumer file covering all 4 (or 6) pipes, `pipeWithDeps`, and the `fp-pack/stream` entry.
- [ ] Run the `demo/` app type-check against the packed build.
- [ ] Run `MANUAL_TEST_CHECKLIST.md`.

Exit criteria: all manual checks pass and the release is tagged.

---

## Status Log

### 2026-10-02 — 0.15.0 prepared for owner publication
- Completed: package version 0.15.0, normalized repository metadata, packaged CHANGELOG, README publishing/migration instructions, EN/KO guide and API corrections. CommonJS exports now use `.umd.cjs`, with browser `.umd.js` paths preserved. Type-test declarations are excluded from dist; skills/addon versions are stamped during build.
- Automation: `prepublishOnly` runs `release:check` (type/runtime tests, build, installed-tarball smoke, docs lint/build). The smoke script explicitly disables inherited dry-run flags only for local packing/installing so `npm publish --dry-run` tests real consumer artifacts without uploading.
- Validation: full `npm publish --dry-run` passed with 388 runtime tests in 162 files, source types, library/declaration builds, packaged ESM/CommonJS main and stream checks, and docs lint/build. The 0.15.0 tarball also passed consumer type checking and declaration emission on TS 5.9.3 / 6.0.3 / 7.0.2. Eleven README and EN/KO snippets compiled against the installed 0.15.0 package. `git diff --check` passed.
- Next: owner reviews/merges into main, installs the lockfile dependencies, then runs `npm publish` with package credentials. Hosting deployment, tagging, remote CI/branch-protection and the historical interactive IDE sign-off are separate owner actions.
- Blockers: none for publication preparation. Latest commit: `a00dcd7`; changes remain in the working tree. No upload, merge, tag or push was performed.

### 2026-10-02 — Inference-first follow-up complete locally
- Completed: 32-step contextual signatures on all four pipes and `pipeWithDeps`; safe typed fallbacks; identical default/Strict wrapper signatures; repaired `from()` validation and optional/default entries; preserved effects from initial values in long typed chains. Added public `PipeWithDeps` type so inferred exported wrappers emit declarations without user annotations. Renamed unused `runPipeResult` type parameter to `_T` without changing positional generic arguments.
- Tests: new `pipe.inference.type-test.ts` paired positive/negative regressions fail before and pass after; full TS 5.9.3 / 6.0.3 / 7.0.2 checks pass. Runtime 388/388 (162 files). Build + declarations, docs lint/build pass. `check-packed-pipe.mjs` passes consumer type checking and declaration emission on all three compilers, plus packaged ESM/stream runtime checks. Ten updated EN/KO wrapper examples compile against the packed package.
- Cost: 126,084 → 144,800 instantiations with the existing corpus (+14.8%, within 20% budget); 232,065 including the new boundary regressions. Runtime algorithms are preserved.
- Decisions: inference remains the primary UX requirement; Strict names remain compatibility aliases. Contextual inference is bounded to 32 steps after the first argument, and longer inline chains should compose smaller pipelines. No claim of arbitrary-length inference or safety through explicit `any`/unchecked assertions.
- Next: review this diff; CI automation, the historical full per-utility sweep, editor/manual release sign-off, version bump and publication remain release work.
- Blockers: none for this follow-up. Latest commit: `a00dcd7`; follow-up changes are in the working tree.

### 2026-10-01 — Research complete, docs drafted
- Completed: Issue #5 root-cause analysis. TS 5.9/6.0/7.0 comparison (no inference difference). Candidate validated in scratch (v13/v14 = 0 errors on all three TS versions). Reproduction kit at `research/pipe-soundness/`. REQUIREMENTS/DESIGN/IMPLEMENT/MANUAL_TEST_CHECKLIST drafted.
- Next step: Phase 0 (owner resolves DC-1 … DC-6).
- Blockers: none technical. Waiting on decisions.
- Latest commit: `fe36dc5` (docs not yet committed).

### 2026-10-01 — SideEffect consolidation experiments (DC-2)
- Completed: S0–S6 experiments. Added `reproduce.sh se4|se2`, `transform_strict.py`, `sideeffect_precise.py`. The 4-pipe model has no inference regressions (only expectation changes + `pipeWithDeps`). In the 2-pipe model all pure pipe type tests pass, with 2 SideEffect-input regressions. Runtime suite 386/386 in both.
- Next step: owner chooses DC-2 A/B/C.
- Blockers: none.

### 2026-10-01 — 4-pipe model implemented (branch `feat/pipe-soundness`)
- Completed: Phases 0–3 and the code part of Phase 4. `pipe`/`pipeAsync` are sound. `pipeSideEffect*` are sound and precise. All four `*Strict` are deprecated branded aliases. `pipeWithDeps` has 4 modes. `pipe.soundness.type-test.ts` was added. ~50 expectations were rewritten with `Legacy` compatibility guards. Net −2,247 lines in `src`.
- Verified: `tsc --noEmit` has 0 errors on TS 5.9.3 and 6.0.3. On TS 7.0.2 the only error is a pre-existing `runPipeResult` unused type param (TS6196, untouched file; see DC-5). vitest 386/386. `vite build` + dts OK.
- Not done yet: Phase 4 docs-corpus check, Phase 5 CI matrix, Phase 6 user-facing docs (README, docs site EN/KO, skills, fp-pack-full / agent-addon), Phase 7 hardening, Phase 8 integration (npm pack consumer).
- Next step: Phase 6 docs.
- Blockers: none.
- Latest commit: `fe36dc5` (branch changes not yet committed).

### 2026-10-01 — Unified signatures + Phase 6 docs (uncommitted on `feat/pipe-soundness`)
- Docs corpus check found that function-first pipelines with inline lambdas in generic helpers (`pipe(double, tap((x) => …))`) had never inferred; 0.14 hid it behind the `any` catch-all. A first fix (plain function-first group) broke data-first stream examples (overload pre-typing). Final fix: one signature per arity for both call styles (`research/pipe-soundness/unified.py`); `NoInfer`, `ValidateFn` and the ZeroFn/FromFn groups are gone. `any` input is data (`IsFn`).
- `pipeWithDeps(pipeSideEffect*)` keeps 0.14 argument handling; deprecated `*SideEffectStrict` aliases dispatch to a checked mode.
- Docs: site EN/KO (~45 pages), README, fp-pack-full, agent addon, skills updated; CHANGELOG added; ~30 docs examples rewritten (data-first / typed wrappers / real bug fixes).
- Verified: tsc 0 on TS 5.9 and 6.0 (TS 7.0: pre-existing `runPipeResult` TS6196 only), vitest 386/386, build + dts OK, docs build + lint OK, docs corpus 502 → 357 errors, instantiations 214k → 126k.
- Next step: commit; then Phase 5 (CI matrix), Phase 7 hardening, Phase 8 `npm pack` consumer test.
- Blockers: none.
