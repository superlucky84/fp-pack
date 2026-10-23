import { mount, mountCallback } from 'lithent';
import { appStore, navigateTo, setLanguage } from '@/store';
import {
  getProgram,
  initialState,
  labs,
  modes,
  presets,
  runScenario,
  sameValue,
  typeExamples,
  type DemoResult,
  type DemoState,
  type Lab,
  type Preset,
} from '@/playground/scenarios';
import { createRunGate } from '@/playground/session';
import type { TypeReport } from '@/playground/checker';
import '@/playground/playground.css';

const pretty = (value: unknown): string =>
  value === undefined
    ? 'undefined'
    : (JSON.stringify(value, null, 2) ?? String(value));

export const Playground = mount(renew => {
  const store = appStore.watch(renew);
  let state = { ...initialState };
  let selected = presets[0];
  let result: DemoResult | undefined;
  let runtimeError = '';
  let running = false;
  let code = getProgram(state);
  let report: TypeReport | undefined;
  let checking = false;
  let checkerError = '';
  let worker: Worker | undefined;
  let workerId = 0;
  let workerTimer: ReturnType<typeof setTimeout> | undefined;
  let copyTimer: ReturnType<typeof setTimeout> | undefined;
  let copied = false;
  let disposed = false;
  let activeExample = typeExamples[0].id;
  const visited = new Set<Lab>(['curry']);
  const gate = createRunGate();
  let showTests = false;
  let testing = false;
  let testRows: { id: string; passed: boolean; actual: string }[] = [];

  const stopWorker = () => {
    worker?.terminate();
    worker = undefined;
    workerId++;
    checking = false;
    clearTimeout(workerTimer);
  };
  const changeCode = (next: string) => {
    if (checking) stopWorker();
    code = next;
    report = undefined;
    checkerError = '';
    copied = false;
    renew();
  };
  const run = async () => {
    const id = gate.next();
    const snapshot = { ...state };
    running = true;
    runtimeError = '';
    result = undefined;
    renew();
    try {
      const next = await runScenario(
        snapshot,
        snapshot.mode === 'async' ? 30 : 0
      );
      if (disposed || !gate.current(id)) return;
      result = next;
    } catch (error) {
      if (disposed || !gate.current(id)) return;
      runtimeError = error instanceof Error ? error.message : String(error);
    } finally {
      if (!disposed && gate.current(id)) {
        running = false;
        renew();
      }
    }
  };
  const update = (patch: Partial<DemoState>) => {
    state = { ...state, ...patch };
    changeCode(getProgram(state));
    void run();
  };
  const choose = (preset: Preset) => {
    selected = preset;
    state = { ...preset.state };
    visited.add(state.lab);
    changeCode(getProgram(state));
    void run();
  };
  const checkTypes = () => {
    if (checking || disposed) return;
    checkerError = '';
    report = undefined;
    checking = true;
    const id = ++workerId;
    try {
      worker ??= new Worker(
        new URL('../playground/typecheck.worker.ts', import.meta.url),
        { type: 'module' }
      );
      worker.onmessage = (
        event: MessageEvent<{ id: number; report?: TypeReport; error?: string }>
      ) => {
        if (disposed || event.data.id !== workerId) return;
        clearTimeout(workerTimer);
        checking = false;
        report = event.data.report;
        checkerError = event.data.error ?? '';
        renew();
      };
      worker.onerror = () => {
        if (disposed) return;
        stopWorker();
        checkerError = 'Compiler could not load. Please retry.';
        renew();
      };
      workerTimer = setTimeout(() => {
        stopWorker();
        checkerError =
          'Type checking timed out. Simplify the example and retry.';
        renew();
      }, 30000);
      worker.postMessage({ id, code });
    } catch (error) {
      stopWorker();
      checkerError = error instanceof Error ? error.message : String(error);
    }
    renew();
  };
  const selectLab = (lab: Lab) => {
    visited.add(lab);
    if (lab === 'types') {
      gate.invalidate();
      running = false;
      state = { ...state, lab };
      activeExample = typeExamples[0].id;
      changeCode(typeExamples[0].code);
      checkTypes();
    } else choose(presets.find(preset => preset.state.lab === lab)!);
  };
  const runAll = async () => {
    if (testing) return;
    testing = true;
    showTests = true;
    testRows = [];
    renew();
    try {
      for (const preset of presets) {
        try {
          const output = await runScenario(preset.state);
          if (disposed) return;
          testRows = [
            ...testRows,
            {
              id: preset.id,
              passed: sameValue(output.value, preset.expected),
              actual: pretty(output.value),
            },
          ];
        } catch (error) {
          if (disposed) return;
          testRows = [
            ...testRows,
            { id: preset.id, passed: false, actual: String(error) },
          ];
        }
        renew();
      }
    } finally {
      if (!disposed) {
        testing = false;
        renew();
      }
    }
  };
  const reset = () => {
    stopWorker();
    visited.clear();
    visited.add('curry');
    choose(presets[0]);
  };

  mountCallback(() => {
    void run();
    return () => {
      disposed = true;
      gate.invalidate();
      stopWorker();
      clearTimeout(copyTimer);
    };
  });

  return () => {
    const ko = store.route.startsWith('/ko');
    const t = (korean: string, english: string) => (ko ? korean : english);
    const language = ko ? 0 : 1;
    const lab = labs.find(item => item.id === state.lab)!;
    const matching = sameValue(state, selected.state);
    const passed =
      matching && result && sameValue(result.value, selected.expected);
    const inputNumber = (
      key: 'amount' | 'extra' | 'limit' | 'threshold',
      label: string,
      min: number,
      max: number,
      step = 1
    ) => (
      <label class="pg-field">
        <span>
          {label}
          <output>{state[key].toLocaleString()}</output>
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={state[key]}
          onInput={(event: Event) => {
            const value = Number((event.target as HTMLInputElement).value);
            if (Number.isFinite(value))
              update({ [key]: Math.max(min, Math.min(max, value)) });
          }}
        />
      </label>
    );
    const toggle = (label: string) => (
      <label class="pg-toggle">
        <input
          type="checkbox"
          checked={state.enabled}
          onChange={(event: Event) =>
            update({ enabled: (event.target as HTMLInputElement).checked })
          }
        />
        <span>{label}</span>
      </label>
    );

    return (
      <div class="pg" lang={ko ? 'ko' : 'en'}>
        <a href="#pg-main" class="pg-skip">
          {t('본문으로 이동', 'Skip to content')}
        </a>
        <header class="pg-header">
          <a
            href={ko ? '#/ko' : '#/'}
            class="pg-brand"
            onClick={(event: Event) => {
              event.preventDefault();
              navigateTo('/');
            }}
          >
            <span class="pg-logo">fp.</span>
            <span>
              fp-pack <b>PLAYGROUND</b>
            </span>
          </a>
          <nav aria-label={t('페이지 메뉴', 'Page navigation')}>
            <span class="pg-build">
              <i />
              {t('개선 브랜치 데모', 'Feature branch demo')}
            </span>
            <button
              type="button"
              class="pg-text-button"
              onClick={() => setLanguage(ko ? 'en' : 'ko')}
            >
              {ko ? 'EN' : '한국어'}
            </button>
            <a
              href={ko ? '#/ko' : '#/'}
              onClick={(event: Event) => {
                event.preventDefault();
                navigateTo('/');
              }}
            >
              {t('문서 보기', 'Documentation')} ↗
            </a>
          </nav>
        </header>

        <main id="pg-main" class="pg-main">
          <section class="pg-hero">
            <div>
              <span class="pg-eyebrow">
                SMALL FUNCTIONS. REAL POSSIBILITIES.
              </span>
              <h1>
                {t('작게 연결하고,', 'Connect the little things.')}
                <br />
                <em>{t('직접 확인하세요.', 'See what happens.')}</em>
              </h1>
              <p>
                {t(
                  '인자를 나눠보고, 데이터를 흘려보고, 타입을 틀려보세요.\n개선한 fp-pack을 손으로 만져보는 여섯 가지 실험.',
                  'Split the arguments. Let the data flow. Break a type.\nSix hands-on experiments with the improved fp-pack.'
                )}
              </p>
              <div class="pg-hero-actions">
                <button
                  type="button"
                  class="pg-primary"
                  onClick={() => {
                    const options = presets.filter(
                      preset => preset.id !== selected.id
                    );
                    choose(options[Math.floor(Math.random() * options.length)]);
                  }}
                >
                  ↝ {t('랜덤 챌린지', 'Surprise me')}
                </button>
                <button
                  type="button"
                  class="pg-secondary"
                  disabled={testing}
                  onClick={() => void runAll()}
                >
                  {testing
                    ? t('검사 중…', 'Checking…')
                    : `✓ ${t('전체', 'Run all')} ${presets.length}${t('개 케이스 검사', ' checks')}`}
                </button>
              </div>
            </div>
            <div class="pg-hero-art" aria-hidden="true">
              <div class="pg-orbit pg-orbit-one" />
              <div class="pg-orbit pg-orbit-two" />
              <span class="pg-art-node pg-node-input">
                input <b>●</b>
              </span>
              <span class="pg-art-node pg-node-pipe">
                pipe<span>→ → →</span>
              </span>
              <span class="pg-art-node pg-node-output">
                <b>✓</b> inferred
              </span>
              <span class="pg-art-caption">less ceremony, more flow.</span>
            </div>
          </section>

          <div class="pg-section-label">
            <span>{t('무엇부터 만져볼까요?', 'PICK AN EXPERIMENT')}</span>
            <span>
              {visited.size} / 6 {t('둘러봄', 'explored')}
            </span>
          </div>
          <nav
            class="pg-labs"
            aria-label={t('실험 선택', 'Choose an experiment')}
          >
            {labs.map(item => (
              <button
                type="button"
                key={item.id}
                class={`pg-lab ${state.lab === item.id ? 'is-active' : ''}`}
                aria-pressed={state.lab === item.id}
                onClick={() => selectLab(item.id)}
              >
                <span class="pg-lab-number">
                  {item.icon}
                  <span>{visited.has(item.id) ? '↗' : '+'}</span>
                </span>
                <strong>{item.title[language]}</strong>
                <small>{item.detail[language]}</small>
              </button>
            ))}
          </nav>

          <section class="pg-workbench" aria-label={lab.title[language]}>
            <div class="pg-workbench-title">
              <div>
                <span class="pg-eyebrow">EXPERIMENT {lab.icon}</span>
                <h2>{lab.title[language]}</h2>
                <p>{lab.apis}</p>
              </div>
              <button type="button" class="pg-text-button" onClick={reset}>
                ↺ {t('처음으로', 'Reset all')}
              </button>
            </div>

            {state.lab !== 'types' ? (
              <div class="pg-runtime-grid">
                <aside class="pg-controls">
                  <span class="pg-eyebrow">
                    01 / {t('입력 바꾸기', 'MAKE IT YOURS')}
                  </span>
                  <label class="pg-field">
                    <span>{t('실험 방식', 'Mode')}</span>
                    <select
                      value={state.mode}
                      onChange={(event: Event) =>
                        update({
                          mode: (event.target as HTMLSelectElement).value,
                        })
                      }
                    >
                      {modes[state.lab].map(mode => (
                        <option key={mode[0]} value={mode[0]}>
                          {mode[ko ? 1 : 2]}
                        </option>
                      ))}
                    </select>
                  </label>
                  {state.lab === 'curry' && state.mode !== 'zero' ? (
                    <>
                      {inputNumber(
                        'amount',
                        t('첫 번째 값', 'First value'),
                        -10,
                        50
                      )}
                      {state.mode !== 'optional'
                        ? inputNumber(
                            'extra',
                            t('두 번째 값', 'Second value'),
                            -10,
                            50
                          )
                        : toggle(t('단위 kg 전달', 'Supply unit kg'))}
                    </>
                  ) : null}
                  {state.lab === 'orders' ? (
                    <>
                      {inputNumber(
                        'threshold',
                        t('최소 가격', 'Minimum price'),
                        3000,
                        6500,
                        100
                      )}
                      {inputNumber(
                        'limit',
                        t('최대 메뉴 수', 'Maximum items'),
                        1,
                        6
                      )}
                      {toggle(t('재고 있는 메뉴만', 'In-stock items only'))}
                    </>
                  ) : null}
                  {state.lab === 'profile' ? (
                    <>
                      {inputNumber(
                        'amount',
                        t('원본 점수', 'Original score'),
                        0,
                        100
                      )}
                      {toggle(t('다크 테마로 병합', 'Merge a dark theme'))}
                    </>
                  ) : null}
                  {state.lab === 'stream' &&
                  ['sync', 'async'].includes(state.mode) ? (
                    <>
                      {inputNumber(
                        'threshold',
                        t('2배 한 값의 하한', 'Minimum doubled value'),
                        2,
                        50,
                        2
                      )}
                      {inputNumber(
                        'limit',
                        t('가져올 개수', 'Items to take'),
                        1,
                        8
                      )}
                    </>
                  ) : null}
                  {state.lab === 'effects' ? (
                    <>
                      {inputNumber('amount', t('나이', 'Age'), 0, 35)}
                      {toggle(t('회원 할인 적용', 'Member discount'))}
                    </>
                  ) : null}
                  <div class="pg-challenge">
                    <span>↝ {t('이번 챌린지', 'YOUR CHALLENGE')}</span>
                    <strong>{selected.label[language]}</strong>
                    <p>{selected.goal[language]}</p>
                  </div>
                  <label class="pg-field">
                    <span>{t('다른 케이스 해보기', 'Try another case')}</span>
                    <select
                      value={selected.id}
                      onChange={(event: Event) =>
                        choose(
                          presets.find(
                            preset =>
                              preset.id ===
                              (event.target as HTMLSelectElement).value
                          )!
                        )
                      }
                    >
                      {presets
                        .filter(preset => preset.state.lab === state.lab)
                        .map(preset => (
                          <option key={preset.id} value={preset.id}>
                            {preset.label[language]}
                          </option>
                        ))}
                    </select>
                  </label>
                </aside>
                <div class="pg-output">
                  <div class="pg-output-header">
                    <span class="pg-eyebrow">
                      02 / {t('실제 실행 결과', 'THE REAL RESULT')}
                    </span>
                    <span
                      role="status"
                      class={`pg-status ${running ? '' : runtimeError ? 'is-error' : 'is-good'}`}
                    >
                      <i />
                      {running
                        ? t('흐르는 중…', 'Flowing…')
                        : runtimeError
                          ? t('실행 오류', 'Execution error')
                          : passed
                            ? t('예상 결과와 일치', 'Matches expected')
                            : t('실시간 결과', 'Live result')}
                    </span>
                  </div>
                  {runtimeError ? (
                    <div class="pg-error">
                      {runtimeError}
                      <button type="button" onClick={() => void run()}>
                        {t('다시 실행', 'Retry')}
                      </button>
                    </div>
                  ) : running ? (
                    <div class="pg-pending">
                      <span class="pg-spinner" />
                      {t(
                        '비동기 소스에서 값을 가져오고 있어요.',
                        'Pulling values from the asynchronous source.'
                      )}
                    </div>
                  ) : result ? (
                    <>
                      <div
                        class={`pg-result ${typeof result.value === 'number' || typeof result.value === 'string' ? 'is-scalar' : ''}`}
                        data-testid="runtime-result"
                      >
                        <pre>{pretty(result.value)}</pre>
                      </div>
                      <details class="pg-expected">
                        <summary>
                          {t(
                            '예상 결과와 비교',
                            'Compare with the expected result'
                          )}
                          {matching
                            ? ''
                            : t(' · 입력을 변경했어요', ' · inputs changed')}
                        </summary>
                        <p>
                          {matching
                            ? t(
                                '현재 프리셋의 독립된 기대값입니다.',
                                'Independent expected value for this preset.'
                              )
                            : t(
                                '원래 챌린지 입력의 기대값입니다. 프리셋을 다시 선택하면 비교할 수 있어요.',
                                'This is the original preset expectation. Select the preset again to compare.'
                              )}
                        </p>
                        <pre>{pretty(selected.expected)}</pre>
                      </details>
                      <div class="pg-stage-heading">
                        {t('데이터가 지나온 길', 'FOLLOW THE DATA')}
                        <span>
                          {result.stages.length} {t('단계', 'stages')}
                        </span>
                      </div>
                      <div class="pg-stages">
                        {result.stages.map((stage, index) => (
                          <details
                            key={`${state.lab}-${index}`}
                            class="pg-stage"
                            open={index === result!.stages.length - 1}
                          >
                            <summary>
                              <b>{String(index + 1).padStart(2, '0')}</b>
                              <code>{stage.label}</code>
                              <span>↗</span>
                            </summary>
                            <pre>{pretty(stage.value)}</pre>
                          </details>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            ) : (
              <div class="pg-types-intro">
                <div>
                  <h3>
                    {t('틀려도 좋은 실험실.', 'A good place to break things.')}
                  </h3>
                  <p>
                    {t(
                      '정답 예제도, 일부러 틀린 예제도 준비했어요. 코드를 바꾸고 타입 검사를 눌러보세요.',
                      'Try a correct example or an intentional mistake. Edit the code and check its types.'
                    )}
                  </p>
                </div>
                <div class="pg-type-presets">
                  {typeExamples.map(example => (
                    <button
                      key={example.id}
                      type="button"
                      aria-pressed={activeExample === example.id}
                      onClick={() => {
                        activeExample = example.id;
                        changeCode(example.code);
                        checkTypes();
                      }}
                    >
                      {example.valid ? '✓' : '!'} {example.label[language]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div class="pg-code-heading">
              <div>
                <span class="pg-eyebrow">
                  {state.lab === 'types'
                    ? 'LIVE TYPESCRIPT'
                    : `03 / ${t('코드와 추론 확인', 'CODE & INFERENCE')}`}
                </span>
                <h3>
                  {t(
                    '힌트 없이, 어디까지 추론할까?',
                    'How far does inference go?'
                  )}
                </h3>
              </div>
              <span class="pg-compiler-tag">
                {report
                  ? `TypeScript ${report.version}`
                  : 'TypeScript · on demand'}
              </span>
            </div>
            <div class="pg-code-grid">
              <div class="pg-editor-pane">
                <div class="pg-editor-toolbar">
                  <span>
                    <i />
                    <i />
                    <i />
                    experiment.ts
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      void (async () => {
                        try {
                          await navigator.clipboard.writeText(code);
                          copied = true;
                        } catch {
                          checkerError = t(
                            '복사하지 못했어요. 코드를 직접 선택해 복사하세요.',
                            'Copy unavailable. Select the code and copy it manually.'
                          );
                        }
                        if (disposed) return;
                        renew();
                        clearTimeout(copyTimer);
                        copyTimer = setTimeout(() => {
                          copied = false;
                          if (!disposed) renew();
                        }, 1800);
                      })();
                    }}
                  >
                    {copied ? t('복사됨 ✓', 'Copied ✓') : t('복사', 'Copy')}
                  </button>
                </div>
                <textarea
                  class="pg-editor"
                  aria-label={t(
                    'TypeScript 코드 편집기',
                    'TypeScript code editor'
                  )}
                  spellcheck={false}
                  value={code}
                  onInput={(event: Event) =>
                    changeCode((event.target as HTMLTextAreaElement).value)
                  }
                />
                <div class="pg-editor-footer">
                  <span>
                    {t(
                      '편집한 코드는 타입 검사에만 사용합니다.',
                      'Edited code is checked for types only.'
                    )}
                  </span>
                  <button
                    type="button"
                    class="pg-primary"
                    disabled={checking}
                    onClick={checkTypes}
                  >
                    {checking
                      ? t('분석 중…', 'Checking…')
                      : t('타입 검사 →', 'Check types →')}
                  </button>
                </div>
              </div>
              <div
                class="pg-type-output"
                aria-live="polite"
                aria-busy={checking}
              >
                <div class="pg-type-output-title">
                  <strong>
                    {t('실제 추론된 타입', 'ACTUAL INFERRED TYPES')}
                  </strong>
                  <span>
                    {report
                      ? `${report.diagnostics.length} ${t('오류', 'errors')}`
                      : '↗'}
                  </span>
                </div>
                {checking ? (
                  <div class="pg-type-empty">
                    <span class="pg-spinner" />
                    <h4>
                      {t(
                        '컴파일러가 확인하고 있어요.',
                        'The compiler is checking.'
                      )}
                    </h4>
                    <p>
                      {t(
                        '첫 검사는 컴파일러를 불러와 잠시 걸릴 수 있어요.',
                        'The first check also loads the compiler.'
                      )}
                    </p>
                  </div>
                ) : checkerError ? (
                  <div class="pg-error">
                    {checkerError}
                    <button type="button" onClick={checkTypes}>
                      {t('다시 검사', 'Retry')}
                    </button>
                  </div>
                ) : report ? (
                  <>
                    <div
                      class={`pg-type-verdict ${report.diagnostics.length ? 'has-errors' : ''}`}
                    >
                      {report.diagnostics.length
                        ? `! ${t('타입 오류를 찾았어요', 'Type errors found')}`
                        : `✓ ${t('타입 검사 통과', 'Type check passed')}`}
                    </div>
                    {report.diagnostics.map((diagnostic, index) => (
                      <div key={index} class="pg-diagnostic">
                        <strong>
                          L{diagnostic.line}:{diagnostic.column} · TS
                          {diagnostic.code}
                        </strong>
                        <pre>{diagnostic.message}</pre>
                      </div>
                    ))}
                    <div class="pg-inferred-types">
                      {report.types.map(type => (
                        <div key={type.name}>
                          <span>
                            const <b>{type.name}</b>
                          </span>
                          <pre>{type.type}</pre>
                        </div>
                      ))}
                    </div>
                    {report.types.length === 0 ? (
                      <p class="pg-type-hint">
                        {t(
                          'const 변수를 선언하면 추론된 타입이 여기에 나와요.',
                          'Declare a const variable to see its inferred type here.'
                        )}
                      </p>
                    ) : null}
                  </>
                ) : (
                  <div class="pg-type-empty">
                    <span class="pg-type-symbol">
                      T<span>?</span>
                    </span>
                    <h4>
                      {t('결과 타입을 직접 확인하세요.', 'Ask the compiler.')}
                    </h4>
                    <p>
                      {t(
                        '타입 검사를 누르면 현재 코드에서 추론한 변수 타입과 오류가 표시됩니다.',
                        'Check types to see inferred variable types and diagnostics for the current code.'
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {showTests ? (
            <section
              class="pg-tests"
              aria-label={t('전체 검사 결과', 'All check results')}
            >
              <div class="pg-tests-header">
                <div>
                  <span class="pg-eyebrow">REGRESSION FLIGHT CHECK</span>
                  <h2>
                    {testRows.filter(row => row.passed).length} /{' '}
                    {presets.length} {t('케이스 통과', 'checks passed')}
                  </h2>
                  <p>
                    {t(
                      '실제 라이브러리를 실행한 결과를 각각의 기대값과 비교합니다.',
                      'Runs the actual library and compares each result to its independent expectation.'
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  class="pg-text-button"
                  onClick={() => {
                    showTests = false;
                    renew();
                  }}
                >
                  {t('접기', 'Close')} ↑
                </button>
              </div>
              <div class="pg-test-grid">
                {presets.map(preset => {
                  const row = testRows.find(item => item.id === preset.id);
                  return (
                    <button
                      type="button"
                      key={preset.id}
                      class={`pg-test-row ${row && !row.passed ? 'has-error' : ''}`}
                      onClick={() => choose(preset)}
                    >
                      <span>{row ? (row.passed ? '✓' : '!') : '·'}</span>
                      <strong>{preset.label[language]}</strong>
                      <small>
                        {row ? (row.passed ? 'PASS' : 'FAIL') : '…'}
                      </small>
                      {row && !row.passed ? <pre>{row.actual}</pre> : null}
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}

          <footer class="pg-footer">
            <span>
              fp-pack <b> / </b>
              {t(
                '작은 함수로 만드는 큰 흐름.',
                'Little functions. A bigger flow.'
              )}
            </span>
            <span>
              {t(
                '이 데모는 아직 출시되지 않은 개선 브랜치를 사용합니다.',
                'This demo uses the unreleased feature branch.'
              )}
            </span>
            <a
              href="https://github.com/superlucky84/fp-pack/tree/feat/inference-playground"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('소스 보기', 'View source')} ↗
            </a>
          </footer>
        </main>
      </div>
    );
  };
});
