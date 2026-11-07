import {
  curryN,
  pipe,
  pipeAsync,
  filter,
  sortBy,
  take,
  map,
  reduce,
  evolve,
  mergeDeep,
  path,
  prop,
  getOrElse,
  pipeSideEffect,
  SideEffect,
  matchSideEffect,
} from '../../../src';
import * as stream from '../../../src/stream';

export type Lab =
  | 'curry'
  | 'orders'
  | 'profile'
  | 'stream'
  | 'effects'
  | 'types';
export interface DemoState {
  lab: Lab;
  mode: string;
  amount: number;
  extra: number;
  limit: number;
  threshold: number;
  enabled: boolean;
}
export interface Stage {
  label: string;
  value: unknown;
}
export interface DemoResult {
  value: unknown;
  stages: Stage[];
}
export const initialState: DemoState = {
  lab: 'curry',
  mode: 'default',
  amount: 2,
  extra: 3,
  limit: 3,
  threshold: 4000,
  enabled: true,
};

export const labs: {
  id: Lab;
  title: [string, string];
  detail: [string, string];
  icon: string;
  apis: string;
}[] = [
  {
    id: 'curry',
    title: ['커리 바', 'Curry bar'],
    detail: ['인자를 나눠 담아보세요', 'One argument at a time'],
    icon: '01',
    apis: 'curryN · pipe',
  },
  {
    id: 'orders',
    title: ['작은 커피 가게', 'Little coffee shop'],
    detail: ['주문을 파이프로 정리해요', 'Build an order pipeline'],
    icon: '02',
    apis: 'filter · sortBy · map',
  },
  {
    id: 'profile',
    title: ['프로필 수리소', 'Profile workshop'],
    detail: ['타입이 바뀌는 객체 변환', 'Transform shapes & types'],
    icon: '03',
    apis: 'evolve · mergeDeep · path',
  },
  {
    id: 'stream',
    title: ['시그널 스테이션', 'Signal station'],
    detail: ['필요한 만큼만 흘려보내요', 'Pull just what you need'],
    icon: '04',
    apis: 'stream · toAsync · zip',
  },
  {
    id: 'effects',
    title: ['입장 게이트', 'The entry gate'],
    detail: ['멈춰야 할 때 멈추는 파이프', 'Know when to stop'],
    icon: '05',
    apis: 'pipeSideEffect · match',
  },
  {
    id: 'types',
    title: ['타입 실험실', 'Type laboratory'],
    detail: ['코드를 바꿔 추론을 확인해요', 'Edit code. Inspect inference.'],
    icon: '06',
    apis: 'TypeScript · live checker',
  },
];

export const modes: Record<
  Exclude<Lab, 'types'>,
  [string, string, string][]
> = {
  curry: [
    ['default', '기본값 사용', 'Use a default'],
    ['grouped', '한 개씩 전달', 'One by one'],
    ['undefined', 'undefined 전달', 'Explicit undefined'],
    ['optional', '선택적 인자', 'Optional parameter'],
    ['rest', 'rest 한꺼번에', 'Extra rest values'],
    ['reuse', '부분 적용 재사용', 'Reuse a partial'],
    ['zero', '0개 · 실행 지연', 'Zero · deferred call'],
  ],
  orders: [['menu', '주문 필터', 'Filter orders']],
  profile: [
    ['missing', '별명 없음', 'Missing nickname'],
    ['present', '별명 있음', 'With a nickname'],
  ],
  stream: [
    ['sync', '동기 · 지연 평가', 'Sync · lazy'],
    ['async', '비동기 · Promise', 'Async · Promise'],
    ['zip', 'zip · 양쪽 정리', 'Zip · cleanup'],
    ['string', '문자열 · 깊은 평탄화', 'Strings · deep flatten'],
  ],
  effects: [['gate', '입장 확인', 'Check admission']],
};

const menu = Object.freeze([
  { name: 'Espresso', price: 3000, stock: true },
  { name: 'Americano', price: 3800, stock: true },
  { name: 'Flat white', price: 4500, stock: true },
  { name: 'Matcha latte', price: 5200, stock: false },
  { name: 'Oat latte', price: 5500, stock: true },
  { name: 'Cold brew', price: 4800, stock: true },
]);

