/** retry - 실패 시 재시도 (옵션 대기 시간 포함) */
import delay from './delay';
import curry from '../composition/curry';

function retry<T>(times: number, fn: () => Promise<T>, delayMs = 0): Promise<T> {
  return (async () => {
    let attempt = 0;
    while (true) {
      try {
        return await fn();
      } catch (err) {
        attempt += 1;
        if (attempt > times) throw err;
        if (delayMs > 0) {
          await delay(delayMs);
        }
      }
    }
  })();
}
export default curry(retry);
