# Replace the separate data-first and function-first overload groups with ONE signature per arity:
#   pipe<I, R1, ..., Rn>(first: I, s1: (value: Head<I>) => R1, s2: (value: R1) => R2, ...): Result<I, Rn>
# Data-first and function-first calls have the same arity, so a single signature serves both.
# With two groups, whichever group TS tried first would contextually type (and permanently fix)
# lambdas nested in generic helpers such as `tap((x) => ...)` or `filter(([e]) => ...)` for the
# other style. `Head<I>` is a conditional type, so `I` is inferred from `first` only, which also keeps
# subtype inputs and union-input checks sound without NoInfer.
import sys
path, name = sys.argv[1:3]
s = open(path).read()
kind = {"pipe": "pure", "pipeAsync": "async", "pipeSideEffect": "effect", "pipeAsyncSideEffect": "asyncEffect"}[name]
R = [f"R{i}" for i in range(1, 11)]
P = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"]

def step(i):  # parameter type of step i (0-based)
    prev = "Head<I>" if i == 0 else R[i - 1]
    if kind == "pure": return f"(value: {prev}) => {R[i]}"
    if kind == "async": return f"AsyncOrSync<{prev}, {R[i]}>"
    if kind == "effect": return f"UnaryFn<{prev if i == 0 else f'NonSideEffect<{prev}>'}, {R[i]}>"
    return f"AsyncOrSync<{prev if i == 0 else f'NonSideEffect<Awaited<{prev}>>'}, {R[i]}>"

lines = [f"function {name}<I>(first: I): Result<I, []>;"]
for n in range(1, 11):
    params = ["first: I"] + [f"{P[i]}: {step(i)}" for i in range(n)]
    lines.append(f"function {name}<I, {', '.join(R[:n])}>(\n  " + ",\n  ".join(params) + f"\n): Result<I, [{', '.join(R[:n])}]>;")
group = "\n".join(lines) + "\n\n"

start = s.index(f"function {name}<F1 extends AnyFn, A, B>(")
variadic = s.index(f"function {name}<Fns extends")
s = s[:start] + group + s[variadic:]

types = {
 "pure": """type Last<Rs extends any[], Fallback> = Rs extends [...any[], infer L] ? L : Fallback;
type Head<I> = IsFn<I> extends true ? FnOutput<I> : I;
type Result<I, Rs extends any[]> = IsFn<I> extends true
  ? PipeEntry<I, Last<Rs, FnOutput<I>>>
  : Last<Rs, I>;
""",
 "async": """type Last<Rs extends any[], Fallback> = Rs extends [...any[], infer L] ? L : Fallback;
type Head<I> = IsFn<I> extends true ? Awaited<FnReturn<I>> : I;
type Result<I, Rs extends any[]> = IsFn<I> extends true
  ? PipeAsyncEntry<I, Last<Rs, Awaited<FnReturn<I>>>>
  : Promise<Last<Rs, I>>;
""",
 "effect": """type Last<Rs extends any[], Fallback> = Rs extends [...any[], infer L] ? L : Fallback;
type Head<I> = IsFn<I> extends true ? NonSideEffect<FnReturn<I>> : NonSideEffect<I>;
type Result<I, Rs extends any[]> = IsFn<I> extends true
  ? EffectEntry<I, Last<Rs, FnReturn<I>>, [FnReturn<I>, ...Rs]>
  : MaybeSideEffect<NonSideEffect<Last<Rs, I>>, EffectsOfValues<[I, ...Rs]>>;
""",
 "asyncEffect": """type Last<Rs extends any[], Fallback> = Rs extends [...any[], infer L] ? L : Fallback;
type Head<I> = IsFn<I> extends true ? NonSideEffect<Awaited<FnReturn<I>>> : NonSideEffect<I>;
type Result<I, Rs extends any[]> = IsFn<I> extends true
  ? EffectEntry<I, Awaited<Last<Rs, FnReturn<I>>>, [Awaited<FnReturn<I>>, ...Rs]>
  : Promise<MaybeSideEffect<NonSideEffect<Awaited<Last<Rs, I>>>, EffectsOfValues<[I, ...Rs]>>>;
""",
}[kind]
ISFN = "// `any` input is data, not a function-first step.\ntype IsFn<I> = 0 extends 1 & I ? false : [I] extends [AnyFn] ? true : false;\n"
header = ("// One signature per arity serves both call styles (data-first and function-first),\n"
          "// so no overload can pre-type the other style's lambdas. See research/pipe-soundness/unified.py.\n")
s = s.replace("type PipeCheckFrom<", header + ISFN + types + "type PipeCheckFrom<", 1)
open(path, "w").write(s)
print(name, "ok")
