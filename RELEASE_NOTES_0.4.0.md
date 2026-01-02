# fp-pack v0.4.0

## 🎉 What's New

### Extended Type Inference for Pipelines

All pipeline functions now support **TypeScript type inference for up to 10 composed functions** (previously limited to 5).

This means you can compose more complex pipelines while maintaining full type safety and autocomplete support throughout the entire chain.

**All pipeline variants** benefit from this improvement:
- `pipe` - Synchronous pipelines
- `pipeAsync` - Async pipelines
- `pipeSideEffect` - Error-handling pipelines
- `pipeSideEffectStrict` - Strict typing pipelines
- `pipeAsyncSideEffect` - Async error handling
- `pipeAsyncSideEffectStrict` - Strict async pipelines


## 🎯 Use Cases

### Complex Data Transformations

```typescript
import { pipe, filter, map, sort, groupBy, take } from 'fp-pack';

// Now with full type inference through all 10 steps!
const processUsers = pipe(
  fetchUsers,
  filter(isActive),
  map(normalize),
  sort(byLastName),
  groupBy('department'),
  mapValues(take(5)),
  filterGroups,
  sortGroups,
  formatOutput,
  addMetadata
)(rawData);
// TypeScript knows the exact type at every step
```

