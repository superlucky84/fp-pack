# fp-kit AI Agent Skills

This document provides guidelines for AI coding assistants when working in projects that use fp-kit. Follow these instructions to write clean, declarative, functional code using fp-kit's utilities.

## Project Philosophy

fp-kit is a TypeScript functional programming library focused on:

1. **Function Composition**: Use `pipe` and `pipeAsync` as the primary tools for combining operations
2. **Declarative Code**: Prefer function composition over imperative loops and mutations
3. **No Monad Pattern**: Traditional FP monads (Option, Either, etc.) are NOT used - they don't compose well with `pipe`
4. **SideEffect Pattern**: Handle errors and side effects using `SideEffect` with `pipeSideEffect` / `pipeAsyncSideEffect` pipelines
5. **Lazy Evaluation**: Use `stream/*` functions for efficient iterable processing

## Core Composition Functions

### pipe - Synchronous Function Composition

**Always prefer `pipe` for synchronous operations** instead of manual imperative code.

```typescript
import { pipe, map, filter, take } from 'fp-kit';

// GOOD: Declarative pipe composition
const processUsers = pipe(
  filter((user: User) => user.age >= 18),
  map(user => user.name.toUpperCase()),
  take(10)
);

// BAD: Imperative approach
const processUsers = (users: User[]) => {
  const result = [];
  for (const user of users) {
    if (user.age >= 18) {
      result.push(user.name.toUpperCase());
      if (result.length >= 10) break;
    }
  }
  return result;
};
```

> For SideEffect-based early exits, use `pipeSideEffect`.

### pipeAsync - Asynchronous Function Composition

**Use `pipeAsync` for any async operations** including API calls, database queries, or async transformations.

```typescript
import { pipeAsync } from 'fp-kit';

// GOOD: Async pipe composition
const fetchUserData = pipeAsync(
  async (userId: string) => fetch(`/api/users/${userId}`),
  async (response) => response.json(),
  (data) => data.user
);

// BAD: Manual async handling
const fetchUserData = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data.user;
};
```

> For SideEffect-aware async pipelines, use `pipeAsyncSideEffect`.

## SideEffect Pattern - Error Handling in Pipes

**DO NOT use try-catch blocks in SideEffect-aware pipelines.** Use `pipeSideEffect` / `pipeAsyncSideEffect` with the `SideEffect` class to handle errors declaratively.

```typescript
import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

// GOOD: SideEffect for error handling
const processData = pipeSideEffect(
  validateInput,
  (data) => {
    if (!data.isValid) {
      return SideEffect.of(() => {
        throw new Error('Invalid data');
      });
    }
    return data;
  },
  transformData,
  runPipeResult
);

const finalValue = processData(input); // Executes SideEffect if present

// BAD: try-catch in imperative code
const processData = (input: any) => {
  try {
    const validated = validateInput(input);
    if (!validated.isValid) throw new Error('Invalid data');
    return transformData(validated);
  } catch (e) {
    // ...
  }
};
```

**Key SideEffect functions:**
- `SideEffect.of(fn, label?)` - Create a side effect container
- `isSideEffect(value)` - Type guard to check for SideEffect
- `runPipeResult(result)` - Execute SideEffect or return value
- `matchSideEffect(result, { value, effect })` - Pattern match on result

## Stream Functions - Lazy Iterable Processing

**Use `stream/*` functions for lazy, memory-efficient data processing** instead of array methods.

```typescript
import { pipe } from 'fp-kit';
import { map, filter, take, toArray, range } from 'fp-kit/stream';

// GOOD: Lazy stream processing
const processLargeDataset = pipe(
  filter((n: number) => n % 2 === 0),
  map(n => n * n),
  take(100),
  toArray
);

// Processes only what's needed - memory efficient
const result = processLargeDataset(range(1, 1000000));

// BAD: Eager array processing
const result = Array.from({ length: 1000000 }, (_, i) => i + 1)
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .slice(0, 100); // Processed entire dataset!
```

**Stream functions support both sync and async iterables:**
- Sync: `Iterable<T>` → `IterableIterator<R>`
- Async: `AsyncIterable<T>` → `AsyncIterableIterator<R>`

## Available Functions by Category

### Composition
- `pipe` - Left-to-right function composition (sync)
- `pipeSideEffect` - Left-to-right composition with SideEffect short-circuiting
- `compose` - Right-to-left function composition
- `curry` - Curry a function
- `partial` - Partial application
- `flip` - Flip function argument order
- `complement` - Logical negation
- `identity` - Return input unchanged
- `constant` - Always return the same value
- `tap` - Execute side effect and return original value
- `once` - Execute function only once
- `memoize` - Cache function results
- `SideEffect` - Side effect container
- `isSideEffect` - Type guard for SideEffect
- `matchSideEffect` - Pattern match on value/SideEffect
- `runPipeResult` - Execute SideEffect or return value

### Async
- `pipeAsync` - Async function composition
- `pipeAsyncSideEffect` - Async composition with SideEffect short-circuiting
- `delay` - Delay execution
- `timeout` - Add timeout to promise
- `retry` - Retry failed operations
- `debounce` - Debounce function calls
- `debounceLeading` - Debounce with leading edge
- `debounceLeadingTrailing` - Debounce with both edges
- `throttle` - Throttle function calls

