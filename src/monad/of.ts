const FL_OF = 'fantasy-land/of';
const FL_OF_SYMBOL = typeof Symbol === 'function' ? Symbol.for(FL_OF) : undefined;

/**
 * of - Applicative/Monad of (타입의 of 구현에 위임)
 */
function of<T>(typeRep: unknown): (value: T) => unknown {
  return (value: T) => {
    if (typeRep === null || typeRep === undefined) {
      throw new TypeError('of: typeRep is null or undefined');
    }

    const record = typeRep as Record<PropertyKey, unknown>;
    const of =
      (record.of as ((v: T) => unknown) | undefined) ??
      (record[FL_OF] as ((v: T) => unknown) | undefined) ??
      (FL_OF_SYMBOL ? (record[FL_OF_SYMBOL] as ((v: T) => unknown) | undefined) : undefined);

    if (typeof of === 'function') {
      return of.call(typeRep, value);
    }

    if (typeof typeRep === 'function') {
      return (typeRep as (v: T) => unknown)(value);
    }

    throw new TypeError('of: typeRep does not implement of');
  };
}

export default of;
