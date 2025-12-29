import curry from '../composition/curry';

/** replace - 부분 치환 */
function replace(pattern: string | RegExp, replacement: string, str: string): string {
  return str.replace(pattern, replacement);
}
export default curry(replace);