### Array
- `map`, `filter`, `reduce`, `flatMap`
- `find`, `some`, `every`
- `take`, `drop`, `takeWhile`, `dropWhile`
- `chunk`, `zip`, `zipWith`, `unzip`, `zipIndex`
- `uniq`, `uniqBy`, `sort`, `sortBy`, `groupBy`
- `concat`, `append`, `prepend`, `flatten`, `flattenDeep`
- `head`, `tail`, `last`, `init`
- `range`, `partition`, `scan`

### Object
- `prop`, `propOr`, `path`, `pathOr`
- `pick`, `omit`
- `assoc`, `assocPath`, `dissoc`, `dissocPath`
- `merge`, `mergeDeep`, `mergeAll`
- `keys`, `values`, `entries`
- `mapValues`, `evolve`
- `has`, `hasPath`

### Control Flow
- `ifElse` - Conditional branching
- `when`, `unless` - Conditional execution
- `cond` - Multi-branch conditional
- `tryCatch` - Safe function execution
- `guard` - Validation guard

### Stream (Lazy Iterables)
- `append`, `concat`, `prepend`
- `map`, `filter`, `flatMap`, `flatten`, `flattenDeep`
- `take`, `takeWhile`, `drop`, `dropWhile`, `chunk`
- `zip`, `zipWith`, `find`, `some`, `every`
- `reduce`, `scan`
- `range`
- `toArray` - Materialize stream to array
- `toAsync` - Convert to async iterable

### Math
- `add`, `sub`, `mul`, `div`
- `sum`, `mean`, `min`, `max`
- `round`, `floor`, `ceil`, `randomInt`

### String
- `trim`, `split`, `join`, `replace`
- `toUpper`, `toLower`
- `startsWith`, `endsWith`, `match`

### Equality
- `equals`, `includes`
- `isNil`, `isEmpty`, `isType`
- `gt`, `gte`, `lt`, `lte`
- `clamp`

### Nullable
- `maybe`, `mapMaybe`, `getOrElse`, `fold`, `result`

### Debug
- `assert`, `invariant`, `log`

## Coding Guidelines for AI Agents

### 1. Always Prefer pipe/pipeAsync

```typescript
// GOOD
const result = pipe(
  trim,
  split(','),
  map(toNumber),
  filter(isPositive)
)(input);

// BAD
const trimmed = trim(input);
const parts = split(',')(trimmed);
const numbers = map(toNumber)(parts);
const result = filter(isPositive)(numbers);
```

### 2. Use Curried Functions (Where Available)

Most multi-arg functions are curried. Many single-arg utilities are not (e.g. `uniq`, `flatten`, `flattenDeep`, `head`, `tail`, `last`, `init`, `range`, `sum`, `mean`, `min`, `max`, `round`, `floor`, `ceil`, `trim`, `toLower`, `toUpper`, `isNil`, `isEmpty`, `isType`). Use those directly.

```typescript
import { pipe, map, filter } from 'fp-kit';

// GOOD: Curried usage in pipe
const processUsers = pipe(
  filter(user => user.active),
  map(user => user.name)
);

// GOOD: Partial application
const filterActive = filter((user: User) => user.active);
const getNames = map((user: User) => user.name);
const processUsers = pipe(filterActive, getNames);
```

### 3. Choose pipe vs pipeAsync

- **Use `pipe`** for synchronous data transformations
- **Use `pipeAsync`** when ANY step involves:
  - API calls
  - Database queries
  - File I/O
  - AsyncIterable processing
  - Any Promise-returning function
- **Use `pipeSideEffect` / `pipeAsyncSideEffect`** when SideEffect short-circuiting is required

```typescript
// Sync: use pipe
const processNumbers = pipe(
  map((n: number) => n * 2),
  filter(n => n > 10)
);

// Async: use pipeAsync
const processUsers = pipeAsync(
  async (ids: string[]) => db.users.findMany(ids),
  map(user => user.profile),
  filter(profile => profile.verified)
);
```

### 4. Use stream/* for Large Datasets

```typescript
import { pipe } from 'fp-kit';
import { filter, map, take, toArray, range } from 'fp-kit/stream';

// GOOD: Lazy processing
const getFirst100Even = pipe(
  filter((n: number) => n % 2 === 0),
  take(100),
  toArray
);

// Stops after finding 100 items (only processes 100, not 1 million)
const result = getFirst100Even(range(1, 1000000));
```

### 5. Handle Errors with SideEffect

```typescript
import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const safeDivide = pipeSideEffect(
  (input: { a: number; b: number }) => {
    if (input.b === 0) {
      return SideEffect.of(() => {
        throw new Error('Division by zero');
      }, 'DIVISION_ERROR');
    }
    return input;
  },
  ({ a, b }) => a / b,
  runPipeResult
);

const result = safeDivide({ a: 10, b: 2 }); // 5
```

### 6. Use Control Flow Functions

```typescript
import { pipe, ifElse, when, cond } from 'fp-kit';

// GOOD: Declarative conditionals
const processAge = pipe(
  ifElse(
    (age: number) => age >= 18,
    age => ({ age, status: 'adult' }),
    age => ({ age, status: 'minor' })
  )
);

// GOOD: Multi-branch with cond
const gradeToLetter = cond([
  [(n: number) => n >= 90, () => 'A'],
  [(n: number) => n >= 80, () => 'B'],
  [(n: number) => n >= 70, () => 'C'],
  [() => true, () => 'F']
]);
```

