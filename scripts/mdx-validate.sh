#!/usr/bin/env bash
# MDX pre-commit validation dispatcher.
# Usage: mdx-validate.sh FILE1 FILE2 ...
# Runs bash checks (fast regex), then Node workers (parsing-heavy + cross-file).
# Exit 0 = all pass. Exit 1 = at least one check failed.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

files=("$@")
[[ ${#files[@]} -eq 0 ]] && exit 0

failed=0

# ── per-file bash checks ──────────────────────────────────────────────────────
for f in "${files[@]}"; do
    "$SCRIPT_DIR/checks/seo.sh"     "$f" || failed=1
    "$SCRIPT_DIR/checks/aeo.sh"     "$f" || failed=1
    "$SCRIPT_DIR/checks/content.sh" "$f" || failed=1
    case "$f" in
        */fi/*) "$SCRIPT_DIR/checks/style-fi.sh" "$f" || failed=1 ;;
    esac
done

# ── Node: passage length + freshness (single startup) ────────────────────────
node --experimental-strip-types "$SCRIPT_DIR/checks/mdx-deep.ts" "${files[@]}" || failed=1

# ── Node: cross-file checks (full tree walk) ──────────────────────────────────
node "$SCRIPT_DIR/checks/cross-file.mjs" || failed=1

exit "$failed"
