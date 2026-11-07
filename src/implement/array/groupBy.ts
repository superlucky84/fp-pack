import curry from '../composition/curry';

type GroupBy = {
  <T>(...args: [fn: (value: T) => string]): (arr: readonly T[]) => Record<string, T[]>;
  <T>(...args: [fn: (value: T) => string, arr: readonly T[]]): Record<string, T[]>;
};

/**
 * groupBy - 키 기준 그룹화
 */
function groupBy<T>(fn: (value: T) => string, arr: readonly T[]): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const key = fn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

const curriedGroupBy = curry(groupBy) as GroupBy;
export default curriedGroupBy;
