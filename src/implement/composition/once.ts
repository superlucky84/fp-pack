/**
 * once - 한 번만 실행되는 함수
 */
type AnyFn = (...args: any[]) => any;

function once<T extends AnyFn>(fn: T): T {
  let called = false;
  let value: any;

  const wrapped = function (this: any, ...args: any[]) {
    if (!called) {
      called = true;
      value = fn.apply(this, args);
    }
    return value;
  };

  return wrapped as T;
}

export default once;
