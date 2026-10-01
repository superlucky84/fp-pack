# Apply the "sound fallback" recipe to a permissive pipe file.
import sys,re
src,dst,name=sys.argv[1:4]
s=open(src).read()
n0=len(s)
if "--intrinsic-noinfer" in sys.argv:
    s=s.replace("type NoInfer<T> = [T][T extends any ? 0 : never];\n","")
# 1) first step parameter: A inferred from input only
s=re.sub(r"(input: NonFunction<A>(?: \| SideEffect<any>)?,\n  ab: )\(value: A\) =>", r"\1(value: NoInfer<A>) =>", s)
s=re.sub(r"(input: NonFunction<A>(?: \| SideEffect<any>)?,\n  ab: )(\w+)<A, ", r"\1\2<NoInfer<A>, ", s)
# 2) data-first variadic fallback -> sound diagnostic overload placed last
m=re.search(r"function "+name+r"<A, Fns extends (\[[^\n]*\])>\(\n  input: (NonFunction<A>(?: \| SideEffect<any>)?),\n  \.\.\.funcs: PipeCheckWithInput<A, Fns>\n\): ([^\n]*);\n", s)
assert m, "data-first fallback not found"
s=s.replace(m.group(0),"")
diag=f"function {name}<A, Fns extends {m.group(1)}>(\n  input: {m.group(2)},\n  ...funcs: PipeCheckFrom<A, Fns>\n): {m.group(3)};\n"
s=s.replace("type PipeCheckWithInput<Input,", """type PipeCheckFrom<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<[() => Input, ...Fns]> extends true ? unknown : PipeCheckResult<[() => Input, ...Fns]>);
type PipeCheckWithInput<Input,""",1)
# 3) remove untyped catch-all
s,k=re.subn(r"function "+name+r"\(\.\.\.(?:funcs|args): Array<[^\n]*>\): [^\n]*;\n","",s)
assert k==1, "catch-all not found"
s=s.replace(f"function {name}(...args: Array<any>) {{", diag+f"function {name}(...args: Array<any>) {{",1)
assert "PipeCheckWithInput<A, Fns>" not in s
open(dst,'w').write(s)
print(name, "ok", s.count("NoInfer<A>"), "first-step NoInfer")
