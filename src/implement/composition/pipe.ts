import type { FromFn } from './from';

type UnaryFn<A, R> = (a: A) => R;
type ZeroFn<R> = () => R;
type PipeInput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<infer A, any>, ...UnaryFn<any, any>[]]
  ? A
  : never;
type PipeOutput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<any, infer R>]
  ? R
  : Fns extends [UnaryFn<any, infer R>, ...infer Rest]
    ? Rest extends [UnaryFn<R, any>, ...UnaryFn<any, any>[]]
      ? PipeOutput<Rest>
      : never
    : never;
type Pipe<Fns extends UnaryFn<any, any>[]> = (input: PipeInput<Fns>) => PipeOutput<Fns>;
type PipeFrom<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]> = (input?: PipeInput<Fns>) => PipeOutput<Fns>;

function pipe<R>(ab: ZeroFn<R>): () => R;
function pipe<B, R>(ab: ZeroFn<B>, bc: UnaryFn<B, R>): () => R;
function pipe<B, C, R>(ab: ZeroFn<B>, bc: UnaryFn<B, C>, cd: UnaryFn<C, R>): () => R;
function pipe<B, C, D, R>(ab: ZeroFn<B>, bc: UnaryFn<B, C>, cd: UnaryFn<C, D>, de: UnaryFn<D, R>): () => R;
function pipe<B, C, D, E, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, R>
): () => R;
function pipe<B, C, D, E, F, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, R>
): () => R;
function pipe<B, C, D, E, F, G, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, R>
): () => R;
function pipe<B, C, D, E, F, G, H, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, R>
): () => R;
function pipe<B, C, D, E, F, G, H, I, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, R>
): () => R;
function pipe<B, C, D, E, F, G, H, I, J, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, J>,
  jk: UnaryFn<J, R>
): () => R;
function pipe<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]>(...funcs: Fns): PipeFrom<Fns>;
function pipe<A, R>(ab: UnaryFn<A, R>): (a: A) => R;
function pipe<A, B, R>(ab: UnaryFn<A, B>, bc: UnaryFn<B, R>): (a: A) => R;
function pipe<A, B, C, R>(ab: UnaryFn<A, B>, bc: UnaryFn<B, C>, cd: UnaryFn<C, R>): (a: A) => R;
function pipe<A, B, C, D, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, R>
): (a: A) => R;
function pipe<A, B, C, D, E, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, R>
): (a: A) => R;
function pipe<A, B, C, D, E, F, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, R>
): (a: A) => R;
function pipe<A, B, C, D, E, F, G, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, R>
): (a: A) => R;
function pipe<A, B, C, D, E, F, G, H, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, R>
): (a: A) => R;
function pipe<A, B, C, D, E, F, G, H, I, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, R>
): (a: A) => R;
function pipe<A, B, C, D, E, F, G, H, I, J, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, J>,
  jk: UnaryFn<J, R>
): (a: A) => R;

function pipe<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(...funcs: Fns): Pipe<Fns>;
function pipe(...funcs: Array<UnaryFn<any, any>>): (input: any) => any;
function pipe(...funcs: Array<(input: any) => any>) {
  return (init: any) => {
    return funcs.reduce((acc, fn) => fn(acc), init);
  };
}

export default pipe;
