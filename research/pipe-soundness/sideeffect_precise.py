# Applied after transform_strict.py on *SideEffectStrict files.
#   --collapse  : S2  effect-free results drop `| SideEffect<never>` (plain T)
#   --fnfirst   : S4  effect-free function-first pipelines return a plain `(input: A) => R`
#   --anyguard  : S5  a step returning `any` does not contribute an effect
import sys, re
path, flags = sys.argv[1], set(sys.argv[2:])
s = open(path).read()
if '--collapse' in flags:
    s = s.replace("type MaybeSideEffect<T, E> = T | SideEffect<E>;",
                  "type MaybeSideEffect<T, E> = [E] extends [never] ? T : T | SideEffect<E>;")
if '--fnfirst' in flags:
    for name, opt in (("StrictUnaryReturn", ""), ("StrictUnaryReturnOptional", "?")):
        m = re.search(r"type " + name + r"<A, FLast, Fns extends AnyFn\[\]> = \{\n  \(input\??: A\): ([^\n]*);\n", s)
        assert m, name
        s = s.replace(f"type {name}<A, FLast, Fns extends AnyFn[]> = {{",
            f"type {name}<A, FLast, Fns extends AnyFn[]> = [EffectsOf<Fns>] extends [never]\n"
            f"  ? (input{opt}: A) => {m.group(1)}\n  : {name}Full<A, FLast, Fns>;\n"
            f"type {name}Full<A, FLast, Fns extends AnyFn[]> = {{", 1)
if '--anyguard' in flags:
    old = "type EffectOfReturn<R> = R extends SideEffect<infer E> ? E : never;"
    assert old in s
    s = s.replace(old, "type EffectOfReturn<R> = 0 extends 1 & R ? never : R extends SideEffect<infer E> ? E : never;")
open(path, 'w').write(s)
