/** range - lazily generate a numeric range (end excluded) */
function range(start: number, end: number): IterableIterator<number> {
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return (function* () {})();
  }

  if (start === end) {
    return (function* () {})();
  }

  const step = start < end ? 1 : -1;

  return (function* () {
    for (let value = start; step > 0 ? value < end : value > end; value += step) {
      yield value;
    }
  })();
}

export default range;