### 7. Object Transformations

```typescript
import { pipe, pick, mapValues, merge } from 'fp-kit';

// GOOD: Declarative object operations
const processUser = pipe(
  pick(['name', 'email', 'age']),
  mapValues((value) => typeof value === 'string' ? value.trim() : value),
  merge({ verified: false })
);
```

## Anti-Patterns to Avoid

### ❌ Don't use imperative loops

```typescript
// BAD
const result = [];
for (const item of items) {
  if (item.active) {
    result.push(item.name);
  }
}

// GOOD
const result = pipe(
  filter((item: Item) => item.active),
  map(item => item.name)
)(items);
```

### ❌ Don't chain array methods

```typescript
// BAD
const result = users
  .filter(u => u.active)
  .map(u => u.name)
  .slice(0, 10);

// GOOD
const result = pipe(
  filter((u: User) => u.active),
  map(u => u.name),
  take(10)
)(users);
```

### ❌ Don't use traditional monads (Option, Either, Maybe)

```typescript
// BAD - Don't implement this pattern
const maybeUser = Option.of(user)
  .map(u => u.profile)
  .flatMap(p => p.email);

// GOOD - Use SideEffect with pipeSideEffect
const getUserEmail = pipeSideEffect(
  (user: User) => {
    if (!user.profile) {
      return SideEffect.of(() => null, 'NO_PROFILE');
    }
    return user.profile;
  },
  (profile) => {
    if (!profile.email) {
      return SideEffect.of(() => null, 'NO_EMAIL');
    }
    return profile.email;
  }
);
```

### ❌ Don't mutate data

```typescript
// BAD
const updateUser = (user: User) => {
  user.lastLogin = new Date();
  return user;
};

// GOOD
const updateUser = (user: User) => ({
  ...user,
  lastLogin: new Date()
});

// EVEN BETTER with fp-kit
import { assoc } from 'fp-kit';
const updateUser = assoc('lastLogin', new Date());
```

## Quick Reference

### Import Paths
- Main functions: `import { pipe, map, filter } from 'fp-kit'`
- Async: `import { pipeAsync, delay, retry } from 'fp-kit'`
- SideEffect: `import { pipeSideEffect, pipeAsyncSideEffect, SideEffect } from 'fp-kit'`
- Stream: `import { map, filter, toArray } from 'fp-kit/stream'`

### When to Use What
- **Data transformation**: `pipe` + array/object functions
- **Async operations**: `pipeAsync`
- **Large datasets**: `stream/*` functions
- **Error handling**: `pipeSideEffect`/`pipeAsyncSideEffect` + `SideEffect`
- **Conditionals**: `ifElse`, `when`, `unless`, `cond`
- **Object access**: `prop`, `path`, `pick`, `omit`
- **Object updates**: `assoc`, `merge`, `evolve`

## UI Framework Integration Patterns

fp-kit works seamlessly with UI frameworks. Here are common patterns organized by **use case**, not framework.

### Pattern 1: Handling User Input

**When**: Form inputs, button clicks, drag & drop, any user interaction
**Where to use**: Event handlers (onChange, @input, on:click, etc.)

```typescript
import { pipe, pipeAsyncSideEffect, trim, prop, assoc, tap, SideEffect, runPipeResult } from 'fp-kit';

// GOOD: Process form input declaratively
const handleNameChange = pipe(
  prop('currentTarget'),           // Safer than target in most UI libs
  (el) => (el as HTMLInputElement).value,
  trim,
  tap((value) => {
    // Prefer updater form to avoid stale state in React-like frameworks
    setFormState(prev => assoc('name', value, prev));
  })
);

// Use in any framework:
// React: <input onChange={handleNameChange} />
// Vue: <input @input="handleNameChange" />
// Svelte: <input on:input={handleNameChange} />

// GOOD: Complex form validation
const validateFieldsOrStop = (data: any) => {
  const errors = validateFields(data);
  if (!errors) return data;
  return SideEffect.of(() => {
    setErrors(errors);
    return null;
  }, 'VALIDATION_ERROR');
};

const handleSubmit = pipeAsyncSideEffect(
  tap((e: Event) => e.preventDefault()),
  prop('currentTarget'),
  (form) => getFormData(form as HTMLFormElement),
  validateFieldsOrStop,          // Returns data or SideEffect
  sanitizeInput,
  submitToAPI,
  runPipeResult
);
```

### Pattern 2: Computing Derived/Reactive Values

**When**: Displaying filtered/sorted/transformed data from state
**Where to use**: Computed properties, memoized values, derived state

