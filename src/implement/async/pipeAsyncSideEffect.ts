import SideEffect, { isSideEffect } from '../composition/sideEffect';

/** pipeAsyncSideEffect - SideEffect를 허용하는 비동기 함수 합성 */
type MaybeSideEffect<T> = T | SideEffect<any>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type AsyncOrSync<A, R> = (a: A) => MaybeSideEffect<R> | Promise<MaybeSideEffect<R>>;
type PipeInput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [
  AsyncOrSync<infer A, any>,
  ...AsyncOrSync<any, any>[]
]
  ? A
  : never;
type PipeOutput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [AsyncOrSync<any, infer R>]
  ? MaybeSideEffect<Awaited<R>>
  : Fns extends [AsyncOrSync<any, infer R>, ...infer Rest]
    ? Rest extends [AsyncOrSync<Awaited<NonSideEffect<R>>, any>, ...AsyncOrSync<any, any>[]]
      ? PipeOutput<Rest>
      : never
    : never;
type Resolve<T> = T extends infer R ? R : never;
type PipeAsyncSideEffect<Fns extends AsyncOrSync<any, any>[]> = (
  input: PipeInput<Fns> | SideEffect<any>
) => Promise<Resolve<PipeOutput<Fns>>>;

function pipeAsyncSideEffect<A, R>(
  ab: AsyncOrSync<A, R>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, R>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, R>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, R>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, E, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, R>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;

function pipeAsyncSideEffect<Fns extends [AsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(
  ...funcs: Fns
): PipeAsyncSideEffect<Fns>;
function pipeAsyncSideEffect(...funcs: Array<AsyncOrSync<any, any>>): (value: any) => Promise<any>;
function pipeAsyncSideEffect(...funcs: Array<(arg: any) => any>) {
  return async (value: any) => {
    let acc = value;
    for (const fn of funcs) {
      if (isSideEffect(acc)) {
        return acc;
      }
      acc = await fn(acc);
    }
    return acc;
  };
}

export default pipeAsyncSideEffect;
