/** debounceLeadingTrailing - 처음과 마지막에만 실행하는 디바운스 */
function debounceLeadingTrailing<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pending = false;
  let lastArgs: Parameters<T> | undefined;
  let lastThis: unknown;

  const flush = () => {
    timer = undefined;
    if (pending && lastArgs) {
      pending = false;
      fn.apply(lastThis, lastArgs);
    }
  };

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    if (!timer) {
      fn.apply(this, args);
      timer = setTimeout(flush, ms);
      return;
    }

    pending = true;
    lastArgs = args;
    lastThis = this;
    clearTimeout(timer);
    timer = setTimeout(flush, ms);
  };

  return debounced as T;
}

export default debounceLeadingTrailing;
