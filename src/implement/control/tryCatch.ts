/**
 * tryCatch - 예외를 함수형으로 처리
 */
function tryCatch<T, R>(
  tryFn: (value: T) => R,
  catchFn: (error: Error, value: T) => R
): (value: T) => R {
  // TODO: implement
  return tryFn;
}

export default tryCatch;
