import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamFlatMap_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      flatMap (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      각 값을 iterable로 매핑하고 결과를 단일 시퀀스로 지연 평탄화합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream flatMap이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        flatMap
      </strong>{' '}
      은 매핑과 평탄화 작업을 단일하고 효율적인 단계로 결합하는 스트림 유틸리티입니다. 입력 iterable의 각 값에 변환 함수를 적용하는데, 이 함수는 iterable을 반환하며, 그 다음 모든 결과 iterable들을 단일 출력 시퀀스로 평탄화합니다. 이는 일대다 관계를 다루거나 각 입력 값이 여러 출력 값을 생성해야 할 때 특히 유용합니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">map</code>을 수행한 다음 <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">flatten</code>을 따로 수행하는 것과 달리, <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">flatMap</code>은 두 작업을 단일 패스에서 지연 방식으로 수행하여 대용량 또는 무한 시퀀스를 다룰 때 더 메모리 효율적입니다. 이 함수는 동기 및 비동기 iterable을 모두 지원하며, 추가 설정 없이 비동기 작업을 자동으로 처리합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`// 동기 iterable과 동기 매퍼
function flatMap<T, R>(
  fn: (value: T) => Iterable<R>,
  iterable: Iterable<T>
): IterableIterator<R>;

// 비동기 iterable 또는 비동기 매퍼
function flatMap<T, R>(
  fn: (value: T) => Iterable<R> | Promise<Iterable<R>>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<R>;

// 커리된 동기 버전
function flatMap<T, R>(
  fn: (value: T) => Iterable<R>
): (iterable: Iterable<T>) => IterableIterator<R>;

// 커리된 비동기 버전
function flatMap<T, R>(
  fn: (value: T) => Iterable<R> | Promise<Iterable<R>>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<R>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      간단한 평탄화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatMap } from 'fp-pack/stream';

// 각 숫자를 한 쌍의 값으로 확장
const numbers = [1, 2, 3];
const expanded = flatMap((n: number) => [n, n * 10], numbers);

console.log(Array.from(expanded));
// [1, 10, 2, 20, 3, 30]

// 문장을 단어로 분할
const sentences = ['Hello world', 'Stream processing'];
const words = flatMap(
  (sentence: string) => sentence.split(' '),
  sentences
);

console.log(Array.from(words));
// ['Hello', 'world', 'Stream', 'processing']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      함수 합성을 위한 커리 형태
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, filter, pipe } from 'fp-pack';

interface Category {
  id: number;
  products: string[];
}

const categories: Category[] = [
  { id: 1, products: ['laptop', 'mouse'] },
  { id: 2, products: ['phone', 'tablet'] },
  { id: 3, products: [] },
];

// 합성을 사용하여 모든 제품 추출
const getAllProducts = pipe(
  flatMap((cat: Category) => cat.products),
  filter((product: string) => product.length > 0)
);

const allProducts = getAllProducts(categories);
console.log(Array.from(allProducts));
// ['laptop', 'mouse', 'phone', 'tablet']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. 중첩 데이터 확장
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      계층적 데이터 구조를 평평한 시퀀스로 확장하여 처리합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, map, pipe } from 'fp-pack';

interface Department {
  name: string;
  employees: { id: number; name: string }[];
}

const departments: Department[] = [
  {
    name: 'Engineering',
    employees: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  },
  {
    name: 'Sales',
    employees: [
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'Diana' },
    ],
  },
];

// 부서 정보와 함께 모든 직원 추출
const allEmployees = pipe(
  flatMap((dept: Department) =>
    dept.employees.map(emp => ({
      ...emp,
      department: dept.name,
    }))
  )
)(departments);

for (const emp of allEmployees) {
  console.log(\`\${emp.name}은(는) \${emp.department}에서 근무합니다\`);
}
// Alice은(는) Engineering에서 근무합니다
// Bob은(는) Engineering에서 근무합니다
// Charlie은(는) Sales에서 근무합니다
// Diana은(는) Sales에서 근무합니다`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. 비동기 API 데이터 가져오기
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      각 항목에 대한 관련 데이터를 가져오고 결과를 단일 스트림으로 평탄화합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, toArray } from 'fp-pack/stream';

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
}

