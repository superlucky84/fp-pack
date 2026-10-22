import curry from '../composition/curry';
import type { PathKey } from './pathKey';
import type { PathValue } from './path.types';

type Path = {
  <const P extends readonly PathKey[]>(pathArray: P): <T>(obj: T) => PathValue<T, P>;
  <T, const P extends readonly PathKey[]>(pathArray: P, obj: T): PathValue<T, P>;
};

/**
 * path - 안전한 깊은 프로퍼티 접근
 */
function path<T>(pathArray: PathKey[], obj: any): T | undefined {
  return pathArray.reduce((current, key) => (current == null ? undefined : current[key]), obj) as T | undefined;
}

const curriedPath = curry(path) as Path;
export default curriedPath;
export type { PathKey };
