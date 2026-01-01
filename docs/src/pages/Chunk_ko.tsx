import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Chunk_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      chunk
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      배열을 지정된 크기로 분할
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      chunk란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        chunk
      </strong>{' '}
      는 배열을 지정된 크기의 작은 배열(청크)로 나눕니다. 배열 길이가 청크 크기로
      균등하게 나누어지지 않으면 마지막 청크는 더 적은 요소를 포함할 수 있습니다.
      <br />
      <br />
      이는 <strong>페이지네이션</strong>, <strong>배치 처리</strong>,
      <strong>그리드 레이아웃</strong>, 그리고 <strong>데이터를 그룹으로 분할</strong>하는 데 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-pack';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

chunk(3, numbers);
// [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

chunk(4, numbers);
// [[1, 2, 3, 4], [5, 6, 7, 8], [9]]

chunk(2, numbers);
// [[1, 2], [3, 4], [5, 6], [7, 8], [9]]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function chunk<T>(size: number, arr: T[]): T[][];

// 청크 크기와 배열을 받음
// 청크 배열을 반환`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      크기는 자동으로 정수로 내림됩니다. 크기가 0, 음수 또는 유한하지 않으면
      빈 배열이 반환됩니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 예제
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-pack';

// 쌍으로 분할
const pairs = chunk(2, [1, 2, 3, 4, 5, 6]);
// [[1, 2], [3, 4], [5, 6]]

// 3개씩 분할
const triplets = chunk(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']);
// [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]

// 마지막 청크는 더 작을 수 있음
const groups = chunk(5, [1, 2, 3, 4, 5, 6, 7]);
// [[1, 2, 3, 4, 5], [6, 7]]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      페이지네이션
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-pack';

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 4, name: 'Monitor', price: 300 },
  { id: 5, name: 'Headphones', price: 150 },
  { id: 6, name: 'Webcam', price: 80 },
  { id: 7, name: 'Microphone', price: 120 },
];

const ITEMS_PER_PAGE = 3;
const pages = chunk(ITEMS_PER_PAGE, products);

// 페이지 1: [{ id: 1, ... }, { id: 2, ... }, { id: 3, ... }]
// 페이지 2: [{ id: 4, ... }, { id: 5, ... }, { id: 6, ... }]
// 페이지 3: [{ id: 7, ... }]

function getPage(pageNumber: number) {
  return pages[pageNumber - 1] || [];
}

getPage(1); // 첫 3개 제품
getPage(2); // 다음 3개 제품
getPage(3); // 마지막 제품`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      그리드 레이아웃
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-pack';

const images = [
  'img1.jpg', 'img2.jpg', 'img3.jpg',
  'img4.jpg', 'img5.jpg', 'img6.jpg',
  'img7.jpg', 'img8.jpg', 'img9.jpg',
  'img10.jpg'
];

const COLUMNS = 3;
const rows = chunk(COLUMNS, images);

// 그리드로 렌더링
rows.forEach(row => {
  console.log('행:', row);
});
// 행: ['img1.jpg', 'img2.jpg', 'img3.jpg']
// 행: ['img4.jpg', 'img5.jpg', 'img6.jpg']
// 행: ['img7.jpg', 'img8.jpg', 'img9.jpg']
// 행: ['img10.jpg']

