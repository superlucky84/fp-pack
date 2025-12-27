const FL_CHAIN = 'fantasy-land/chain';
const FL_CHAIN_SYMBOL = typeof Symbol === 'function' ? Symbol.for(FL_CHAIN) : undefined;

/**
 * chain - Monad chain/flatMap (객체의 chain/flatMap 구현에 위임)
 */
function chain<T>(fn: (value: T) => unknown): (monad: unknown) => unknown {
  return (monad: unknown) => {
    if (monad === null || monad === undefined) {
      throw new TypeError('chain: monad is null or undefined');
    }

    const record = monad as Record<PropertyKey, unknown>;
    const chain =
      (record.chain as ((f: (value: T) => unknown) => unknown) | undefined) ??
      (record.flatMap as ((f: (value: T) => unknown) => unknown) | undefined) ??
      (record[FL_CHAIN] as ((f: (value: T) => unknown) => unknown) | undefined) ??
      (FL_CHAIN_SYMBOL ? (record[FL_CHAIN_SYMBOL] as ((f: (value: T) => unknown) => unknown) | undefined) : undefined);

    if (typeof chain !== 'function') {
      throw new TypeError('chain: monad does not implement chain/flatMap');
    }

    return chain.call(monad, fn);
  };
}

export default chain;