export async function runScenario(
  state: DemoState,
  latency = 0
): Promise<DemoResult> {
  const { lab, mode, amount, extra, limit, threshold, enabled } = state;
  const stages: Stage[] = [];
  const stage = (label: string, value: unknown) =>
    stages.push({ label, value });
  if (lab === 'curry') {
    const add = (a: number, b = 10) => a + b;
    stage('input', { amount, extra });
    if (mode === 'zero') {
      let calls = 0;
      const run = curryN(0, () => ++calls);
      stage('curryN(0, fn)', { calls });
      const first = run();
      const second = run();
      stage('run() → run()', [first, second]);
      return { value: { before: 0, first, second, calls }, stages };
    }
    if (mode === 'rest' || mode === 'reuse') {
      const total = (label: string, ...values: number[]) =>
        label + values.reduce((sum, n) => sum + n, 0);
      const saved = curryN(3, total)('sum:');
      stage('curryN(3, total)("sum:")', 'function · 2 slots left');
      const value =
        mode === 'rest'
          ? saved()(amount)(extra, 5)
          : [saved(amount, extra), saved(10, 20)];
      stage(
        mode === 'rest' ? 'saved()(a)(b, 5)' : 'saved(a, b) / saved(10, 20)',
        value
      );
      return { value, stages };
    }
    if (mode === 'optional') {
      const format = (value: number, unit?: string) => `${value}${unit ?? ''}`;
      const value = enabled
        ? curryN(2, format)(amount)('kg')
        : curryN(1, format)(amount);
      stage(
        enabled ? 'curryN(2, format)(a)("kg")' : 'curryN(1, format)(a)',
        value
      );
      return { value, stages };
    }
    const saved = curryN(2, add)(amount);
    stage('curryN(2, add)(amount)', 'function · 1 slot left');
    const value =
      mode === 'default'
        ? curryN(1, add)(amount)
        : mode === 'undefined'
          ? saved(undefined)
          : saved(extra);
    stage(
      mode === 'default'
        ? 'curryN(1, add)(amount)'
        : `saved(${mode === 'undefined' ? 'undefined' : extra})`,
      value
    );
    return { value, stages };
  }
  if (lab === 'orders') {
    stage('readonly input', menu);
    const selected = pipe(
      menu,
      filter(item => item.price >= threshold && (!enabled || item.stock))
    );
    stage('filter', selected);
    const sorted = pipe(
      selected,
      sortBy(item => item.price),
      take(limit)
    );
    stage('sortBy → take', sorted);
    const value = pipe(
      sorted,
      map(item => ({ label: item.name.toUpperCase(), price: item.price }))
    );
    stage('map', value);
    stage(
      'reduce · total',
      pipe(
        sorted,
        reduce((sum, item) => sum + item.price, 0)
      )
    );
    return { value, stages };
  }
  if (lab === 'profile') {
    const input: { name: string; score: number; nickname?: string } = {
      name: '  Lina  ',
      score: amount,
    };
    if (mode === 'present') input.nickname = 'Lin';
    stage('input', input);
    const transformed = pipe(
      input,
      evolve({ name: name => name.trim(), score: score => score.toFixed(1) })
    );
    stage('evolve · number → string', transformed);
    const nickname = pipe(input, prop('nickname'), getOrElse('anonymous'));
    const preferences = mergeDeep(
      { theme: { mode: 'light', accent: 'violet' } },
      { theme: { mode: enabled ? 'dark' : 'light' } }
    );
    stage('mergeDeep', preferences);
    const value = {
      ...transformed,
      displayName: nickname,
      accent: path(['theme', 'accent'], preferences),
    };
    stage('prop → getOrElse / path', value);
    return { value, stages };
  }
  if (lab === 'stream') {
    if (mode === 'string') {
      const letters = [
        ...stream.map(letter => letter.toUpperCase(), 'fp-pack'),
      ];
      const leaves = [...stream.flattenDeep(['ab', ['cd', ['ef']]])];
      stage('iterable string', letters);
      stage('flattenDeep · atomic string leaves', leaves);
      return { value: { letters, leaves }, stages };
    }
    if (mode === 'zip') {
      const closed: string[] = [];
      function* source(label: string) {
        try {
          yield 1;
          yield 2;
          yield 3;
        } finally {
          closed.push(label);
        }
      }
      const pairs = [
        ...stream.take(1, stream.zip(source('right'), source('left'))),
      ];
      stage('zip → take(1)', pairs);
      stage('finally · both iterators closed', closed);
      return { value: { pairs, closed }, stages };
    }
    let visited = 0;
    const visit = (n: number) => {
      visited++;
      return n * 2;
    };
    const input = stream.range(1, 21);
    stage('range(1, 21)', '1 … 20');
    let values: number[];
    if (mode === 'async') {
      async function* source() {
        for (const value of input) {
          if (latency)
            await new Promise(resolve => setTimeout(resolve, latency));
          yield Promise.resolve(value);
        }
      }
      values = await pipeAsync(
        source(),
        stream.map(visit),
        stream.filter(n => n >= threshold),
        stream.take(limit),
        stream.toArray
      );
    } else {
      values = await pipe(
        input,
        stream.map(visit),
        stream.filter(n => n >= threshold),
        stream.take(limit),
        stream.toArray
      );
    }
    stage('map ×2 → filter → take → toArray', values);
    stage('visited / total', { visited, total: 20 });
    return { value: { values, visited }, stages };
  }
  if (lab === 'effects') {
    const trace: string[] = [];
    let effectRuns = 0;
    const result = pipeSideEffect(
      { age: amount, member: enabled },
      value => {
        trace.push('validate');
        return value.age >= 18
          ? value
          : SideEffect.of(() => {
              effectRuns++;
              return { approved: false, price: 0 };
            }, 'under-age');
      },
      value => {
        trace.push('price');
        return { approved: true, price: value.member ? 8000 : 10000 };
      }
    );
    stage('pipeSideEffect', { trace: [...trace], effectRuns });
    const output = matchSideEffect(result, {
      value: value => value,
      effect: effect => effect.effect(),
    });
    const value = { ...output, trace, effectRuns };
    stage('matchSideEffect · handled once', value);
    return { value, stages };
  }
  return { value: null, stages };
}

