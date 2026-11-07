import curry from '../composition/curry';
import type { MergeResult } from './merge.types';

type Merge = {
  <T>(...args: [obj1: T]): <U>(obj2: U) => MergeResult<T, U>;
  <T, U>(...args: [obj1: T, obj2: U]): MergeResult<T, U>;
};

/**
 * merge - 객체 병합 (얕은 병합)
 */
function merge<T, U>(obj1: T, obj2: U): T & U {
  return {
    ...(obj1 as object),
    ...(obj2 as object),
  } as T & U;
}

const curriedMerge = curry(merge) as Merge;
export default curriedMerge;
