# TypeScript: Data-last Generic Inference

Some data-last helpers return a generic function whose type is only determined by the final data argument. Prefer value-first `pipe(value, ...)` so the input anchors generics; use hints when needed.

## Quick fix (pipeHint or wrapper)

```ts
import { pipe, pipeHint, zip, some } from 'fp-pack';

// Prefer value-first to anchor generics
const values: number[] = [1, 2, 3];
const withValueFirst = pipe(
  values,
  zip([1, 2, 3]),
  some(([a, b]) => a > b)
);

const withPipeHint = pipe(
  pipeHint<number[], Array<[number, number]>>(zip([1, 2, 3])),
  some(([a, b]) => a > b)
);
```

If you prefer, a tiny wrapper like `(values) => zip([1, 2, 3], values)` works too.

Utilities that may need a hint in data-last pipelines:
- Array: `chunk`, `drop`, `take`, `zip`
- Object: `assoc`, `assocPath`, `dissocPath`, `evolve`, `mapValues`, `merge`, `mergeDeep`, `omit`, `path`, `pick`, `prop`
- Async: `timeout`
