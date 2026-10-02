# S1: make *SideEffectStrict inference-friendly (NoInfer only on first step) + sound diagnostic fallback.
import sys,re
src,dst,name=sys.argv[1:4]
s=open(src).read()
if "--intrinsic-noinfer" in sys.argv:
    s=s.replace("type NoInfer<T> = [T][T extends any ? 0 : never];\n","")
# later steps: drop NoInfer
s=re.sub(r"NonSideEffect<NoInfer<(\w)>>", r"NonSideEffect<\1>", s)
s=re.sub(r"NonSideEffect<Awaited<NoInfer<(\w)>>>", r"NonSideEffect<Awaited<\1>>", s)
# first step: A from input only
s=re.sub(r"(input: NonFunction<A>(?: \| SideEffect<EIn>)?,\n  ab: )(\w+)<A, ", r"\1\2<NoInfer<A>, ", s)
# data-first fallbacks -> PipeCheckFrom, moved last
s=s.replace("type PipeCheckWithInput<Input,", """type PipeCheckFrom<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<[() => Input, ...Fns]> extends true ? unknown : PipeCheckResult<[() => Input, ...Fns]>);
type PipeCheckWithInput<Input,""",1)
pat=re.compile(r"function "+name+r"<A,( EIn,)? Fns extends (\w+)>\(\n  input: ([^\n]*),\n  \.\.\.funcs: PipeCheckWithInput<A, Fns>\n\): ([^\n]*);\n")
ms=list(pat.finditer(s)); assert len(ms)==2, len(ms)
diag=""
for m in ms:
    s=s.replace(m.group(0),"")
    diag+=f"function {name}<A,{m.group(1) or ''} Fns extends [AnyFn, ...AnyFn[]]>(\n  input: {m.group(3)},\n  ...funcs: PipeCheckFrom<A, Fns>\n): {m.group(4)};\n"
s=s.replace(f"function {name}(...args: Array<any>) {{", diag+f"function {name}(...args: Array<any>) {{",1)
open(dst,'w').write(s)
print(name,"ok")
