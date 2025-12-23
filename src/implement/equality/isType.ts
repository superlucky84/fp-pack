/** isType - 타입 체크 유틸 */
function isType(type: string): (value: any) => boolean {
  const target = type.toLowerCase();
  return (value: any) => {
    if (value === null) return target === 'null';
    if (value === undefined) return target === 'undefined';
    const actual = typeof value;
    if (actual !== 'object') return actual === target;
    const tag = Object.prototype.toString.call(value).slice(8, -1).toLowerCase(); // e.g., 'array', 'date'
    return tag === target;
  };
}
export default isType;
