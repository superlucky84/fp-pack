const FL_MAP = 'fantasy-land/map';
const FL_MAP_SYMBOL = typeof Symbol === 'function' ? Symbol.for(FL_MAP) : undefined;

/**
 * fmap - Functor map (객체의 map 구현에 위임)
 */
function fmap<T, R>(fn: (value: T) => R): (functor: unknown) => unknown {
  return (functor: unknown) => {
    if (functor === null || functor === undefined) {
      throw new TypeError('fmap: functor is null or undefined');
    }

    const record = functor as Record<PropertyKey, unknown>;
    const map =
      (record.map as ((f: (value: T) => R) => unknown) | undefined) ??
      (record[FL_MAP] as ((f: (value: T) => R) => unknown) | undefined) ??
      (FL_MAP_SYMBOL ? (record[FL_MAP_SYMBOL] as ((f: (value: T) => R) => unknown) | undefined) : undefined);

    if (typeof map !== 'function') {
      throw new TypeError('fmap: functor does not implement map');
    }

    return map.call(functor, fn);
  };
}

export default fmap;
