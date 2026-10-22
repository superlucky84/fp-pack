# fp-pack 타입 추론 검토와 개선

기준: `b9a92e0` / 0.15.0. 작업 브랜치: `feat/inference-usability`.
요구사항·설계·진행 상태의 원본은 루트의 REQUIREMENTS.md, DESIGN.md,
IMPLEMENT.md, MANUAL_TEST_CHECKLIST.md다. 이 문서는 분석 결과와 사용상의
경계를 설명한다. 버전 변경이나 배포는 포함하지 않는다.

## 확인한 구조적 문제와 수정

| 문제 | 영향 | 개선 |
|---|---|---|
| 변환 후에도 원본 타입을 반환하는 evolve | number를 string으로 바꿔도 후속 숫자 연산이 컴파일됨 | 콜백 입력과 변경된 출력 속성을 각각 추론. 선택적 변환 누락 시 원본 타입 보존 |
| merge의 교집합 반환 | 충돌 속성이 never로 계산되지만 실행 결과는 오른쪽 값 | 오른쪽 덮어쓰기, 선택적 키와 중첩 병합을 모델링 |
| optional 속성을 배제하는 Record 제약 | prop/pick/omit의 커리 호출이 선택적 속성을 거절 | 선택성을 허용하고 required 읽기에 불필요한 undefined 제거 |
| 입력과 무관한 경로·평탄화 출력 제네릭 | 실제 숫자를 string으로 선언할 수 있음 | 리터럴 경로와 실제 리프 타입에서 출력 계산 |
| getOrElse([])의 너무 이른 타입 확정 | never[] 또는 readonly 입력 거절 | 입력을 받는 호출에서 배열 원소와 읽기 전용 여부 계산 |
| 비변경 배열 함수의 가변 배열 제약 | readonly 데이터가 파이프 시작부터 거절됨 | 비변경 함수가 readonly 입력을 허용. find/partition 등의 가드 좁히기 보존 |
| 스트림의 초기 오버로드 선택 | 저장한 take(2)가 unknown으로 고정되거나 async 입력 거절 | 입력에서 원소 타입과 동기·비동기 모드를 계산 |
| 비동기 콜백을 동기 입력에 허용 | Promise 조건이 항상 참으로 취급되거나 flatMap이 실행 중 실패 | 비동기 입력 경계를 명시하고 잘못된 조합을 타입 단계에서 거절. JS 호출에는 명확한 오류 |
| 문자열 iterable 감지 누락 | 타입은 문자열을 허용하지만 실행이 거절됨 | 문자열 순회 지원, 깊은 평탄화의 중첩 문자열은 원자 값으로 유지 |
| zip의 수동 iterator 정리 누락 | 소비를 중단해도 소스의 finally가 실행되지 않음 | 양쪽 return 호출, 한쪽 정리가 실패해도 나머지 정리 |
| compose의 무검사 fallback | 잘못된 조합이 never/any로 컴파일됨 | 역방향 인접 함수 연결을 검사 |
| 분기 반환 제네릭의 조기 확정 | 단계별 ifElse 등이 unknown을 반환 | 해당 분기 함수를 받는 시점에 반환 타입 추론. 타입 가드 입력 좁히기 추가 |
| curry의 불완전한 중간 호출 선언 | 실행 가능한 (a)(b,c)가 타입 오류 | 2–5개 필수 인자의 남은 단계마다 묶음 호출 지원 |
| matchSideEffect의 효과 타입 소실 | 정확한 효과를 처리할 때 다시 힌트가 필요함 | 효과 페이로드와 순수 값 분기를 구분해 추론 |

특히 반환 함수에 동기/비동기 오버로드만 추가하는 방식은 저장 후 호출에는
도움이 되지만 pipe 안의 인라인 콜백 추론을 악화시켰다. 최종 선언은 실제
입력에서 실행 모드를 계산하며, 이미 입력 계약이 있는 저장 콜백을 위한
오버로드를 별도로 둔다. 깊은 병합의 타입 매핑은 심벌 키를 선언 파일에
이름을 유지한 채 출력할 수 있도록 원본 속성 구조를 보존한다.