```typescript
import { pipe, filter, sortBy, map, take } from 'fp-kit';

// GOOD: Create reusable data transformation
const processUsers = pipe(
  filter((u: User) => u.status === 'active'),
  sortBy(u => u.lastLogin),
  map(u => ({ ...u, displayName: `${u.firstName} ${u.lastName}` })),
  take(50)
);

// Use in any framework:
// React: const processed = useMemo(() => processUsers(users), [users]);
// Vue: const processed = computed(() => processUsers(users.value));
// Svelte: $: processed = processUsers($users);
// Solid: const processed = createMemo(() => processUsers(users()));

// GOOD: Search + filter + pagination
const searchUsers = (query: string, page: number) =>
  pipe(
    filter((u: User) =>
      u.name.toLowerCase().includes(query.toLowerCase())
    ),
    sortBy(u => u.name),
    chunk(20),              // Paginate
    (pages) => pages[page] || []
  );

// React example:
// const results = useMemo(
//   () => searchUsers(searchQuery, currentPage)(allUsers),
//   [searchQuery, currentPage, allUsers]
// );
```

### Pattern 3: Async Data Fetching and Processing

**When**: API calls, database queries, file operations
**Where to use**: Lifecycle hooks, effects, async event handlers

```typescript
import { pipeAsync, pipeAsyncSideEffect, tap, SideEffect, runPipeResult } from 'fp-kit';
import { filter, map } from 'fp-kit';

// GOOD: Fetch + transform + update state
const fetchAndProcessUsers = pipeAsync(
  async (userId: string) => fetch(`/api/users/${userId}/friends`),
  async (res) => res.json(),
  filter((u: User) => u.isActive),
  map(u => ({ id: u.id, name: u.name, avatar: u.avatar })),
  (processed) => {
    setUsers(processed);    // Framework-specific state update
    return processed;
  }
);

// Use in any framework:
// React: useEffect(() => { fetchAndProcessUsers(id); }, [id]);
// Vue: watchEffect(() => fetchAndProcessUsers(userId.value));
// Svelte: $: fetchAndProcessUsers($userId);

// GOOD: Error handling with SideEffect
const validateResponseOrStop = (users: unknown) => {
  if (!Array.isArray(users)) {
    return SideEffect.of(() => {
      setError('Invalid response');
      return [];
    }, 'INVALID_RESPONSE');
  }
  return users as User[];
};

const safeFetchUsers = pipeAsyncSideEffect(
  fetchUsers,
  validateResponseOrStop,
  filter((u: User) => u.verified),
  tap((users) => setUsers(users)),
  runPipeResult
);
```

### Pattern 4: List/Table Data Processing

**When**: Displaying lists, tables, grids with search/filter/sort
**Where to use**: Component render logic, computed values

```typescript
import { pipe, filter, sortBy, groupBy, map } from 'fp-kit';

// GOOD: Complete table data pipeline
const processTableData = (
  data: Product[],
  filters: Filters,
  sortConfig: SortConfig
) => pipe(
  // Apply filters
  filter((p: Product) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    return true;
  }),
  // Apply sorting
  sortBy(sortConfig.direction === 'asc'
    ? (p) => p[sortConfig.key]
    : (p) => -p[sortConfig.key]
  ),
  // Add row metadata
  map((product, index) => ({
    ...product,
    rowId: `row-${index}`,
    isEven: index % 2 === 0
  }))
)(data);

// GOOD: Group for categorized display
const groupProductsByCategory = pipe(
  groupBy((p: Product) => p.category),
  (grouped) => Object.entries(grouped).map(([category, products]) => ({
    category,
    products,
    count: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price, 0)
  }))
);
```

### Pattern 5: Form State Management

**When**: Complex forms with validation and state
**Where to use**: Form submission, field updates, validation

```typescript
import { pipe, pipeSideEffect, assoc, pick, mapValues, SideEffect, runPipeResult } from 'fp-kit';

// GOOD: Update nested form state immutably
const updateField = (fieldName: string, value: any) =>
  pipe(
    assoc(fieldName, value),
    (state) => assoc('touched', { ...state.touched, [fieldName]: true }, state)
  );

// GOOD: Form submission with validation
const validateFormOrStop = (data: any) => {
  const errors = validateFormData(data);
  return Object.keys(errors).length > 0
    ? SideEffect.of(() => {
        setFormErrors(errors);
        return null;
      }, 'VALIDATION_ERROR')
    : data;
};

const submitForm = pipeSideEffect(
  pick(['email', 'password', 'name']),  // Only include relevant fields
  mapValues((v) => typeof v === 'string' ? v.trim() : v),  // Sanitize
  validateFormOrStop,
  submitToAPI,
  runPipeResult
);

// GOOD: Multi-step form state
const validateCurrentStepOrStop = (state: any) => {
  const errors = validateCurrentStep(state);
  if (!errors) return state;
  return SideEffect.of(() => {
    setStepErrors(errors);
    return state;
  }, 'STEP_VALIDATION_ERROR');
};

const goToNextStep = pipeSideEffect(
  validateCurrentStepOrStop,
  (state) => assoc('currentStep', state.currentStep + 1, state),
  runPipeResult
);
```

### Pattern 6: Real-time Data Streams

**When**: WebSocket updates, SSE, real-time data
**Where to use**: WebSocket handlers, event listeners

