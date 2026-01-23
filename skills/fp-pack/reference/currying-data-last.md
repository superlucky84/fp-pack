# Currying and Data-Last

Most multi-arg helpers are data-last and curried. Pair them with value-first `pipe(value, ...)` to anchor types:
- Good: `map(fn)`, `filter(pred)`, `replace(from, to)`, `assoc('k', v)`, `path(['a', 'b'])`
- Single-arg helpers are already unary; use them directly
