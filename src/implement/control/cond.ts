/**
 * cond - 다중 조건 분기 (switch 대체)
 */
function cond<T, R>(
  conditions: ReadonlyArray<readonly [(value: T) => boolean, (value: T) => R]>
): (value: T) => R | undefined;
function cond<T, R extends readonly unknown[]>(
  conditions: readonly [...{ [K in keyof R]: readonly [(value: T) => boolean, (value: T) => R[K]] }]
): (value: T) => R[number] | undefined;
function cond<T, R>(
  conditions: ReadonlyArray<readonly [(value: T) => boolean, (value: T) => R]>
): (value: T) => R | undefined {
  return (value: T) => {
    for (const [predicate, handler] of conditions) {
      if (predicate(value)) {
        return handler(value);
      }
    }
    return undefined;
  };
}

export default cond;
