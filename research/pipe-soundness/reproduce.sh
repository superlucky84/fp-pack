#!/bin/bash
# Reproduce the pipe-soundness experiment (DESIGN.md § Pipe Soundness Revision).
# Usage: research/pipe-soundness/reproduce.sh [baseline|candidate|se4|se2]
#   baseline  : current src
#   candidate : 6 pipes  (sound permissive pipes; pipeStrict/pipeAsyncStrict aliased)
#   se4       : 4 pipes  (+ precise SideEffect pipes; *SideEffectStrict aliased)       = experiment S2
#   se2       : 2 pipes  (+ pipe/pipeAsync aliased to the precise SideEffect pipes)    = experiment S5
# Needs Node and npm. Installs TS 5.9.3 / 6.0 / 7.0.2 into a temp dir and checks
# src/**/*.type-test.ts + probe.ts against a scratch copy of src.
set -euo pipefail
MODE=${1:-candidate}
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../.." && pwd)
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
(cd "$WORK" && npm init -y >/dev/null && npm i -s ts59@npm:typescript@5.9.3 ts60@npm:typescript@6.0 ts70@npm:typescript@7.0.2 >/dev/null)
cp -R "$ROOT/src" "$WORK/src"
cp "$HERE/probe.ts" "$WORK/src/probe.ts"
I="$WORK/src/implement"
if [ "$MODE" != baseline ]; then
  for p in composition/pipe async/pipeAsync composition/pipeSideEffect async/pipeAsyncSideEffect; do
    python3 "$HERE/transform.py" "$I/$p.ts" "$I/$p.ts" "$(basename $p)"
  done
  # Change 5: unique brands so pipeWithDeps dispatch stays correct
  for p in composition/pipe async/pipeAsync composition/pipeSideEffect async/pipeAsyncSideEffect \
           composition/pipeSideEffectStrict async/pipeAsyncSideEffectStrict; do
    n=$(basename $p)
    python3 - "$I/$p.ts" "$n" <<'PY'
import sys
p, n = sys.argv[1:]
s = open(p).read()
b = "__" + n + "_brand"
s = s.replace(f"export default {n};",
  f"const {n}Branded = {n} as typeof {n} & {{ readonly {b}: true }};\n"
  f"Object.defineProperty({n}Branded, '{b}', {{ value: true }});\nexport default {n}Branded;")
open(p, "w").write(s)
PY
  done
fi
alias_to() { # file brand base
  cat > "$I/$1.ts" <<EOF
import base from '$3';
const aliased = ((...args: any[]) => (base as any)(...args)) as unknown as typeof base & { readonly $2: true };
Object.defineProperty(aliased, '$2', { value: true });
export default aliased;
EOF
}
if [ "$MODE" != baseline ]; then
  alias_to composition/pipeStrict __pipe_strict ./pipe
  alias_to async/pipeAsyncStrict __pipe_async_strict ./pipeAsync
fi
if [ "$MODE" = se4 ] || [ "$MODE" = se2 ]; then
  EXTRA="--collapse"; [ "$MODE" = se2 ] && EXTRA="--collapse --fnfirst --anyguard"
  for p in composition/pipeSideEffectStrict async/pipeAsyncSideEffectStrict; do
    python3 "$HERE/transform_strict.py" "$I/$p.ts" "$I/$p.ts" "$(basename $p)"
    python3 "$HERE/sideeffect_precise.py" "$I/$p.ts" $EXTRA
  done
  alias_to composition/pipeSideEffect __pipeSideEffect_brand ./pipeSideEffectStrict
  alias_to async/pipeAsyncSideEffect __pipeAsyncSideEffect_brand ./pipeAsyncSideEffectStrict
fi
if [ "$MODE" = se2 ]; then
  alias_to composition/pipe __pipe_brand ./pipeSideEffectStrict
  alias_to async/pipeAsync __pipeAsync_brand ./pipeAsyncSideEffectStrict
fi
cat > "$WORK/tsconfig.json" <<J
{ "compilerOptions": { "target":"ES2022","module":"ESNext","lib":["ES2022","DOM"],"types":[],"skipLibCheck":true,
  "moduleResolution":"bundler","strict":true,"noEmit":true,"moduleDetection":"force" },
  "include": ["src/**/*.ts"], "exclude": ["src/**/*.test.ts"] }
J
for v in 59 60 70; do
  out=$(cd "$WORK" && node "$WORK/node_modules/ts$v/bin/tsc" -p tsconfig.json 2>&1 || true)
  echo "--- ts$v ($MODE): $(echo "$out" | grep -c 'error TS') errors"
  echo "$out" | grep 'error TS' | sed -E 's/^src\/implement\/composition\/([^(]*)\(.*error (TS[0-9]+).*/\1 \2/' | sort | uniq -c | sort -rn || true
done
