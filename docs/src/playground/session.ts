/** A superseded async run must never replace newer controls/results. */
export function createRunGate() {
  let revision = 0;
  return {
    next: () => ++revision,
    current: (id: number) => id === revision,
    invalidate: () => {
      revision++;
    },
  };
}
