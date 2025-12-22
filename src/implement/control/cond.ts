/**
 * cond - 다중 조건 분기 (switch 대체)
 */
function cond<T, R>(
  conditions: Array<[(value: T) => boolean, (value: T) => R]>
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
