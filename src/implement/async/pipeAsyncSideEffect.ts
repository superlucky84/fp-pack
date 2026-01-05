import type { FromFn } from '../composition/from';
import SideEffect, { isSideEffect } from '../composition/sideEffect';

/** pipeAsyncSideEffect - SideEffect를 허용하는 비동기 함수 합성 */
type MaybeSideEffect<T> = T | SideEffect<any>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type AsyncOrSync<A, R> = (a: A) => MaybeSideEffect<R> | Promise<MaybeSideEffect<R>>;
type ZeroFn<R> = () => MaybeSideEffect<R> | Promise<MaybeSideEffect<R>>;
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
type PipeAsyncSideEffectFrom<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]> = (
  input?: PipeInput<Fns> | SideEffect<any>
) => Promise<Resolve<PipeOutput<Fns>>>;

function pipeAsyncSideEffect<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]>(
  ...funcs: Fns
): PipeAsyncSideEffectFrom<Fns>;
function pipeAsyncSideEffect<R>(ab: ZeroFn<R>): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<Awaited<B>, R>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, R>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, R>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, R>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, F, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, R>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, F, G, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, R>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, F, G, H, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, H>,
  hi: AsyncOrSync<Awaited<H>, R>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, F, G, H, I, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, H>,
  hi: AsyncOrSync<Awaited<H>, I>,
  ij: AsyncOrSync<Awaited<I>, R>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, F, G, H, I, J, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, H>,
  hi: AsyncOrSync<Awaited<H>, I>,
  ij: AsyncOrSync<Awaited<I>, J>,
  jk: AsyncOrSync<Awaited<J>, R>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
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
function pipeAsyncSideEffect<A, B, C, D, E, F, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, R>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, E, F, G, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, R>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, E, F, G, H, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, H>,
  hi: AsyncOrSync<Awaited<H>, R>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, E, F, G, H, I, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, H>,
  hi: AsyncOrSync<Awaited<H>, I>,
  ij: AsyncOrSync<Awaited<I>, R>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, E, F, G, H, I, J, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, H>,
  hi: AsyncOrSync<Awaited<H>, I>,
  ij: AsyncOrSync<Awaited<I>, J>,
  jk: AsyncOrSync<Awaited<J>, R>
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
