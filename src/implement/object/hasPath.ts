/**
 * hasPath - 깊은 경로 존재 확인
 */
function hasPath(pathArray: string[]): (obj: any) => boolean {
  return (obj: any) => {
    let current = obj;
    for (const key of pathArray) {
      if (current == null || !Object.prototype.hasOwnProperty.call(current, key)) {
        return false;
      }
      current = current[key];
    }
    return true;
  };
}

export default hasPath;
