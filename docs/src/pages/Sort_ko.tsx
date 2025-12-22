import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Sort_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      sort
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      사용자 정의 비교 함수로 배열 정렬
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      sort란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        sort
      </strong>{' '}
      는 정렬 순서를 정의하는 사용자 정의 비교 함수를 사용하여 배열을 정렬합니다.
      <br />
      <br />
      정렬 키를 추출하는 <code>sortBy</code>와 달리, <code>sort</code>는 비교 로직에 대한
      완전한 제어권을 제공합니다. 비교 함수는 두 요소를 받아 숫자를 반환합니다:
      첫 번째가 앞에 와야 하면 음수, 뒤에 와야 하면 양수, 같으면 0입니다.
      <br />
      <br />
      sort는 원본을 수정하지 않고 새로운 정렬된 배열을 생성하여 함수형 프로그래밍에 안전합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// 오름차순
const ascending = sort((a, b) => a - b, numbers);
// [1, 1, 2, 3, 4, 5, 6, 9]

// 내림차순
const descending = sort((a, b) => b - a, numbers);
// [9, 6, 5, 4, 3, 2, 1, 1]

// 원본 배열은 변경되지 않음
console.log(numbers);
// [3, 1, 4, 1, 5, 9, 2, 6]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      비교 함수
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      비교 함수 <code>(a, b) =&gt; number</code>는 정렬 순서를 결정합니다:
    </p>

    <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
      <ul class="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <strong class="text-blue-600 dark:text-blue-400">음수 반환</strong> (예: -1):
          <code>a</code>가 <code>b</code>보다 앞에 옴
        </li>
        <li>
          <strong class="text-green-600 dark:text-green-400">양수 반환</strong> (예: 1):
          <code>a</code>가 <code>b</code>보다 뒤에 옴
        </li>
        <li>
          <strong class="text-gray-600 dark:text-gray-400">0 반환</strong>:
          <code>a</code>와 <code>b</code>가 같음 (순서 유지)
        </li>
      </ul>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

// 숫자: 뺄셈으로 비교
const ascending = (a: number, b: number) => a - b;
const descending = (a: number, b: number) => b - a;

sort(ascending, [5, 2, 8, 1]);   // [1, 2, 5, 8]
sort(descending, [5, 2, 8, 1]);  // [8, 5, 2, 1]

// 문자열: localeCompare 사용
const alphabetical = (a: string, b: string) => a.localeCompare(b);
const reverseAlpha = (a: string, b: string) => b.localeCompare(a);

sort(alphabetical, ['Charlie', 'Alice', 'Bob']);
// ['Alice', 'Bob', 'Charlie']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      객체 정렬
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

interface User {
  name: string;
  age: number;
  score: number;
}

const users: User[] = [
  { name: 'Alice', age: 30, score: 85 },
  { name: 'Bob', age: 25, score: 92 },
  { name: 'Charlie', age: 35, score: 78 },
];

// 나이로 정렬 (오름차순)
const byAge = sort((a, b) => a.age - b.age, users);
// [Bob(25), Alice(30), Charlie(35)]

// 점수로 정렬 (내림차순 - 높은 점수 먼저)
const byScore = sort((a, b) => b.score - a.score, users);
// [Bob(92), Alice(85), Charlie(78)]

// 이름으로 정렬 (알파벳순)
const byName = sort((a, b) => a.name.localeCompare(b.name), users);
// [Alice, Bob, Charlie]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      다중 레벨 정렬
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

interface Product {
  category: string;
  price: number;
  name: string;
}

const products: Product[] = [
  { category: 'Electronics', price: 299, name: 'Keyboard' },
  { category: 'Electronics', price: 199, name: 'Mouse' },
  { category: 'Furniture', price: 499, name: 'Chair' },
  { category: 'Electronics', price: 199, name: 'Headset' },
];

// 카테고리, 그 다음 가격, 그 다음 이름으로 정렬
const multiSort = sort((a, b) => {
  // 먼저 카테고리로
  const categoryComp = a.category.localeCompare(b.category);
  if (categoryComp !== 0) return categoryComp;

  // 그 다음 가격으로
  const priceComp = a.price - b.price;
  if (priceComp !== 0) return priceComp;

  // 마지막으로 이름으로
  return a.name.localeCompare(b.name);
}, products);

// 결과: Electronics 항목이 먼저, 가격순, 그 다음 이름순
// [Mouse(199), Headset(199), Keyboard(299), Chair(499)]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      날짜 정렬
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