```typescript
import { pipe, filter, map, take } from 'fp-kit';

// GOOD: Process incoming WebSocket messages
const handleWebSocketMessage = pipe(
  (event: MessageEvent) => JSON.parse(event.data),
  filter((msg: Message) => msg.type === 'USER_UPDATE'),
  map(msg => msg.payload),
  (update) => {
    // Update state with new data
    setUsers(prevUsers =>
      prevUsers.map(u => u.id === update.id ? { ...u, ...update } : u)
    );
  }
);

// websocket.onmessage = handleWebSocketMessage;

// GOOD: Batch updates with stream
import { pipe as streamPipe, filter as streamFilter, take as streamTake, toArray } from 'fp-kit/stream';
import { pipeAsync, runPipeResult } from 'fp-kit';

const processBatchUpdates = async (updates: AsyncIterable<Update>) => {
  const processed = await streamPipe(
    streamFilter((u: Update) => u.priority === 'high'),
    streamTake(100),
    toArray
  )(updates);

  batchUpdateUI(processed);
};
```

### Pattern 7: Component Props Transformation

**When**: Passing data to child components
**Where to use**: Component composition, prop drilling

```typescript
import { pipe, pick, map, merge } from 'fp-kit';

// GOOD: Transform data for child component
const prepareUserCardProps = pipe(
  pick(['id', 'name', 'avatar', 'status']),
  merge({
    onClick: handleUserClick,
    className: 'user-card'
  })
);

// Usage:
// const userProps = prepareUserCardProps(user);
// <UserCard {...userProps} />

// GOOD: Prepare list of component props
const prepareListItems = pipe(
  filter((item: Item) => item.visible),
  map(item => ({
    key: item.id,
    ...pick(['title', 'description', 'icon'], item),
    onClick: () => handleClick(item.id),
    isActive: item.id === activeId
  }))
);

// Usage:
// {prepareListItems(items).map(props => <ListItem {...props} />)}
```

### Pattern 8: State Update Reducers

**When**: Complex state updates, global state management
**Where to use**: Redux/Zustand/Pinia reducers, state update functions

```typescript
import { pipe, assoc, dissoc, merge, evolve } from 'fp-kit';

// GOOD: Redux-style reducer with fp-kit
const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_USER':
      return pipe(
        prop('users'),
        append(action.payload),
        (users) => assoc('users', users, state)
      )(state);

    case 'UPDATE_USER':
      return pipe(
        prop('users'),
        map((u: User) => u.id === action.payload.id
          ? merge(u, action.payload.updates)
          : u
        ),
        (users) => assoc('users', users, state)
      )(state);

    case 'DELETE_USER':
      return pipe(
        prop('users'),
        filter((u: User) => u.id !== action.payload),
        (users) => assoc('users', users, state)
      )(state);

    default:
      return state;
  }
};

// GOOD: Using evolve for nested updates
const updateNestedState = evolve({
  user: evolve({
    profile: merge({ verified: true }),
    settings: assoc('notifications', false)
  }),
  lastUpdated: () => new Date()
});
```

### Pattern 9: Optimistic Updates

**When**: UI updates before server confirmation
**Where to use**: Create/update/delete operations

```typescript
import { pipe, pipeAsync, append, filter } from 'fp-kit';

// GOOD: Optimistic create with rollback
const createItemOptimistically = (newItem: Item) => {
  const tempId = `temp-${Date.now()}`;
  const optimisticItem = { ...newItem, id: tempId, pending: true };

  // Immediately update UI
  setItems(pipe(append(optimisticItem)));

  // Then persist
  return pipeAsync(
    async () => api.createItem(newItem),
    (savedItem) => {
      // Replace temp with real item
      setItems(
        pipe(
          filter((item: Item) => item.id !== tempId),
          append(savedItem)
        )
      );
      return savedItem;
    }
  )().catch((error) => {
    // Rollback on error
    setItems(pipe(filter((item: Item) => item.id !== tempId)));
    throw error;
  });
};
```

### Pattern 10: URL/Query Parameter Handling

**When**: Syncing UI state with URL
**Where to use**: Routing, search parameters, filters

```typescript
import { pipe, pick, mapValues, merge } from 'fp-kit';

// GOOD: Parse query params to state
const parseQueryParams = pipe(
  (search: string) => new URLSearchParams(search),
  (params) => ({
    page: Number(params.get('page')) || 1,
    query: params.get('q') || '',
    category: params.get('category') || 'all',
    sort: params.get('sort') || 'date'
  })
);

// GOOD: Convert state to query params
const stateToQueryParams = pipe(
  pick(['page', 'query', 'category', 'sort']),
  (state) => {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });
    return params.toString();
  }
);

// Usage in framework router:
// const filters = parseQueryParams(location.search);
// navigate(`/products?${stateToQueryParams(currentState)}`);
```

### Pattern 11: Infinite Scroll / Virtual Lists

**When**: Large lists with lazy loading, infinite scroll, virtual rendering
**Where to use**: Scroll handlers, pagination, large dataset rendering

