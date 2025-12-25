const FL_AP = 'fantasy-land/ap';
const FL_AP_SYMBOL = typeof Symbol === 'function' ? Symbol.for(FL_AP) : undefined;

/**
 * ap - Apply/Applicative ap (객체의 ap 구현에 위임)
 */
function ap<T, R>(applyFunctor: unknown): (valueFunctor: unknown) => unknown {
  return (valueFunctor: unknown) => {
    if (applyFunctor === null || applyFunctor === undefined) {
      throw new TypeError('ap: applyFunctor is null or undefined');
    }

    const record = applyFunctor as Record<PropertyKey, unknown>;
    const ap =
      (record.ap as ((value: unknown) => unknown) | undefined) ??
      (record[FL_AP] as ((value: unknown) => unknown) | undefined) ??
      (FL_AP_SYMBOL ? (record[FL_AP_SYMBOL] as ((value: unknown) => unknown) | undefined) : undefined);

    if (typeof ap !== 'function') {
      throw new TypeError('ap: applyFunctor does not implement ap');
    }

    return ap.call(applyFunctor, valueFunctor);
  };
}

export default ap;
