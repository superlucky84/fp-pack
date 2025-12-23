/** startsWith - 시작 문자열/배열 확인 */
function startsWith(prefix: string, str: string): boolean;
function startsWith<T>(prefix: T[], arr: T[]): boolean;
function startsWith(prefix: string | any[], target: string | any[]): boolean {
  if (typeof target === 'string' && typeof prefix === 'string') {
    return target.startsWith(prefix);
  }

  if (Array.isArray(prefix) && Array.isArray(target)) {
    if (prefix.length === 0) return true;
    if (prefix.length > target.length) return false;
    for (let i = 0; i < prefix.length; i++) {
      if (target[i] !== prefix[i]) return false;
    }
    return true;
  }

  return false;
}
export default startsWith;
