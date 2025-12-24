/** throttle - 호출 제어 (쓰로틀) */
function throttle<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let lastCall = 0;
  let trailingArgs: any[] | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const invoke = (ctx: any, args: any[]) => {
    lastCall = Date.now();
    fn.apply(ctx, args);
  };

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now();
    const remaining = ms - (now - lastCall);

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      trailingArgs = null;
      invoke(this, args);
    } else {
      trailingArgs = args;
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          timeoutId = null;
          if (trailingArgs) {
            invoke(this, trailingArgs);
            trailingArgs = null;
          }
        }, remaining);
      }
    }
  } as T;

  return throttled;
}
export default throttle;