```typescript
import { pipe, pipeAsyncSideEffect, when, tap, runPipeResult } from 'fp-kit';
import { pipe as streamPipe, filter as streamFilter, take as streamTake, toArray } from 'fp-kit/stream';

// GOOD: Infinite scroll with pipe - all logic inside
const handleScroll = pipe(
  (e: Event) => e.target as HTMLElement,
  (el) => ({
    scrollTop: el.scrollTop,
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    hasMore,
    isLoading
  }),
  // Only load if near bottom, has more data, and not currently loading
  when(
    ({ scrollTop, scrollHeight, clientHeight, hasMore, isLoading }) =>
      scrollTop + clientHeight >= scrollHeight - 100 && hasMore && !isLoading,
    tap(() => loadNextPage())
  )
);

// GOOD: Load next page with stream processing
const loadNextPage = pipeAsyncSideEffect(
  async () => {
    setIsLoading(true);
    return fetchItemsFromAPI(currentPage);
  },
  // Use stream for lazy processing
  (items) => streamPipe(
    streamFilter((item: Item) => item.visible),
    streamTake(pageSize),
    toArray
  )(items),
  tap((newItems) => setItems(prev => [...prev, ...newItems])),
  tap(() => setCurrentPage(prev => prev + 1)),
  tap(() => setIsLoading(false)),
  runPipeResult
);

// GOOD: Virtual scroll - calculate visible range in pipe
const getVisibleItems = pipe(
  (scrollTop: number) => ({
    itemHeight: 50,
    viewportHeight: 600,
    bufferSize: 5,
    scrollTop
  }),
  ({ itemHeight, viewportHeight, bufferSize, scrollTop }) => ({
    startIndex: Math.floor(scrollTop / itemHeight),
    endIndex: Math.ceil((scrollTop + viewportHeight) / itemHeight),
    bufferSize
  }),
  ({ startIndex, endIndex, bufferSize }) => ({
    start: Math.max(0, startIndex - bufferSize),
    end: endIndex + bufferSize
  }),
  ({ start, end }) => allItems.slice(start, end)
);

// GOOD: Lazy load with intersection observer
const handleIntersection = pipe(
  (entries: IntersectionObserverEntry[]) => entries[0],
  when(
    (entry) => entry.isIntersecting && hasMoreItems && !isLoadingMore,
    tap(() => loadMoreItems())
  )
);
```

### Pattern 12: Conditional State Updates

**When**: State updates that depend on conditions
**Where to use**: Any state update with business logic

```typescript
import { pipe, ifElse, when, cond, tap, assoc, prop, append, map, filter, merge } from 'fp-kit';

// GOOD: Use ifElse instead of if/else
const toggleUserStatus = pipe(
  ifElse(
    (user: User) => user.status === 'active',
    assoc('status', 'inactive'),
    assoc('status', 'active')
  ),
  tap((updatedUser) => setUser(updatedUser))
);

// GOOD: Use ifElse for conditional side effects
const saveIfValid = pipe(
  validateForm,
  ifElse(
    (result) => result.isValid,
    pipe(
      tap((data) => saveToAPI(data)),
      tap(() => showSuccessMessage())
    ),
    tap((result) => setErrors(result.errors))
  )
);

// GOOD: Use cond for multi-branch logic (instead of switch/if-else chain)
const processUserAction = pipe(
  prop('action'),
  cond([
    [
      (action) => action.type === 'CREATE',
      pipe(
        prop('payload'),
        (user) => append(user),
        tap((users) => setUsers(users))
      )
    ],
    [
      (action) => action.type === 'UPDATE',
      pipe(
        prop('payload'),
        ({ id, updates }) => map((u: User) => u.id === id ? merge(u, updates) : u),
        tap((users) => setUsers(users))
      )
    ],
    [
      (action) => action.type === 'DELETE',
      pipe(
        prop('payload'),
        (id) => filter((u: User) => u.id !== id),
        tap((users) => setUsers(users))
      )
    ],
    [
      () => true, // default case
      tap(() => console.warn('Unknown action'))
    ]
  ])
);

// GOOD: Complex state update with all logic in pipe
const updateCartItem = (itemId: string, quantity: number) => pipe(
  // Get current cart
  (cart) => cart.items,
  // Find and update item
  map((item: CartItem) =>
    ifElse(
      () => item.id === itemId,
      pipe(
        assoc('quantity', quantity),
        when(
          (updated) => updated.quantity <= 0,
          () => null  // Mark for removal
        )
      ),
      () => item
    )(item)
  ),
  // Remove null items (quantity <= 0)
  filter((item) => item !== null),
  // Update state
  tap((items) => setCart({ items })),
  // Show notification
  tap((items) => {
    const item = items.find(i => i.id === itemId);
    if (item) showNotification(`Updated ${item.name}`);
    else showNotification('Item removed from cart');
  })
);
```

## Library Integration Quick Reference

This section shows how to integrate fp-kit with popular UI libraries. All examples keep logic **inside pipe chains** using fp-kit control flow functions.

### React Ecosystem

#### React Query / TanStack Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { pipe, filter, sortBy, map, tap, when } from 'fp-kit';

// GOOD: Transform data in select using pipe
const { data: activeUsers } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  select: pipe(
    filter((u: User) => u.status === 'active'),
    sortBy((u) => u.name),
    map((u) => ({ id: u.id, name: u.name, email: u.email }))
  )
});

// GOOD: Handle mutations with pipe
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: pipe(
    tap((newUser) => queryClient.invalidateQueries(['users'])),
    when(
      (user) => user.isPremium,
      tap(() => showPremiumWelcome())
    ),
    tap(() => navigate('/dashboard'))
  )
});

