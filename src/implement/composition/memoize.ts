/**
 * memoize - 동일 입력에 대해 결과 캐싱
 */
type AnyFn = (...args: any[]) => any;

function memoize<T extends AnyFn>(fn: T): T {
  const cache = new Map<any, any>();
  const RESULT = Symbol('result');

  const memoized = function (this: any, ...args: any[]) {
    let node = cache;
    for (const arg of args) {
      if (!node.has(arg)) {
        node.set(arg, new Map());
      }
      node = node.get(arg);
    }

    if (node.has(RESULT)) {
      return node.get(RESULT);
    }

    const value = fn.apply(this, args);
    node.set(RESULT, value);
    return value;
  };

  return memoized as T;
}

export default memoize;
