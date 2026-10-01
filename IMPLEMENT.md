# IMPLEMENT — Pipe Soundness & Variant Consolidation

Source of truth: `REQUIREMENTS.md` (what), `DESIGN.md` § Pipe Soundness Revision (how and decisions), `MANUAL_TEST_CHECKLIST.md` (release gate).
Reproduction kit: `research/pipe-soundness/` (`reproduce.sh baseline|candidate`).

Global baseline gate (run at the end of every phase):

```bash
pnpm test:types          # tsc --noEmit (repo TS version)
pnpm vitest run          # runtime tests
research/pipe-soundness/reproduce.sh candidate   # once Phase 1 lands: expect 0/0/0 on TS 5.9/6.0/7.0
```

---

## Phase 0 — Decisions (blocking)

- [x] Resolve DC-1 … DC-6 in `DESIGN.md` (check the box and record the chosen option inline).
- [ ] Mark `next.md` as superseded (header line pointing to `REQUIREMENTS.md`) or delete it.

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
- [ ] Docs corpus check: extract code samples from `docs/src/pages/*.tsx`, `README.md`, `fp-pack-full.md`, and `skills/fp-pack/**` and type-check them against the new build (a script or a manual pass). Record any sample that changes from compile to error.

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

- [ ] `DESIGN.md`: move the "Pipe Soundness Revision" content into the main architecture sections. Rewrite the Variants Matrix, the Design Philosophy item 3, and the Completeness Statement. Keep the superseded notes as a short history.
- [ ] Docs site: `PipeChoiceGuide(_ko)`, `Pipe(_ko)`, `PipeStrict(_ko)`, `PipeAsync(_ko)`, `PipeAsyncStrict(_ko)`, `Guide(_ko)`, `Home(_ko)`, `Sidebar`, `Layout`, `apiData.ts`.
- [ ] `README.md`, `fp-pack-full.md`, `fp-pack-agent-addon.md`, `skills/fp-pack/SKILL.md`, `skills/fp-pack/constraints/core-rules.md`: change "use pipeStrict for strictness" guidance to "pipe is strict; *SideEffectStrict = precise effect types".
- [ ] Release notes for 0.15.0 with a migration section (code that silently became `never` / `any` now errors).

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
