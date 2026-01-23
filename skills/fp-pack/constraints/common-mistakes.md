# Common Mistakes and Fixes

## Do not wrap data in zero-arg functions

```ts
// BAD
pipe(() => [1, 2, 3], filter((n: number) => n % 2 === 0));

// GOOD (value-first)
pipe([1, 2, 3], filter((n: number) => n % 2 === 0));

// GOOD (no-input pipeline)
pipe(from([1, 2, 3]), filter((n: number) => n % 2 === 0))();
```

## `ifElse`/`cond` need total branches

```ts
const status = ifElse((n: number) => n > 0, from('ok'), from('fail'));

const label = cond<number, string>([
  [(n) => n > 0, () => 'positive'],
  [() => true, () => 'non-positive'] // default keeps it total
]);
```

## `map` is for arrays/iterables (not single values)

```ts
const save = pipe(
  (s: AppState) => JSON.stringify({ todos: s.todos, nextId: s.nextId }),
  tap((json) => localStorage.setItem(STORAGE_KEY, json))
);
save(state);
```

## SideEffect pipelines and `runPipeResult` belong at the boundary

```ts
const pipeline = pipeSideEffect(findUser, (user) => user.email);
const result = runPipeResult(pipeline(input)); // outside the pipeline
```

DOM APIs are imperative by nature. Keep them outside or at the boundary (use `tap` for final effects).
