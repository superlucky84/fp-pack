type UnaryFn<A, R> = (a: A) => R;
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

function pipe<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(...funcs: Fns): Pipe<Fns>;
function pipe(...funcs: Array<UnaryFn<any, any>>): (input: any) => any;
function pipe(...funcs: Array<(input: any) => any>) {
  return (init: any) => {
    return funcs.reduce((acc, fn) => fn(acc), init);
  };
}

export default pipe;
