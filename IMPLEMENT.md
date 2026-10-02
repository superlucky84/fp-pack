# IMPLEMENT — Pipe Soundness & Variant Consolidation

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