// React에서
function ImageGrid({ images }: { images: string[] }) {
  const rows = chunk(3, images);

  return (
    <div>
      {rows.map((row, i) => (
        <div key={i} class="grid grid-cols-3 gap-4">
          {row.map((img, j) => (
            <img key={j} src={img} alt="" />
          ))}
        </div>
      ))}
    </div>
  );
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배치 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-pack';

async function processInBatches<T>(
  items: T[],
  batchSize: number,
  processor: (batch: T[]) => Promise<void>
) {
  const batches = chunk(batchSize, items);

  for (const batch of batches) {
    await processor(batch);
  }
}

// 1000개 항목을 50개씩 배치로 처리
const items = Array.from({ length: 1000 }, (_, i) => i);

await processInBatches(items, 50, async (batch) => {
  console.log(\`\${batch.length}개 항목의 배치 처리 중\`);
  // API로 전송, 처리 등
  await fetch('/api/batch', {
    method: 'POST',
    body: JSON.stringify(batch),
  });
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      속도 제한
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-pack';

async function fetchWithRateLimit(
  urls: string[],
  maxConcurrent: number
): Promise<Response[]> {
  const batches = chunk(maxConcurrent, urls);
  const results: Response[] = [];

  for (const batch of batches) {
    // 각 배치를 동시에 처리
    const batchResults = await Promise.all(
      batch.map(url => fetch(url))
    );
    results.push(...batchResults);

    // 선택사항: 배치 사이에 지연
    if (batches.indexOf(batch) < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

// 100개 URL을 한 번에 10개씩 가져오기
const urls = Array.from({ length: 100 }, (_, i) =>
  \`https://api.example.com/item/\${i}\`
);

const responses = await fetchWithRateLimit(urls, 10);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 시각화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-pack';

// 평균/스무딩을 위한 데이터 포인트 그룹화
const temperatures = [
  72, 73, 71, 74, 75, 76, 74, 73,
  72, 71, 70, 69, 68, 67, 66, 65
];

// 4시간마다 평균
const hourlyGroups = chunk(4, temperatures);
const averages = hourlyGroups.map(group =>
  group.reduce((sum, temp) => sum + temp, 0) / group.length
);

console.log(averages);
// [72.5, 74.75, 71.5, 66.5]

// 히스토그램 빈 생성
function createHistogram(data: number[], binSize: number) {
  const sorted = [...data].sort((a, b) => a - b);
  const bins = chunk(binSize, sorted);

  return bins.map((bin, i) => ({
    range: \`\${bin[0]}-\${bin[bin.length - 1]}\`,
    count: bin.length,
    average: bin.reduce((sum, n) => sum + n, 0) / bin.length
  }));
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      pipe와 함께
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, chunk } from 'fp-pack';

const processData = pipe(
  (data: number[]) => data.filter(n => n > 0),
  (data: number[]) => chunk(5, data),
  (chunks: number[][]) => chunks.map(chunk => ({
    items: chunk,
    sum: chunk.reduce((a, b) => a + b, 0),
    avg: chunk.reduce((a, b) => a + b, 0) / chunk.length
  }))
);

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const result = processData(data);
// [
//   { items: [1, 2, 3, 4, 5], sum: 15, avg: 3 },
//   { items: [6, 7, 8, 9, 10], sum: 40, avg: 8 },
//   { items: [11, 12], sum: 23, avg: 11.5 }
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      엣지 케이스
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-pack';

// 빈 배열
chunk(3, []);
// []

// 배열보다 큰 크기
chunk(10, [1, 2, 3]);
// [[1, 2, 3]]

// 크기 1
chunk(1, [1, 2, 3]);
// [[1], [2], [3]]

// 유효하지 않은 크기는 빈 배열 반환
chunk(0, [1, 2, 3]);      // []
chunk(-5, [1, 2, 3]);     // []
chunk(Infinity, [1, 2]);  // []
chunk(NaN, [1, 2]);       // []

// 소수 크기는 내림됨
chunk(2.7, [1, 2, 3, 4, 5]);
// [[1, 2], [3, 4], [5]]  (크기 2로 처리됨)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부 사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      chunk는 배열 슬라이싱을 사용하여 효율적으로 청크를 생성합니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`function chunk<T>(size: number, arr: T[]): T[][] {
  const chunkSize = Math.floor(size);
  if (!Number.isFinite(chunkSize) || chunkSize <= 0) {
    return [];
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      함수는 크기를 내림하고 처리 전에 검증합니다. Array.slice를 사용하여
      각 청크에 대해 새로운 배열을 생성하여 불변성을 보장합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">chunk</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/array/chunk.ts"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/take');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          take
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          앞에서부터 N개를 가져옵니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/drop');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          drop
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          앞에서 N개를 제거합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/partition');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          partition
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          조건에 따라 두 그룹으로 분리합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/flatten');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          flatten
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          한 단계만 평탄화합니다
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/drop"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/drop');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          drop →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          배열의 앞 n개 요소를 제외하는 drop에 대해 알아보세요.
        </p>
      </a>

      <a
        href="/array/groupBy"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/groupBy');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          groupBy →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          키 함수로 배열 요소를 그룹화하는 groupBy를 알아보세요.
        </p>
      </a>
    </div>
  </div>
);
