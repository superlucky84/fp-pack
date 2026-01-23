# Quick Examples

## Example 1: User Data Processing Pipeline

```ts
import { pipe, filter, map, take, sortBy } from 'fp-pack';

const result = pipe(
  users,
  filter((user: User) => user.active),
  sortBy((user) => -user.activityScore),
  map((user) => user.name),
  take(10)
);
```

## Example 2: API Request with Early Exit

```ts
import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const result = runPipeResult(
  await pipeAsyncSideEffect(
    'user-123',
    async (userId: string) => {
      const res = await fetch(`/api/users/${userId}`);
      return res.ok ? res : SideEffect.of(() => `HTTP ${res.status}`);
    },
    async (res) => res.json()
  )
);
```

## Example 3: Value-first pipeline

```ts
import { pipe, filter, map } from 'fp-pack';

const result = pipe(
  [1, 2, 3, 4, 5],
  filter((n: number) => n % 2 === 0),
  map((n) => n * 2)
);
```
