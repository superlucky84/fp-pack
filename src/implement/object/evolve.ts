import curry from '../composition/curry';

type Transformations<T, R> = {
  [K in keyof R]: K extends keyof T ? (value: T[K]) => R[K] : never;
};
type Evolved<T, R> = {
  [K in keyof T]: K extends keyof R ? ({} extends Pick<R, K> ? T[K] | R[K] : R[K]) : T[K];
};
type Inputs<F> = { [K in keyof F]: F[K] extends (value: infer A) => unknown ? A : never };
type Outputs<F> = { [K in keyof F]: F[K] extends (...args: never[]) => infer R ? R : never };

type Evolve = {
  <T extends object, R>(transformations: Transformations<T, R>): (obj: T) => Evolved<T, R>;
  <F extends Record<PropertyKey, (value: never) => unknown>>(
    transformations: F
  ): <T extends Inputs<F>>(obj: T) => Evolved<T, Outputs<F>>;
  <T extends object, R>(transformations: Transformations<T, R>, obj: T): Evolved<T, R>;
  // Explicit legacy input arguments remain valid for shape-preserving transforms.
  <T extends object>(transformations: Partial<{ [K in keyof T]: (value: T[K]) => T[K] }>, obj: T): T;
};

/** evolve - transform selected values, preserving untouched properties. */
function evolve(transformations: Record<PropertyKey, (value: unknown) => unknown>, obj: object): object {
  const result: Record<PropertyKey, unknown> = { ...obj };
  for (const key of Reflect.ownKeys(transformations)) {
    if (!Object.prototype.propertyIsEnumerable.call(transformations, key)) continue;
    const transformer = transformations[key];
    if (typeof transformer === 'function') {
      result[key] = transformer((obj as Record<PropertyKey, unknown>)[key]);
    }
  }
  return result;
}

export default curry(evolve) as Evolve;
