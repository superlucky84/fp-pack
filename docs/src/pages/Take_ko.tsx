import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Take_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      take
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      배열에서 처음 n개의 요소를 추출합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      take란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        take
      </strong>{' '}
      는 배열에서 처음 n개의 요소를 추출하여 새로운 배열로 반환합니다.
      <br />
      <br />
      페이지네이션, 결과 제한, 미리보기 표시 또는 컬렉션의 앞부분에서 일부 데이터를 가져올 때
      주로 사용됩니다. n이 배열 길이를 초과하면 전체 배열의 복사본을 반환합니다.
      <br />
      <br />
      take는 원본 배열을 수정하지 않고 새로운 배열을 생성하므로 함수형 프로그래밍에 안전합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5];

// 처음 3개 요소 가져오기
take(3, numbers);
// [1, 2, 3]

// 원본 배열은 변경되지 않음
console.log(numbers);
// [1, 2, 3, 4, 5]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      요소 가져오기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit';

const data = [10, 20, 30, 40, 50];

// 처음 2개 요소
take(2, data);
// [10, 20]

// 처음 1개 요소
take(1, data);
// [10]

// 모든 요소
take(5, data);
// [10, 20, 30, 40, 50]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      엣지 케이스
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit';

const items = [1, 2, 3];

// n이 배열 길이를 초과하는 경우 - 전체 배열의 복사본 반환
take(10, items);
// [1, 2, 3]

// 0개 요소
take(0, items);
// []

// 음수 n - 빈 배열 반환
take(-5, items);
// []

// 빈 배열
take(3, []);
// []`}
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
      code={`import { take } from 'fp-kit';

interface Post {
  id: number;
  title: string;
  content: string;
}

const allPosts: Post[] = [
  { id: 1, title: '첫 번째 글', content: '...' },
  { id: 2, title: '두 번째 글', content: '...' },
  { id: 3, title: '세 번째 글', content: '...' },
  // ... 더 많은 게시글
];

// 첫 페이지 표시 (페이지당 5개)
const pageSize = 5;
const firstPage = take(pageSize, allPosts);

// 다음 페이지는 drop과 함께 사용
import { drop } from 'fp-kit';

const getPage = (pageNumber: number, pageSize: number) => {
  const startIndex = pageNumber * pageSize;
  return take(pageSize, drop(startIndex, allPosts));
};

const page1 = getPage(0, 5); // 처음 5개 게시글
const page2 = getPage(1, 5); // 다음 5개 게시글`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      미리보기 표시
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit';

interface Product {
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { name: '노트북', price: 999, category: '전자기기' },
  { name: '마우스', price: 29, category: '전자기기' },
  { name: '키보드', price: 79, category: '전자기기' },
  { name: '모니터', price: 299, category: '전자기기' },
  { name: '책상', price: 399, category: '가구' },
  // ... 더 많은 상품
];

// 상위 3개 추천 상품 표시
const featuredProducts = take(3, products);

// 검색 결과 미리보기
const searchResults = [...]; // 많은 결과
const previewResults = take(10, searchResults);
console.log(\`\${searchResults.length}개 중 \${previewResults.length}개 표시\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      상위 N개 순위
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take, sortBy } from 'fp-kit';

interface Player {
  name: string;
  score: number;
}

const players: Player[] = [
  { name: 'Alice', score: 850 },
  { name: 'Bob', score: 920 },
  { name: 'Charlie', score: 780 },
  { name: 'David', score: 950 },
  { name: 'Eve', score: 880 },
];

// 상위 3명 플레이어 가져오기
const sortedByScore = sortBy(p => -p.score, players); // 내림차순 정렬
const topThree = take(3, sortedByScore);
// [David(950), Bob(920), Eve(880)]

// 순위표 표시
topThree.forEach((player, index) => {
  console.log(\`\${index + 1}위. \${player.name}: \${player.score}점\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      최근 항목
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit';

interface Activity {
  id: number;
  action: string;
  timestamp: Date;
  user: string;
}

const activities: Activity[] = [
  { id: 101, action: '로그인', timestamp: new Date('2024-03-20T10:30:00'), user: 'Alice' },
  { id: 102, action: '프로필 수정', timestamp: new Date('2024-03-20T10:45:00'), user: 'Bob' },
  { id: 103, action: '파일 업로드', timestamp: new Date('2024-03-20T11:00:00'), user: 'Charlie' },
  { id: 104, action: '댓글 작성', timestamp: new Date('2024-03-20T11:15:00'), user: 'Alice' },
  // ... 더 많은 활동
];

// 최근 5개 활동 표시
const recentActivities = take(5, activities);

// 활동 피드
console.log('최근 활동:');
recentActivities.forEach(activity => {
  console.log(\`\${activity.user} - \${activity.action}\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      커링과 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take, curry } from 'fp-kit';

// 커링 버전 생성
const takeCurried = curry(take);

// 재사용 가능한 함수 생성
const takeThree = takeCurried(3);
const takeFive = takeCurried(5);
const takeTen = takeCurried(10);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

takeThree(numbers);  // [1, 2, 3]
takeFive(numbers);   // [1, 2, 3, 4, 5]
takeTen(numbers);    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// pipe에서 사용
import { pipe } from 'fp-kit';

const processData = pipe(
  sortBy((x: number) => x),
  takeThree
);

processData([5, 2, 8, 1, 9]);  // [1, 2, 5]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      주요 특징
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. 불변성
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          항상 새로운 배열을 생성합니다. 원본 배열은 변경되지 않아
          함수형 프로그래밍 패턴에 안전합니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 안전한 경계 처리
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          엣지 케이스를 우아하게 처리합니다: 음수 n은 빈 배열을 반환하고,
          n이 길이보다 크면 전체 배열의 복사본을 반환합니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 성능
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          효율적인 slice 연산을 사용합니다. O(n) 시간 복잡도를 가지며,
          n은 가져오는 요소의 개수입니다.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. 커링 친화적
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          curry와 자연스럽게 작동하여 일반적인 take 연산을 위한
          재사용 가능한 부분 적용을 만들 수 있습니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/ko/array/drop"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/drop');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          drop →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          요소를 건너뛰는 take의 보완 함수인 drop에 대해 알아보세요.
        </p>
      </a>

      <a
        href="/ko/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          위치가 아닌 조건에 따라 요소를 추출하는 방법을 알아보세요.
        </p>
      </a>
    </div>
  </div>
);
