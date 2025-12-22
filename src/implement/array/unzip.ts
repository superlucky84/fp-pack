/**
 * unzip - 배열 분리
 */
function unzip<T, U>(arr: Array<[T, U]>): [T[], U[]] {
  const left: T[] = [];
  const right: U[] = [];

  for (const [a, b] of arr) {
    left.push(a);
    right.push(b);
  }

  return [left, right];
}

export default unzip;
