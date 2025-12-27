/**
 * compose - 함수를 우→좌로 합성
 */
type UnaryFn<A, R> = (a: A) => R;
type ComposeInput<Fns extends UnaryFn<any, any>[]> = Fns extends [...UnaryFn<any, any>[], UnaryFn<infer A, any>]
  ? A
  : never;
type ComposeChain<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<infer A, infer R>]
  ? UnaryFn<A, R>
  : Fns extends [UnaryFn<infer A, infer R>, ...infer Rest]
    ? Rest extends [UnaryFn<R, any>, ...UnaryFn<any, any>[]]
      ? ComposeChain<Rest> extends UnaryFn<any, infer NextR>
        ? UnaryFn<A, NextR>
        : never
      : never
    : never;
type Compose<Fns extends UnaryFn<any, any>[]> = (input: ComposeInput<Fns>) => ComposeChain<Fns> extends UnaryFn<
  any,
  infer R
>
  ? R
  : never;

function compose<A, R>(ab: UnaryFn<A, R>): (a: A) => R;
function compose<A, B, R>(ab: UnaryFn<A, B>, bc: UnaryFn<B, R>): (a: A) => R;
function compose<A, B, C, R>(ab: UnaryFn<A, B>, bc: UnaryFn<B, C>, cd: UnaryFn<C, R>): (a: A) => R;
function compose<A, B, C, D, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, R>
): (a: A) => R;
function compose<A, B, C, D, E, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, R>
): (a: A) => R;

function compose<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(...funcs: Fns): Compose<Fns>;
function compose(...funcs: Array<UnaryFn<any, any>>): (input: any) => any;
function compose(...funcs: Array<(input: any) => any>) {
  return (value: any) => funcs.reduceRight((acc, fn) => fn(acc), value);
}

export default compose;