interface Event {
  title: string;
  date: Date;
}

const events: Event[] = [
  { title: 'Workshop', date: new Date('2024-03-15') },
  { title: 'Conference', date: new Date('2024-01-20') },
  { title: 'Meetup', date: new Date('2024-02-10') },
];

// 날짜로 정렬 (빠른 순)
const chronological = sort(
  (a, b) => a.date.getTime() - b.date.getTime(),
  events
);
// [Conference(Jan 20), Meetup(Feb 10), Workshop(Mar 15)]

// 날짜로 정렬 (늦은 순)
const reverseChron = sort(
  (a, b) => b.date.getTime() - a.date.getTime(),
  events
);
// [Workshop(Mar 15), Meetup(Feb 10), Conference(Jan 20)]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      대소문자 구분 없는 정렬
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

const names = ['charlie', 'Alice', 'BOB', 'david'];

// 대소문자 구분 (기본)
sort((a, b) => a.localeCompare(b), names);
// ['Alice', 'BOB', 'charlie', 'david']

// 대소문자 구분 없음
sort(
  (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
  names
);
// ['Alice', 'BOB', 'charlie', 'david']

// locale 옵션 사용
sort(
  (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }),
  names
);
// ['Alice', 'BOB', 'charlie', 'david']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      커링과 함께 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sort, curry } from 'fp-kit';

// 커링된 버전 생성
const sortCurried = curry(sort);

// 재사용 가능한 비교 함수 생성
const sortAscending = sortCurried((a: number, b: number) => a - b);
const sortDescending = sortCurried((a: number, b: number) => b - a);
const sortAlphabetically = sortCurried((a: string, b: string) => a.localeCompare(b));

const numbers = [3, 1, 4, 1, 5];
const words = ['zebra', 'apple', 'mango'];

sortAscending(numbers);       // [1, 1, 3, 4, 5]
sortDescending(numbers);      // [5, 4, 3, 1, 1]
sortAlphabetically(words);    // ['apple', 'mango', 'zebra']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      sort vs. sortBy
    </h2>

    <div class="grid gap-6 mt-6">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          sort를 사용할 때:
        </h4>
        <ul class="text-sm text-blue-800 dark:text-blue-200 list-disc list-inside space-y-2">
          <li>복잡한 비교 로직이 필요할 때 (다중 레벨 정렬)</li>
          <li>키 추출 없이 요소를 직접 비교할 때</li>
          <li>조건에 따라 다른 비교 규칙이 필요할 때</li>
          <li>정렬 순서에 대한 최대 제어가 필요할 때</li>
        </ul>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">
          sortBy를 사용할 때:
        </h4>
        <ul class="text-sm text-green-800 dark:text-green-200 list-disc list-inside space-y-2">
          <li>단일 속성이나 계산된 값으로 정렬할 때</li>
          <li>간단한 오름차순만 필요할 때</li>
          <li>더 간결한 코드를 원할 때</li>
          <li>사용자 정의 비교 로직이 필요 없을 때</li>
        </ul>
      </div>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { sort, sortBy } from 'fp-kit';

const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];

// sort 사용 (명시적 비교 함수)
sort((a, b) => a.age - b.age, users);

// sortBy 사용 (단일 속성에 더 간결)
sortBy(user => user.age, users);

// 둘 다 같은 결과를 생성하지만:
// - sort는 완전한 제어권 제공
// - sortBy는 간단한 경우에 더 간결`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      중요한 참고사항
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. 불변성
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          새로운 정렬된 배열을 생성합니다. 원본 배열은 절대 수정되지 않아
          함수형 프로그래밍 패턴에 안전합니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 안정 정렬
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          동일한 값을 가진 요소는 원본 배열에서의 상대적 순서를 유지합니다
          (안정 정렬 동작).
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 숫자 비교
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          숫자의 경우 뺄셈을 사용하세요: 오름차순은 <code>(a, b) =&gt; a - b</code>,
          내림차순은 <code>(a, b) =&gt; b - a</code>.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. 문자열 비교
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          문자열의 경우 단순 비교 대신 적절한 로케일 인식 정렬을 위해
          <code>localeCompare</code>를 사용하세요.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/sortBy"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/sortBy');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          sortBy →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          속성이나 계산된 값으로 더 간단하게 정렬하는 sortBy에 대해 알아보세요.
        </p>
      </a>

      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          정렬되고 필터링된 결과를 위해 sort와 filter를 결합하세요.
        </p>
      </a>
    </div>
  </div>
);
