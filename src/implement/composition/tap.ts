/**
 * tap - 값을 그대로 흘리며 side-effect 실행
 */
function tap<T>(fn: (value: T) => void): (value: T) => T {
  // TODO: implement
  return (value: T) => value;
}

export default tap;
