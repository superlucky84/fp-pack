/**
 * partial - 인자를 미리 고정한 함수 생성
 */
function partial<Args extends any[], Rest extends any[], R>(
  fn: (...args: [...Args, ...Rest]) => R,
  ...preset: Args
): (...rest: Rest) => R {
  return function partiallyApplied(this: unknown, ...rest: Rest) {
    const all = [...preset, ...rest] as [...Args, ...Rest];
    return fn.apply(this as any, all);
  };
}

export default partial;