export function getProgram(state: DemoState): string {
  const { lab, mode, amount, extra, limit, threshold, enabled } = state;
  if (lab === 'curry') {
    if (mode === 'zero')
      return `import { curryN } from 'fp-pack';
let calls = 0;
const run = curryN(0, () => ++calls);
const before = calls;
const first = run();
const second = run();`;
    if (mode === 'rest' || mode === 'reuse')
      return `import { curryN } from 'fp-pack';
const total = (label: string, ...values: number[]) =>
  label + values.reduce((sum, n) => sum + n, 0);
const saved = curryN(3, total)('sum:');
const result = ${mode === 'rest' ? `saved()(${amount})(${extra}, 5)` : `[saved(${amount}, ${extra}), saved(10, 20)]`};`;
    if (mode === 'optional')
      return `import { curryN } from 'fp-pack';
const format = (value: number, unit?: string) => value + (unit ?? '');
const result = ${enabled ? `curryN(2, format)(${amount})('kg')` : `curryN(1, format)(${amount})`};`;
    return `import { curryN, pipe } from 'fp-pack';
const add = (a: number, b = 10) => a + b;
const saved = curryN(2, add)(${amount});
const result = ${mode === 'default' ? `curryN(1, add)(${amount})` : `saved(${mode === 'undefined' ? 'undefined' : extra})`};
const label = pipe(result, n => n.toFixed(1));`;
  }
  if (lab === 'orders')
    return `import { pipe, filter, sortBy, take, map } from 'fp-pack';
const menu: readonly { name: string; price: number; stock: boolean }[] = ${JSON.stringify(menu, null, 2)};
const result = pipe(
  menu,
  filter(item => item.price >= ${threshold}${enabled ? ' && item.stock' : ''}),
  sortBy(item => item.price),
  take(${limit}),
  map(item => ({ label: item.name.toUpperCase(), price: item.price }))
);`;
  if (lab === 'profile')
    return `import { pipe, evolve, prop, getOrElse, mergeDeep, path } from 'fp-pack';
const input: { name: string; score: number; nickname?: string } =
  { name: '  Lina  ', score: ${amount}${mode === 'present' ? ", nickname: 'Lin'" : ''} };
const transformed = pipe(input, evolve({
  name: name => name.trim(),
  score: score => score.toFixed(1)
}));
const nickname = pipe(input, prop('nickname'));
const displayName = pipe(nickname, getOrElse('anonymous'));
const preferences = mergeDeep(
  { theme: { mode: 'light', accent: 'violet' } },
  { theme: { mode: '${enabled ? 'dark' : 'light'}' } }
);
const accent = path(['theme', 'accent'], preferences);`;
  if (lab === 'stream') {
    if (mode === 'zip')
      return `import { take, zip } from 'fp-pack/stream';
const closed: string[] = [];
function* source(label: string) {
  try { yield 1; yield 2; yield 3; }
  finally { closed.push(label); }
}
const result = [...take(1, zip(source('right'), source('left')))];`;
    if (mode === 'string')
      return `import { map, flattenDeep } from 'fp-pack/stream';
const letters = [...map(letter => letter.toUpperCase(), 'fp-pack')];
const leaves = [...flattenDeep(['ab', ['cd', ['ef']]])];`;
    return `import { ${mode === 'async' ? 'pipeAsync' : 'pipe'} } from 'fp-pack';
import * as stream from 'fp-pack/stream';
const savedMap = stream.map((n: number) => n * 2);
const input = ${mode === 'async' ? 'stream.toAsync(stream.range(1, 21))' : 'stream.range(1, 21)'};
const result = ${mode === 'async' ? 'pipeAsync' : 'pipe'}(
  input, savedMap,
  stream.filter(n => n >= ${threshold}),
  stream.take(${limit}),
  stream.toArray
);`;
  }
  return `import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-pack';
const result = pipeSideEffect(
  { age: ${amount}, member: ${enabled} },
  user => user.age >= 18 ? user : SideEffect.of(() => ({ approved: false, price: 0 })),
  user => ({ approved: true, price: user.member ? 8000 : 10000 })
);
const handled = matchSideEffect(result, {
  value: value => value,
  effect: effect => effect.effect()
});`;
}

