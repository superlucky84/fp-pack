import curry from '../composition/curry';

type Prop = {
  <K extends PropertyKey>(...args: [key: K]): <T extends Partial<Record<K, unknown>>>(obj: T) => T[K];
  <T, K extends keyof T = keyof T>(...args: [key: K, obj: T]): T[K];
};

/**
 * prop - 안전한 프로퍼티 접근
 */
function prop(key: PropertyKey, obj: unknown): unknown {
  return obj == null ? undefined : (obj as Record<PropertyKey, unknown>)[key];
}

const curriedProp = curry(prop) as Prop;
export default curriedProp;
