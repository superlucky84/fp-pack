/** debounceLeading - 첫 호출만 실행하는 디바운스 */
function debounceLeading<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    if (!timer) {
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = undefined;
      }, ms);
    }
  };

  return debounced as T;
}

export default debounceLeading;
