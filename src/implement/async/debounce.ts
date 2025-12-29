import curry from '../composition/curry';

/** debounce - 호출 제어 (디바운스) */
function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    timer = setTimeout(() => {
      timer = undefined;
      fn.apply(context, args);
    }, ms);
  };

  return debounced as T;
}
export default curry(debounce);
