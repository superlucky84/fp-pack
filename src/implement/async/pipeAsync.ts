/** pipeAsync - 비동기 함수 합성 */
function pipeAsync(...fns: Array<(arg: any) => Promise<any>>): (value: any) => Promise<any> {
  // TODO: implement
  return async (value: any) => value;
}
export default pipeAsync;
