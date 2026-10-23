# Currying and Data-Last

Most multi-arg helpers are data-last and curried. Pair them with value-first `pipe(value, ...)` to anchor types:
- Good: `map(fn)`, `filter(pred)`, `replace(from, to)`, `assoc('k', v)`, `path(['a', 'b'])`
- Single-arg helpers are already unary; use them directly

Use `curryN(arity, fn)` when defaults, optional arguments or rest arguments need
an explicit execution threshold. Choose a literal 0–32 that covers all required
parameters. Values and results infer from fn; `undefined` counts as a supplied
slot. Extra valid arguments are forwarded. Empty calls keep a positive stage
waiting; count zero returns a callable and never executes during construction.

```ts
import { curryN, pipe } from 'fp-pack';
const add = (a: number, b = 10) => a + b;
const addFive = curryN(2, add)(5);
pipe(3, addFive, value => value.toFixed()); // string
curryN(1, add)(2); // 12
```

The count must permit a valid original call; it cannot skip required parameters
or exceed a finite parameter list. Bind explicit receivers first. Generic and
overloaded functions retain Parameters/ReturnType extraction limits; unknown-length
spreads return unknown when completion is uncertain. Do not add corrective casts.
