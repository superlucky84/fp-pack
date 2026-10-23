# MANUAL TEST CHECKLIST — Inference Usability

## Interactive playground checks — 2026-10-23

| ID | Check | Pass criterion |
|---|---|---|
| PG-MT-1 | Open EN/KO playground, sidebar/search, return to docs | Correct route/language and full-width layout |
| PG-MT-2 | Change curryN presets, grouped/default/undefined/rest/reuse/zero | Real results and stages match independently expected values |
| PG-MT-3 | Order filters, optional profile, merge/evolve changes | Results update; input remains unchanged; empty/missing cases work |
| PG-MT-4 | Sync/async streams and early zip termination | Correct sequence, mapped-count trace and both cleanup markers |
| PG-MT-5 | Valid/blocked effect pipeline | Early exit prevents later steps; handled output is visible |
| PG-MT-6 | Edit TypeScript and check valid/invalid presets | Genuine inferred variable types and line diagnostics; no code execution |
| PG-MT-7 | Run all cases, random challenge, reset, switch while async pending | Repeatable results, no stale output, useful busy/error recovery |
| PG-MT-8 | Narrow viewport and keyboard navigation | No page overflow, labeled controls, visible focus, readable results |
| PG-MT-9 | Open deployed private demo | Default Korean playground, assets/worker load and presets work |

Status: automated scenario/compiler coverage passed (53 new tests); full suite
467 tests/167 files, source/docs types, lint, standard/standalone builds and
installed-package TS 5.9 consumer passed. Chromium against development and
production builds verified desktop 1440x1000/mobile 390x844: 21 batch checks,
worker positive/negative examples, edited code, async supersession, language/docs
navigation and optional-argument controls; no unexpected console/page errors or
horizontal overflow. PG-MT-9 deployed-host check remains pending. Tests against a
local production build do not establish remote deployment success.

## curryN checks — 2026-10-23

| ID | Check | Pass criterion |
|---|---|---|
| CN-MT-1 | Default and optional parameters, count 1 vs 2 | Execution follows chosen count; no added result generic/cast |
| CN-MT-2 | Required prefix plus rest and grouped final call | Correct argument order and return type; invalid rest values rejected |
| CN-MT-3 | Reuse partials, call an empty stage, pass undefined | Partials stay independent; empty call waits; defaults apply to undefined |
| CN-MT-4 | Count 0/32 and invalid count/argument values | No eager zero execution; correct upper-bound typing and clear errors |
| CN-MT-5 | Callback parameters, literal/Promise results and pipes | IDE types agree with source and installed-consumer regressions |
| CN-MT-6 | EN/KO curryN navigation and examples | Sidebar/search/route discover the page; rendered examples follow contract |

Status: implementation and automated coverage complete. Source types and all
414 runtime tests pass. Installed ESM/CJS execution and declaration emission on
TS 5.9.3 / 6.0.3 / 7.0.2 pass, including the new curryN corpus and 59 documentation
snippets (nine new curryN snippets). Library/declaration build and docs lint/build
pass. Route/sidebar/search registrations include both language pages.
Interactive editor/browser inspection remains unsigned and is separate from the
compiler/runtime evidence.

## Active checks — 2026-10-22

Use the installed package in an editor, with its workspace TypeScript selected.
Automation verifies types/runtime separately; do not mark IDE checks as performed
based solely on compiler results. See REQUIREMENTS IU-* and DESIGN IU-DC-*.

| ID | Check | Pass criterion |
|---|---|---|
| IU-MT-1 | Pipe an object through evolve changing number to string | Callback input is number, result property string; downstream numeric operation is rejected |
| IU-MT-2 | Merge conflicting property types and nested records | Output matches the right-hand runtime value, not an impossible intersection |
| IU-MT-3 | Read required/optional props; pick/omit optional keys | No added hints; exact optionality is retained |
| IU-MT-4 | Nullable arrays through getOrElse([]) and map | Element callback is the input model, with no never[] or corrective cast |
| IU-MT-5 | Path and flattenDeep inference | Hover comes from source/path; false expected output types are rejected |
| IU-MT-6 | Use readonly arrays and inferred type guards | Nonmutating operations accept input; narrowed values flow to next step |
| IU-MT-7 | Save stream.take(2), then use with sync/async sources | Both modes retain element type and correct iterator protocol |
| IU-MT-8 | Async predicate over toAsync([1,2,3]) | Result is [2,3]; invalid sync/async mixtures fail clearly |
| IU-MT-9 | Compose incompatible functions and use generic single pipe | Incompatible chain is rejected; supported generic relationship retained |
| IU-MT-10 | Curried branches and SideEffect matching | Inferred result union survives; no unknown at the handling boundary |
| IU-MT-11 | Read migration examples in README and EN/KO docs | Contracts and examples agree with installed declarations and runtime |

Status: implementation and automated coverage complete. Interactive editor hover
inspection and browser sign-off remain pending; they are not implied by compiler
or build success.

Hardening automation also checks optional transformer tables, enumerable symbols,
Promise-valued sync elements versus awaited async elements, and accumulator modes.

Automated evidence (2026-10-22, `feat/inference-usability`): 403/403 runtime tests
in 164 files; source types and generated-signature check; library/declaration
build; installed ESM/CJS execution; installed new type corpus plus 50 README/EN/KO
examples and declaration emission on TypeScript 5.9.3 / 6.0.3 / 7.0.2 with
exactOptionalPropertyTypes; docs lint/build; `git diff --check`. IU-MT-1–11 have
matching automated evidence; the interactive parts remain unsigned.

## Historical checks — Pipe Soundness Release (0.15.0)