async function getUserPosts(userId: number): Promise<Post[]> {
  const response = await fetch(
    \`https://api.example.com/users/\${userId}/posts\`
  );
  return response.json();
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

// 모든 사용자의 모든 게시물 가져오기
const allPosts = flatMap(
  async (user: User) => await getUserPosts(user.id),
  users
);

const posts = await toArray(allPosts);
console.log(\`총 게시물 수: \${posts.length}\`);
posts.forEach(post => {
  console.log(\`게시물: \${post.title}\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. 파일 시스템 탐색
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      디렉토리 구조를 재귀적으로 탐색하고 모든 파일 경로를 평탄화합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, filter, pipe } from 'fp-pack';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

interface FileEntry {
  path: string;
  isDirectory: boolean;
}

async function* getDirectoryEntries(
  dirPath: string
): AsyncIterableIterator<FileEntry> {
  const entries = await readdir(dirPath);

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stats = await stat(fullPath);
    yield {
      path: fullPath,
      isDirectory: stats.isDirectory(),
    };
  }
}

async function* getAllFiles(
  rootPath: string
): AsyncIterableIterator<string> {
  const entries = getDirectoryEntries(rootPath);

  for await (const entry of entries) {
    if (entry.isDirectory) {
      // 하위 디렉토리에서 재귀적으로 파일 가져오기
      yield* getAllFiles(entry.path);
    } else {
      yield entry.path;
    }
  }
}

// 프로젝트의 모든 TypeScript 파일 찾기
const projectFiles = pipe(
  filter((path: string) => path.endsWith('.ts'))
)(getAllFiles('./src'));

for await (const file of projectFiles) {
  console.log(\`발견: \${file}\`);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. 텍스트 처리 파이프라인
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      분할, 토큰화, 다양한 세부 수준에서 분석을 통해 텍스트 데이터를 처리합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, filter, map, pipe } from 'fp-pack';

const documents = [
  'The quick brown fox jumps over the lazy dog.',
  'Stream processing enables efficient data transformation.',
  'Functional programming promotes code clarity.',
];

// 문장으로 분할한 다음 단어로 분할하고 필터링 및 카운팅
const wordCount = pipe(
  // 문서를 문장으로 분할
  flatMap((doc: string) => doc.split(/[.!?]+/).filter(s => s.trim())),
  // 문장을 단어로 분할
  flatMap((sentence: string) =>
    sentence.toLowerCase().match(/\\b\\w+\\b/g) || []
  ),
  // 일반적인 단어 필터링
  filter((word: string) =>
    !['the', 'a', 'an', 'over', 'and'].includes(word)
  ),
  // 카운팅을 위해 iterable로 변환
  (words: Iterable<string>) => {
    const counts = new Map<string, number>();
    for (const word of words) {
      counts.set(word, (counts.get(word) || 0) + 1);
    }
    return counts;
  }
)(documents);

console.log('단어 빈도:');
for (const [word, count] of wordCount) {
  console.log(\`  \${word}: \${count}\`);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. 그래프 탐색
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      이웃을 탐색하고 탐색 경로를 평탄화하여 그래프 구조를 순회합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap } from 'fp-pack/stream';

interface Node {
  id: string;
  value: number;
  neighbors: string[];
}

const graph: Map<string, Node> = new Map([
  ['A', { id: 'A', value: 1, neighbors: ['B', 'C'] }],
  ['B', { id: 'B', value: 2, neighbors: ['D'] }],
  ['C', { id: 'C', value: 3, neighbors: ['D', 'E'] }],
  ['D', { id: 'D', value: 4, neighbors: [] }],
  ['E', { id: 'E', value: 5, neighbors: [] }],
]);

function* breadthFirstSearch(
  startId: string,
  graph: Map<string, Node>
): IterableIterator<Node> {
  const visited = new Set<string>();
  const queue: string[] = [startId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;

    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const node = graph.get(currentId);
    if (!node) continue;

    yield node;
    queue.push(...node.neighbors);
  }
}

// 도달 가능한 모든 노드를 찾고 값을 합산
const startNodes = ['A'];
const allReachableNodes = flatMap(
  (nodeId: string) => breadthFirstSearch(nodeId, graph),
  startNodes
);

let totalValue = 0;
for (const node of allReachableNodes) {
  console.log(\`노드 \${node.id} 방문, 값 \${node.value}\`);
  totalValue += node.value;
}
console.log(\`총 값: \${totalValue}\`);
// 노드 A 방문, 값 1
// 노드 B 방문, 값 2
// 노드 C 방문, 값 3
// 노드 D 방문, 값 4
// 노드 E 방문, 값 5
// 총 값: 15`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. 데이터베이스 쿼리 결과 비정규화
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      정규화된 데이터베이스 결과를 보고를 위해 비정규화된 형식으로 평탄화합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, map, pipe } from 'fp-pack';

interface Order {
  orderId: number;
  customerId: number;
  items: { productId: number; quantity: number; price: number }[];
}

const orders: Order[] = [
  {
    orderId: 1,
    customerId: 100,
    items: [
      { productId: 1, quantity: 2, price: 29.99 },
      { productId: 2, quantity: 1, price: 49.99 },
    ],
  },
  {
    orderId: 2,
    customerId: 101,
    items: [
      { productId: 3, quantity: 3, price: 19.99 },
    ],
  },
];

// 주문을 보고를 위한 개별 라인 항목으로 평탄화
const lineItems = pipe(
  flatMap((order: Order) =>
    order.items.map(item => ({
      orderId: order.orderId,
      customerId: order.customerId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      total: item.quantity * item.price,
    }))
  )
)(orders);

console.log('주문 라인 항목:');
for (const item of lineItems) {
  console.log(
    \`주문 #\${item.orderId}: 제품 #\${item.productId} - \` +
    \`\${item.quantity}개 @ $\${item.price} = $\${item.total.toFixed(2)}\`
  );
}
// 주문 #1: 제품 #1 - 2개 @ $29.99 = $59.98
// 주문 #1: 제품 #2 - 1개 @ $49.99 = $49.99
// 주문 #2: 제품 #3 - 3개 @ $19.99 = $59.97

// 총 수익 계산
const totalRevenue = Array.from(lineItems).reduce(
  (sum, item) => sum + item.total,
  0
);
console.log(\`총 수익: $\${totalRevenue.toFixed(2)}\`);
// 총 수익: $169.94`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 flatMap을 사용할까요?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          효율적인 일대다 매핑
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          매핑과 평탄화를 단일 지연 작업으로 결합하여 중간 배열 할당을 방지하고, 각 입력이 여러 출력을 생성하는 변환에 이상적입니다.
        </p>
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
          중첩 구조 탐색
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          결과를 자동으로 평탄화하여 계층적이거나 중첩된 데이터 구조 작업을 단순화하여 복잡한 데이터 변환을 더 읽기 쉽고 유지보수하기 쉽게 만듭니다.
        </p>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
          비동기 데이터 집계
        </h3>
        <p class="text-sm text-green-800 dark:text-green-200">
          비동기 작업을 원활하게 처리하여 각 항목에 대한 관련 데이터를 가져오고 프로미스를 수동으로 관리하지 않고 결과를 단일 스트림으로 평탄화할 수 있습니다.
        </p>
      </div>

      <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800">
        <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
          함수형 합성
        </h3>
        <p class="text-sm text-orange-800 dark:text-orange-200">
          커리된 형태는 pipe 및 compose 유틸리티와 완벽하게 통합되어 복잡한 중첩 구조를 처리하는 우아한 데이터 변환 파이프라인을 가능하게 합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">flatMap</code> 함수는 매핑 함수를 적용하고 단일 패스에서 평탄화하는 지연 이터레이터로 구현됩니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`// 단순화된 구현
function* flatMap<T, R>(
  fn: (value: T) => Iterable<R>,
  iterable: Iterable<T>
): IterableIterator<R> {
  for (const value of iterable) {
    // 매핑 함수를 적용하여 iterable 얻기
    const mapped = fn(value);

    // 매핑된 iterable의 각 항목을 yield하여 평탄화
    for (const item of mapped) {
      yield item;
    }
  }
}

// 비동기 지원
async function* flatMapAsync<T, R>(
  fn: (value: T) => Iterable<R> | Promise<Iterable<R>>,
  iterable: AsyncIterable<T>
): AsyncIterableIterator<R> {
  for await (const value of iterable) {
    const mapped = await fn(value);

    for await (const item of mapped) {
      yield item;
    }
  }
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      이 함수는 지연 방식으로 평가되며, 값이 소비될 때만 처리합니다. 이는 대용량 또는 무한 시퀀스에 대해 메모리 효율적이며, <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">take</code> 또는 <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">find</code>와 같은 작업과 결합할 때 조기 종료를 허용합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">flatMap</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/flatMap.ts"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      GitHub에서 보기
    </a>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          평탄화 없이 iterable의 각 값을 변환합니다. 간단한 일대일 변환이 필요할 때 사용하세요.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatten');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          flatten
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          중첩된 iterable을 단일 시퀀스로 평탄화합니다. 이미 평탄화할 중첩 구조가 있을 때 사용하세요.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          filter
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          조건을 만족하는 값을 선택합니다. 확장된 결과를 필터링하기 위해 flatMap과 자주 결합됩니다.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/concat');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          concat
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          여러 iterable을 순차적으로 연결합니다. 변환 없이 별도의 시퀀스를 결합할 때 사용하세요.
        </p>
      </div>
    </div>
  </div>
);
