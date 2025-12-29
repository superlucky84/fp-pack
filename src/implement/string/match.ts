import curry from '../composition/curry';

/** match - 정규식 매칭 */
function match(pattern: RegExp, str: string): RegExpMatchArray | null {
  return str.match(pattern);
}
export default curry(match);