Run these in a fresh consumer project that installs the packed tarball (`npm pack`), in VS Code, once with TS 5.9 and once with TS 7.0 (select the workspace TS version).
Pass = every row behaves as described. Any deviation fails the release.

| ID | Check | Steps | Pass criteria |
|----|-------|-------|---------------|
| MT-1 | Issue #5 reproduction | `const fn1 = (id: number) => id; const fn2 = (s: string) => s; pipe(1, fn1, fn2);` and the same with `pipeAsync`, `pipeSideEffect`, `pipeAsyncSideEffect`, `pipeSideEffectStrict` | Red squiggle on every call. Nothing resolves to `never` or `any` on hover |
| MT-2 | Error readability (data-first) | Hover or read the error for MT-1 `pipe` | The message mentions `PipeError<number, string>` |
| MT-3 | Error readability (function-first) | `pipe(fn1, fn2)` | It errors. The message text matches whatever DC-3 decided |
| MT-4 | Inline DX unchanged | `pipe(1, x => x + 1, x => \`${x}\`, s => s.length)` | No error. Every lambda param hover shows the concrete type. The result is `number` |
| MT-5 | Inline → predefined | `pipe(1, x => x.toString(), (s: string) => s.length)` | No error. The result is `number` |
| MT-6 | Subtype input (former bug) | `pipe({ a: 1, b: 2 }, (o: { a: number }) => o.a)` | No error. The result is `number` (it was `never` in 0.14) |
| MT-7 | Curried utils | `pipe([1, 2, 3], map(x => x * 2), filter(x => x > 2), sortBy(x => -x))` | No error. `x` hovers show `number`. The result is `number[]` |
| MT-8 | 11+ steps | An 11-step valid chain, then the same chain with one mismatched step | Valid: correct result type. Mismatched: error |
| MT-9 | Deprecated aliases | `pipeStrict(1, fn1, fn2)`, and `pipeStrict` on a valid chain | Same behavior as `pipe`. The IDE shows strikethrough with the `@deprecated` note |
| MT-10 | SideEffect precision | `pipeSideEffect` with two steps returning different `SideEffect.of(() => 'A' as const)` / `'B'`, and one with no effect-returning step | The first hover shows `T \| SideEffect<'A' \| 'B'>`; the effect-free one shows plain `T` |
| MT-11 | `pipeWithDeps` | `pipeWithDeps(pipe)`, `pipeWithDeps(pipeSideEffect)`, `pipeWithDeps(pipeAsyncSideEffectStrict)` with a deps-using step | Each returns the documented curried `(deps) => …` shape. Deps are intersected |
| MT-12 | Runtime unchanged | Run the README examples in Node (ESM and the UMD build) | Same outputs as 0.14.0. `Object.keys(pipe)` is empty (brands are non-enumerable) |
| MT-13 | `fp-pack/stream` entry | Import from `fp-pack/stream` and type-check a pipe using stream utils | No new errors |
| MT-14 | Docs site | `pnpm docs:dev`. Open the Pipe Choice Guide, pipe, pipeStrict, and pipeAsync pages (EN/KO) | The guidance matches the new model. No dead links |
| MT-15 | Function-first + generic helper | `pipe(double, tap((x) => x.toFixed()), addTen)` and `pipe(zip(timestamps(), events()), filter(([e]) => e.type === 'click'), toArray)` | No error. `x` hovers as `number`, `e` as the event type |
| MT-16 | `any` input | `pipe(anyValue, (v) => v.length as number)` | Result is `number`, not a function type |
| MT-17 | Generic-first function-first (migration) | `pipe(uniq, sort(...))` | Reports an error. The CHANGELOG fix (`(values: string[]) => pipe(values, uniq, …)`) compiles |

Sign-off: ______ (date / TS versions tested / commit SHA)

Inference-first follow-up gates (2026-10-02):

- [ ] Long unannotated chains retain concrete parameter/result hovers. Insert an incompatible operation late in the chain and verify it errors. Exercise the documented contextual-inference boundary and fallback separately.
- [ ] `pipeWithDeps` propagates unannotated value parameters through mixed sync/async steps and infers the intersection of declared dependency contracts.
- [ ] Replacing any Strict alias with its default variant preserves both accepted and rejected wrapper examples, including `from()`.
- [ ] Optional/default first parameters can still be omitted in short and long pipelines.
- [ ] No positive example needs a new assertion or redundant annotation merely to satisfy the redesigned signatures.

Automated evidence (working tree after `a00dcd7`): type regressions and packed-consumer declaration emission pass on TS 5.9.3 / 6.0.3 / 7.0.2; 388 runtime tests pass; ten updated EN/KO wrapper snippets compile against the tarball. IDE hover inspection and interactive release sign-off above remain manual.

Publication preparation checks:

- [x] `npm publish --dry-run` runs the release checks and builds version 0.15.0 without uploading it.
- [x] The installed tarball includes CHANGELOG.md and skills/addons labeled with the package version; type-test declaration fixtures are excluded.
- [x] Both `fp-pack` and `fp-pack/stream` work through ESM imports and CommonJS `require()`; browser UMD files remain present.
- [x] README and EN/KO migration guidance describe the same four pipes, deprecated aliases, effect precision and contextual inference boundary.

Publication evidence (2026-10-02): full hook dry run passed; 388/388 runtime tests, library/declaration build and docs lint/build passed. Installed 0.15.0 consumer checks passed on TS 5.9.3 / 6.0.3 / 7.0.2; eleven README/EN/KO snippets compiled against that tarball. Interactive IDE checks above have not been signed off by this automated run.
