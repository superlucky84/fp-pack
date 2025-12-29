import curry from '../composition/curry';

/** equals - 깊은 비교 */
function equals(a: any, b: any): boolean {
  return deepEqual(a, b, new WeakMap());
}

function deepEqual(a: any, b: any, seen: WeakMap<object, object>): boolean {
  if (a === b) return true;

  // Handle NaN
  if (typeof a === 'number' && typeof b === 'number') {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
  }

  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  // Prevent circular reference issues
  if (seen.has(a)) return seen.get(a) === b;
  seen.set(a, b);

  // Date
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Map
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    const bEntries = Array.from(b.entries());
    for (const [aKey, aVal] of a.entries()) {
      let found = false;
      for (let i = 0; i < bEntries.length; i++) {
        const [bKey, bVal] = bEntries[i];
        if (deepEqual(aKey, bKey, seen) && deepEqual(aVal, bVal, seen)) {
          bEntries.splice(i, 1);
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
  }

  // Set
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    const bValues = Array.from(b.values());
    for (const aVal of a.values()) {
      let found = false;
      for (let i = 0; i < bValues.length; i++) {
        if (deepEqual(aVal, bValues[i], seen)) {
          bValues.splice(i, 1);
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
  }

  // Array
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i], seen)) return false;
    }
    return true;
  }

  // Object (including symbol keys)
  const aKeys = Reflect.ownKeys(a);
  const bKeys = Reflect.ownKeys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key], seen)) return false;
  }

  return true;
}

export default curry(equals);