export interface Preset {
  id: string;
  label: [string, string];
  goal: [string, string];
  state: DemoState;
  expected: unknown;
}
const preset = (
  id: string,
  label: [string, string],
  goal: [string, string],
  patch: Partial<DemoState>,
  expected: unknown
): Preset => ({
  id,
  label,
  goal,
  state: { ...initialState, ...patch },
  expected,
});
export const presets: Preset[] = [
  preset(
    'default',
    ['기본값 10은 살아있다', 'The default survives'],
    ['인자 1개로 실행하면 2 + 10이 될까요?', 'Will one argument give 2 + 10?'],
    {},
    12
  ),
  preset(
    'grouped',
    ['두 번째 인자를 기다려', 'Wait for argument two'],
    ['2와 3을 나눠 전달해 보세요.', 'Send 2 and 3 in separate calls.'],
    { mode: 'grouped' },
    5
  ),
  preset(
    'undefined',
    ['빈 자리도 한 자리', 'Undefined is a slot'],
    [
      'undefined가 기본값을 적용하는지 확인하세요.',
      'Check that undefined activates the default.',
    ],
    { mode: 'undefined' },
    12
  ),
  preset(
    'optional',
    ['단위 붙이기', 'Add a unit'],
    ['선택적 인자에 kg를 전달해 보세요.', 'Supply kg as an optional argument.'],
    { mode: 'optional' },
    '2kg'
  ),
  preset(
    'optional-empty',
    ['단위 없이도 좋아', 'No unit needed'],
    [
      '선택적 인자를 생략하면 무엇이 나올까요?',
      'What happens if you omit the optional argument?',
    ],
    { mode: 'optional', enabled: false },
    '2'
  ),
  preset(
    'rest',
    ['한 번에 더 담아', 'A few extra arguments'],
    [
      '빈 호출 후 rest 값 2, 3, 5를 모두 합쳐보세요.',
      'An empty call, then all rest values: 2, 3, 5.',
    ],
    { mode: 'rest' },
    'sum:10'
  ),
  preset(
    'reuse',
    ['부분 적용은 두 번 써도', 'Partials are reusable'],
    [
      '저장한 함수가 첫 실행의 값을 기억해 섞지는 않을까요?',
      'Does reusing a partial leak earlier values?',
    ],
    { mode: 'reuse' },
    ['sum:5', 'sum:30']
  ),
  preset(
    'zero',
    ['만들 때 말고 호출할 때', 'Call, then execute'],
    [
      '0개짜리 함수도 생성 시점에는 실행되면 안 돼요.',
      'An arity-zero function must still wait for a call.',
    ],
    { mode: 'zero' },
    { before: 0, first: 1, second: 2, calls: 2 }
  ),
  preset(
    'orders',
    ['커피 세 잔 주세요', 'Three coffees, please'],
    [
      '4,000원 이상 재고가 있는 메뉴를 싼 순서로 골라요.',
      'Choose in-stock items over 4,000, cheapest first.',
    ],
    { lab: 'orders', mode: 'menu' },
    [
      { label: 'FLAT WHITE', price: 4500 },
      { label: 'COLD BREW', price: 4800 },
      { label: 'OAT LATTE', price: 5500 },
    ]
  ),
  preset(
    'sold-out',
    ['품절 메뉴도 둘러보기', 'Include sold-out items'],
    [
      '재고 필터를 끄면 말차 라테도 나와야 해요.',
      'Turn off the stock filter to see matcha latte.',
    ],
    { lab: 'orders', mode: 'menu', enabled: false, limit: 4 },
    [
      { label: 'FLAT WHITE', price: 4500 },
      { label: 'COLD BREW', price: 4800 },
      { label: 'MATCHA LATTE', price: 5200 },
      { label: 'OAT LATTE', price: 5500 },
    ]
  ),
  preset(
    'empty',
    ['오늘은 조건에 맞는 게 없네', 'Nothing matches today'],
    [
      '결과가 빈 배열이어도 파이프가 끝까지 동작하나요?',
      'Does the whole pipeline handle an empty result?',
    ],
    { lab: 'orders', mode: 'menu', threshold: 6000 },
    []
  ),
  preset(
    'profile-missing',
    ['별명 없는 프로필', 'A missing nickname'],
    [
      '숫자는 문자열로, 없는 별명은 anonymous로.',
      'A number becomes a string; a nickname gets a fallback.',
    ],
    { lab: 'profile', mode: 'missing', amount: 42 },
    { name: 'Lina', score: '42.0', displayName: 'anonymous', accent: 'violet' }
  ),
  preset(
    'profile-present',
    ['별명이 돌아왔다', 'The nickname is back'],
    [
      '병합 후에도 중첩 accent 값이 유지되는지 보세요.',
      'Check that the nested accent survives a merge.',
    ],
    { lab: 'profile', mode: 'present', amount: 7 },
    {
      name: 'Lina',
      score: '7.0',
      nickname: 'Lin',
      displayName: 'Lin',
      accent: 'violet',
    }
  ),
  preset(
    'lazy',
    ['20개 전부 볼 필요는 없어', 'No need to visit all twenty'],
    [
      '2배 한 값 중 6 이상인 3개만 가져오면 몇 번 방문할까요?',
      'How many visits to pull three doubled values starting at six?',
    ],
    { lab: 'stream', mode: 'sync', threshold: 6 },
    { values: [6, 8, 10], visited: 5 }
  ),
  preset(
    'async',
    ['Promise도 같은 흐름으로', 'Promises in the same flow'],
    [
      '비동기 소스에서도 같은 결과를 얻을 수 있나요?',
      'Does an async source produce the same result?',
    ],
    { lab: 'stream', mode: 'async', threshold: 6 },
    { values: [6, 8, 10], visited: 5 }
  ),
  preset(
    'no-signals',
    ['아무 신호도 없을 때', 'No matching signals'],
    [
      '20개를 모두 확인해도 조건에 맞는 값이 없어요.',
      'All twenty values miss the filter.',
    ],
    { lab: 'stream', mode: 'sync', threshold: 50 },
    { values: [], visited: 20 }
  ),
  preset(
    'zip',
    ['둘 다 잘 닫혔나요?', 'Did both iterators close?'],
    [
      'zip을 일찍 멈춰도 양쪽 finally가 실행되어야 해요.',
      'Both finally blocks must run when zip stops early.',
    ],
    { lab: 'stream', mode: 'zip' },
    { pairs: [[1, 1]], closed: ['left', 'right'] }
  ),
  preset(
    'string',
    ['문자열의 두 얼굴', 'Two faces of strings'],
    [
      'map은 글자별로, flattenDeep은 문자열을 잎으로 다뤄요.',
      'Map iterates characters; flattenDeep keeps string leaves.',
    ],
    { lab: 'stream', mode: 'string' },
    { letters: ['F', 'P', '-', 'P', 'A', 'C', 'K'], leaves: ['ab', 'cd', 'ef'] }
  ),
  preset(
    'member',
    ['회원 입장', 'Member admission'],
    [
      '통과하면 회원가가 계산돼요.',
      'A successful check reaches member pricing.',
    ],
    { lab: 'effects', mode: 'gate', amount: 22 },
    { approved: true, price: 8000, trace: ['validate', 'price'], effectRuns: 0 }
  ),
  preset(
    'guest',
    ['일반 입장', 'Guest admission'],
    [
      '회원이 아니면 일반가가 나와야 해요.',
      'A non-member gets the regular price.',
    ],
    { lab: 'effects', mode: 'gate', amount: 18, enabled: false },
    {
      approved: true,
      price: 10000,
      trace: ['validate', 'price'],
      effectRuns: 0,
    }
  ),
  preset(
    'blocked',
    ['여기서 멈춰주세요', 'Stop right here'],
    [
      '미성년자는 가격 단계에 진입하면 안 돼요.',
      'An under-age visitor must never reach the pricing step.',
    ],
    { lab: 'effects', mode: 'gate', amount: 16 },
    { approved: false, price: 0, trace: ['validate'], effectRuns: 1 }
  ),
];

