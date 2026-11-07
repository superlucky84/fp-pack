import curry from '../composition/curry';
import type { PathKey } from './pathKey';
import type { PathValue } from './path.types';

type PathOr = {
  <D>(defaultValue: D): <const P extends readonly PathKey[]>(pathArray: P) => <T>(obj: T) => NonNullable<PathValue<T, P>> | D;
  <D, const P extends readonly PathKey[]>(defaultValue: D, pathArray: P): <T>(obj: T) => NonNullable<PathValue<T, P>> | D;
  <T, D, const P extends readonly PathKey[]>(defaultValue: D, pathArray: P, obj: T): NonNullable<PathValue<T, P>> | D;
};

/**
 * pathOr - 기본값이 있는 깊은 프로퍼티 접근
 */
function pathOr<T, D>(defaultValue: D, pathArray: PathKey[], obj: any): T | D {
  const value = pathArray.reduce((current, key) => (current == null ? undefined : current[key]), obj) as T | undefined;
  return value == null ? defaultValue : value;
}

const curriedPathOr = curry(pathOr) as PathOr;
export default curriedPathOr;
export type { PathKey };
