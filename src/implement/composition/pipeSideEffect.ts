import SideEffect, { isSideEffect } from './sideEffect';

type MaybeSideEffect<T> = T | SideEffect<any>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type UnaryFn<A, R> = (a: A) => MaybeSideEffect<R>;
type PipeInput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<infer A, any>, ...UnaryFn<any, any>[]]
  ? A
  : never;
type PipeOutput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<any, infer R>]
  ? MaybeSideEffect<R>
  : Fns extends [UnaryFn<any, infer R>, ...infer Rest]
    ? Rest extends [UnaryFn<NonSideEffect<R>, any>, ...UnaryFn<any, any>[]]
      ? PipeOutput<Rest>
      : never
    : never;
type Resolve<T> = T extends infer R ? R : never;
type PipeSideEffect<Fns extends UnaryFn<any, any>[]> = (
  input: PipeInput<Fns> | SideEffect<any>
) => Resolve<PipeOutput<Fns>>;

function pipeSideEffect<A, R>(ab: UnaryFn<A, R>): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;

function pipeSideEffect<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(...funcs: Fns): PipeSideEffect<Fns>;
function pipeSideEffect(...funcs: Array<UnaryFn<any, any>>): (input: any) => any;
function pipeSideEffect(...funcs: Array<(input: any) => any>) {
  return (init: any) => {
    let acc = init;
    for (const fn of funcs) {
      if (isSideEffect(acc)) {
        return acc;
      }
      acc = fn(acc);
    }
    return acc;
  };
}

export default pipeSideEffect;
