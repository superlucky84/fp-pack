# Core Composition

## `pipe` (sync)

```ts
import { pipe, filter, map, take } from 'fp-pack';

const result = pipe(
  users,
  filter((u: User) => u.active),
  map((u) => u.name),
  take(10)
);
```

## `pipeAsync` (async)

```ts
import { pipeAsync } from 'fp-pack';

const user = await pipeAsync(
  userId,
  async (id: string) => fetch(`/api/users/${id}`),
  async (res) => res.json(),
  (data) => data.user
);
```