## 사용하는 방식

```ts
import { pipe, evolve, getOrElse, map } from 'fp-pack';

const changed = pipe({ count: 2 }, evolve({ count: n => n.toFixed() }));
// changed.count: string

type User = { name: string };
const names = (users: readonly User[] | undefined) =>
  pipe(users, getOrElse([]), map(user => user.name));
// names: (users: readonly User[] | undefined) => string[]
```

비동기 스트림 콜백은 입력을 한 번 변환해 사용한다.

```ts
import { pipe } from 'fp-pack';
import { toAsync, filter, toArray } from 'fp-pack/stream';

const selected = pipe([1, 2, 3], toAsync, filter(async n => n > 1), toArray);
// Promise<number[]>; 결과 [2, 3]
```

`pipeAsync` 자체는 Iterable의 프로토콜을 바꾸지 않는다. 동기 map/zipWith는
Promise 원소를 만들 수 있고, toArray가 이를 기다린다. 동기 조건 검사나
flatMap에서 Promise를 사용하는 경우에는 toAsync 경계가 필요하다.

## 남아 있는 경계와 다음 개선 후보

- 임의의 generic-first 함수 합성을 TypeScript가 모두 추론할 수는 없다.
  `pipe(identity)`와 `pipeAsync(identity)`는 관계를 보존하지만, 여러 제네릭
  단계를 조합할 때는 값 우선 파이프 또는 재사용 함수의 입력 계약이 필요하다.
  효과 파이프는 기존 SideEffect 입력 오버로드를 유지한다.
- 입력을 받기 전에 여러 호출로 분리한 무주석 콜백에는 아직 문맥이 없다.
  `pipe(value, ifElse(predicate, onTrue, onFalse))`처럼 함께 제공하면 입력이
  콜백까지 전달된다. 저장하는 콜백 자체의 입력 계약은 정당한 모델 정보다.
- curry는 2–5개 필수 인자에서 검증했다. 기본값·선택적 인자·rest 인자는
  JavaScript의 fn.length와 정적 인자 개수가 다를 수 있다. 명시적 arity를
  받는 별도 API는 후속 설계 후보이며 이번 변경은 그 실행 의미를 바꾸지 않는다.
- 구조적 병합의 대상은 일반 데이터 레코드다. 클래스 인스턴스, 프로토타입,
  비열거 속성이나 접근자까지 타입만으로 객체 전개 의미를 완벽히 모델링하지 않는다.
- 타입 계산 한도는 pipe의 문맥 단계 32개, 경로·깊은 병합 8단계,
  깊은 평탄화 16단계다. 동적 경로와 재귀 한도 이후 결과는 unknown이다.
  길게 이어지는 인라인 파이프는 작은 파이프로 나눈다.
- any나 명시적 단언으로 지워진 정보는 라이브러리가 복구할 수 없다.

## 검증 경로

- 소스 회귀: `data-inference.type-test.ts`, `boundary-inference.type-test.ts`,
  `inference-hardening.type-test.ts`, `src/stream/inference.type-test.ts`.
- 실행 회귀: 데이터 변환, 문자열 순회, async 콜백, zip 조기 종료·정리 실패.
- 설치 회귀: `scripts/check-packed-pipe.mjs`가 tarball을 별도 프로젝트에
  설치하고 새 회귀 전체 및 표시된 README·한영 문서 예제를 컴파일한다.
  exactOptionalPropertyTypes를 켠 선언 생성과 ESM/CJS 실행도 검사한다.
- 컴파일 비용: 기준 전체 corpus 232,065 instantiations에서 새 회귀를 포함한
  275,788으로 약 18.8% 증가했다. 경과 시간은 환경 영향을 받으므로 비교 지표로
  사용하지 않았다. 최종 실행 결과와 컴파일러 버전은 IMPLEMENT.md에 기록한다.
- IDE hover와 브라우저의 수동 확인은 자동 컴파일 성공과 구분해
  MANUAL_TEST_CHECKLIST.md에 남긴다.