// GOOD: Optimistic updates in pipe
const updateMutation = useMutation({
  mutationFn: updateUser,
  onMutate: pipe(
    tap(async (newUser) => {
      await queryClient.cancelQueries(['users']);
      const previous = queryClient.getQueryData(['users']);
      queryClient.setQueryData(['users'], pipe(
        map((u: User) => u.id === newUser.id ? merge(u, newUser) : u)
      ));
      return { previous };
    })
  ),
  onError: pipe(
    tap((err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['users'], context.previous);
      }
    })
  )
});
```

#### Zustand

```typescript
import create from 'zustand';
import { pipe, append, filter, map, merge, ifElse, when, tap, prop, sortBy, assoc } from 'fp-kit';

// GOOD: All actions use pipe
const useStore = create((set, get) => ({
  users: [],

  addUser: pipe(
    (user: User) => user,
    when(
      (user) => !get().users.some(u => u.id === user.id),
      tap((user) => set(pipe(
        prop('users'),
        append(user),
        sortBy((u: User) => u.name),
        (users) => ({ users })
      )(get())))
    )
  ),

  updateUser: (id: string, updates: Partial<User>) => set(pipe(
    prop('users'),
    map((u: User) =>
      ifElse(
        () => u.id === id,
        merge(u, updates),
        () => u
      )(u)
    ),
    (users) => ({ users })
  )(get())),

  deleteUser: (id: string) => set(pipe(
    prop('users'),
    filter((u: User) => u.id !== id),
    (users) => ({ users })
  )(get())),

  toggleUserStatus: (id: string) => set(pipe(
    prop('users'),
    map((u: User) => u.id === id
      ? pipe(
          ifElse(
            (user) => user.status === 'active',
            assoc('status', 'inactive'),
            assoc('status', 'active')
          )
        )(u)
      : u
    ),
    (users) => ({ users })
  )(get()))
}));
```

#### Redux Toolkit

```typescript
import { createSlice } from '@reduxjs/toolkit';
import { pipe, append, filter, map, merge, sortBy, cond, assoc } from 'fp-kit';

// GOOD: Reducers with pipe - no manual mutations
const userSlice = createSlice({
  name: 'users',
  initialState: { list: [], loading: false },
  reducers: {
    addUser: (state, action) => {
      state.list = pipe(
        append(action.payload),
        sortBy((u: User) => u.createdAt)
      )(state.list);
    },

    updateUser: (state, action) => {
      state.list = pipe(
        map((u: User) =>
          u.id === action.payload.id
            ? merge(u, action.payload.updates)
            : u
        )
      )(state.list);
    },

    deleteUser: (state, action) => {
      state.list = pipe(
        filter((u: User) => u.id !== action.payload)
      )(state.list);
    },

    // Complex update with cond
    processAction: (state, action) => {
      state.list = pipe(
        cond([
          [
            () => action.type === 'BULK_ACTIVATE',
            map((u: User) => assoc('status', 'active', u))
          ],
          [
            () => action.type === 'BULK_DELETE',
            filter((u: User) => !action.payload.ids.includes(u.id))
          ],
          [
            () => true,
            (users) => users  // no change
          ]
        ])
      )(state.list);
    }
  }
});
```

#### React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { pipe, pipeSideEffect, pipeAsyncSideEffect, pick, mapValues, trim, when, tap, SideEffect, runPipeResult } from 'fp-kit';

// GOOD: Validation with pipeSideEffect
const validateFormData = pipeSideEffect(
  pick(['email', 'password', 'name']),
  mapValues((v) => typeof v === 'string' ? trim(v) : v),
  (data) => {
    const errors: any = {};
    if (!data.email?.includes('@')) errors.email = 'Invalid email';
    if ((data.password?.length || 0) < 8) errors.password = 'Too short';
    return Object.keys(errors).length > 0
      ? SideEffect.of(() => ({ values: {}, errors }), 'VALIDATION_ERROR')
      : { values: data, errors: {} };
  },
  runPipeResult
);

const { register, handleSubmit } = useForm({
  resolver: (values) => validateFormData(values)
});

// GOOD: Submit handler with pipeAsyncSideEffect
const onSubmit = pipeAsyncSideEffect(
  validateFormData,
  when(
    (result) => Object.keys(result.errors).length === 0,
    pipe(
      prop('values'),
      submitToAPI,
      tap(() => navigate('/success'))
    )
  ),
  runPipeResult
);
```

### Vue Ecosystem

#### Pinia

```typescript
import { defineStore } from 'pinia';
import { pipe, append, filter, map, merge, sortBy, when, tap } from 'fp-kit';

// GOOD: All actions use pipe
export const useUserStore = defineStore('user', {
  state: () => ({ users: [], loading: false }),

  actions: {
    addUser(user: User) {
      this.users = pipe(
        append(user),
        sortBy((u: User) => u.name),
        when(
          (users) => users.length > 100,
          tap(() => this.showWarning('Many users'))
        )
      )(this.users);
    },

    updateUser(id: string, updates: Partial<User>) {
      this.users = pipe(
        map((u: User) => u.id === id ? merge(u, updates) : u)
      )(this.users);
    },

    deleteUser(id: string) {
      this.users = pipe(
        filter((u: User) => u.id !== id),
        tap((users) => {
          if (users.length === 0) this.showEmptyState = true;
        })
      )(this.users);
    }
  }
});
```

#### VueUse