export const typeExamples = [
  {
    id: 'curry',
    label: ['기본값 · 콜백 추론', 'Defaults & callbacks'],
    valid: true,
    code: `${getProgram(initialState)}
const render = curryN(1, (format: (n: number) => string, n = 2) => format(n));
const formatted = render(n => n.toFixed());`,
  },
  {
    id: 'evolve',
    label: ['객체 변환 후의 타입', 'A transformed object'],
    valid: true,
    code: getProgram({
      ...initialState,
      lab: 'profile',
      mode: 'missing',
      amount: 42,
    }),
  },
  {
    id: 'stream',
    label: ['저장한 단계 · 동기/비동기', 'Saved steps · sync/async'],
    valid: true,
    code: `import * as stream from 'fp-pack/stream';
const saved = stream.map((n: number) => n.toFixed());
const sync = saved([1, 2]);
const async = saved(Promise.resolve([Promise.resolve(1)]));`,
  },
  {
    id: 'bad-argument',
    label: ['틀린 인자를 잡아낼까?', 'Catch a wrong argument'],
    valid: false,
    code: `import { curryN } from 'fp-pack';
const add = curryN(2, (a: number, b = 10) => a + b);
const result = add(2)('oops');`,
  },
  {
    id: 'bad-transform',
    label: ['변환된 값은 이제 문자열', 'The value is a string now'],
    valid: false,
    code: `import { pipe, evolve } from 'fp-pack';
const result = pipe({ count: 3 }, evolve({ count: n => n.toFixed() }));
result.count.toFixed();`,
  },
  {
    id: 'readonly',
    label: ['readonly를 지켜줄까?', 'Respect readonly input'],
    valid: false,
    code: `import { pipe, getOrElse } from 'fp-pack';
declare const source: readonly { name: string }[] | undefined;
const result = pipe(source, getOrElse([]));
result.push({ name: 'Ada' });`,
  },
  {
    id: 'async-guard',
    label: ['동기 소스에 비동기 조건?', 'Async predicate on sync data?'],
    valid: false,
    code: `import * as stream from 'fp-pack/stream';
const result = stream.filter(async (n: number) => n > 1, [1, 2, 3]);`,
  },
  {
    id: 'bad-count',
    label: ['필수 인자를 건너뛸까?', 'Skip a required argument?'],
    valid: false,
    code: `import { curryN } from 'fp-pack';
const result = curryN(1, (a: number, b: number) => a + b);`,
  },
];

export const sameValue = (actual: unknown, expected: unknown) =>
  JSON.stringify(actual) === JSON.stringify(expected);