```typescript
import { useFetch } from '@vueuse/core';
import { pipe, filter, map, sortBy, tap } from 'fp-kit';

// GOOD: Transform response with pipe
const { data } = useFetch('/api/users', {
  afterFetch: pipe(
    prop('data'),
    filter((u: User) => u.verified),
    sortBy((u) => u.name),
    map((u) => ({ id: u.id, name: u.name })),
    tap((users) => console.log(`Loaded ${users.length} users`))
  )
}).json();

// GOOD: Refetch with condition in pipe
const { execute } = useFetch('/api/users');

const refreshIfNeeded = pipe(
  (lastUpdate: Date) => Date.now() - lastUpdate.getTime(),
  when(
    (diff) => diff > 5 * 60 * 1000, // 5 minutes
    tap(() => execute())
  )
);
```

### State Management Patterns

All state management libraries benefit from fp-kit's immutable update patterns:

```typescript
// GOOD: Generic state update pattern (works with any library)
const updateState = <T>(
  state: T,
  path: string[],
  updater: (value: any) => any
) => pipe(
  pathOr(null, path),
  updater,
  (newValue) => assocPath(path, newValue, state)
)(state);

// Usage in any framework:
// Redux: return updateState(state, ['users', 0, 'name'], toUpper);
// Zustand: set(updateState(get(), ['users', 0, 'name'], toUpper));
// Pinia: this.$state = updateState(this.$state, ['users', 0, 'name'], toUpper);
```

## Framework-Specific Notes

While the patterns above are framework-agnostic, here's where to apply them:

### Reactive/Computed Values
- **React**: `useMemo(() => pipe(...)(data), [data])`
- **Vue**: `computed(() => pipe(...)(data.value))`
- **Svelte**: `$: result = pipe(...)(data)`
- **Solid**: `createMemo(() => pipe(...)(data()))`

### Event Handlers
- **React**: `<button onClick={pipe(...)}>` or `const handler = pipe(...)`
- **Vue**: `<button @click="pipe(...)">` or `const handler = pipe(...)`
- **Svelte**: `<button on:click={pipe(...)}>` or `const handler = pipe(...)`

### Side Effects (API calls, subscriptions)
- **React**: `useEffect(() => { pipeAsync(...)() }, [deps])`
- **Vue**: `watchEffect(() => pipeAsync(...)())`
- **Svelte**: `onMount(() => pipeAsync(...)())`

### State Updates
- **React**: `setState(pipe(...)(currentState))`
- **Vue**: `state.value = pipe(...)(state.value)`
- **Svelte**: `$state = pipe(...)($state)`

All patterns use the same fp-kit functions - only the framework's state/reactive wrapper changes.

## Summary

As an AI coding assistant working with fp-kit:

1. **Default to `pipe`** for all data transformations
2. **Switch to `pipeAsync`** when async operations are involved (use `pipeAsyncSideEffect` if SideEffect is in the flow)
3. **Use `stream/*`** for lazy, memory-efficient processing
4. **Handle errors with `SideEffect`** in `pipeSideEffect`/`pipeAsyncSideEffect`, not try-catch
5. **Avoid imperative loops** - use fp-kit's declarative functions
6. **Never suggest monads** - use SideEffect pattern instead
7. **Keep code declarative** - describe what, not how
8. **All logic inside pipe** - never break out of pipe chains for conditionals or loops
9. **Use control flow functions** - `when`, `unless`, `ifElse`, `cond` instead of if/else/switch
10. **End SideEffect pipelines with `runPipeResult`** - handle SideEffect at the end of the pipeline, not in the middle
11. **Apply use-case patterns** - recognize scenarios (form handling, list processing, etc.) and apply appropriate fp-kit patterns
12. **Framework-agnostic core** - write fp-kit logic independent of UI framework, only wrap at the boundaries
13. **Library integration** - use pipe in select/resolver/action functions of popular libraries (React Query, Zustand, Pinia, etc.)

### Key Principles

**✅ DO: Keep everything in pipe**
```typescript
// GOOD: All logic inside pipe
const handleSubmit = pipeAsyncSideEffect(
  getFormData,
  validateFields,
  when(isValid, submitToAPI),
  unless(isValid, showErrors),
  runPipeResult
);
```

**❌ DON'T: Break out of pipe for conditionals**
```typescript
// BAD: Breaking pipe for if/else
const handleSubmit = pipe(
  getFormData,
  validateFields
);
const result = handleSubmit(form);
if (result.isValid) {  // ❌ Outside pipe
  submitToAPI(result);
} else {
  showErrors(result.errors);
}
```

**✅ DO: Use when/cond/ifElse for branching**
```typescript
// GOOD: Branching inside pipe
const processAction = pipe(
  cond([
    [(action) => action.type === 'CREATE', handleCreate],
    [(action) => action.type === 'UPDATE', handleUpdate],
    [(action) => action.type === 'DELETE', handleDelete],
    [() => true, handleDefault]
  ])
);
```

**❌ DON'T: Use switch/if-else chains**
```typescript
// BAD: Imperative branching
const processAction = (action) => {
  switch (action.type) {  // ❌ Imperative
    case 'CREATE': return handleCreate(action);
    case 'UPDATE': return handleUpdate(action);
    case 'DELETE': return handleDelete(action);
    default: return handleDefault(action);
  }
};
```

Your goal is to write clean, readable, functional code that leverages fp-kit's full potential in real-world UI applications.
