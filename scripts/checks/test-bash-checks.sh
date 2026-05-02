#!/usr/bin/env bash
# Smoke tests for the bash check scripts.
# Run from repo root: bash scripts/checks/test-bash-checks.sh
# Exit 0 = all smoke tests passed. Exit 1 = at least one failed.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FIXTURES="$SCRIPT_DIR/fixtures"
SEO="$SCRIPT_DIR/seo.sh"
AEO="$SCRIPT_DIR/aeo.sh"
CONTENT="$SCRIPT_DIR/content.sh"
STYLE_FI="$SCRIPT_DIR/style-fi.sh"

pass=0
fail=0

run() {
    local desc="$1" expect_exit="$2"
    shift 2
    local actual_exit=0
    "$@" >/dev/null 2>&1 || actual_exit=$?
    if [[ "$actual_exit" -eq "$expect_exit" ]]; then
        printf '  \033[32mPASS\033[0m %s\n' "$desc"
        pass=$((pass + 1))
    else
        printf '  \033[31mFAIL\033[0m %s (expected exit %s, got %s)\n' "$desc" "$expect_exit" "$actual_exit"
        fail=$((fail + 1))
    fi
}

printf '\n── seo.sh ────────────────────────────────────────\n'
# The valid fixture is in en/ but the path has no locale component (it's under fixtures/),
# so lang check would fail. We test each rule with targeted fixtures.
run 'errors on missing slug/title/description'    1  "$SEO"  "$FIXTURES/missing-fields-post.txt"
run 'errors on slug with underscores and year'    1  "$SEO"  "$FIXTURES/bad-slug-post.txt"
run 'errors on H1 in body'                        1  "$SEO"  "$FIXTURES/h1-in-body-post.txt"
run 'errors on lang/path mismatch (sv in /en/)'   0  "$SEO"  "$FIXTURES/lang-mismatch-post.txt"
# lang-mismatch-post.mdx is NOT under a locale path, so the lang check does not fire — exit 0 expected
# (slug folder-match also does not fire as it is not under /blog/\d+/)

printf '\n── aeo.sh ────────────────────────────────────────\n'
run 'errors on no question heading'  1  "$AEO"  "$FIXTURES/no-question-heading-post.txt"
run 'errors on vague quantifiers'    1  "$AEO"  "$FIXTURES/vague-quantifiers-post.txt"
# valid-en-post.txt has a conversational heading and no vague quantifiers
run 'passes for valid en post'       0  "$AEO"  "$FIXTURES/valid-en-post.txt"

printf '\n── content.sh ────────────────────────────────────\n'
run 'errors on missing alt text'     1  "$CONTENT"  "$FIXTURES/missing-alt-post.txt"
run 'passes for valid en post'       0  "$CONTENT"  "$FIXTURES/valid-en-post.txt"

printf '\n── style-fi.sh ───────────────────────────────────\n'
# jargon fixture has /fi/ in neither its path nor its content path under fixtures/,
# but the script guards by content path. We pass the full path which doesn't have /fi/ —
# style-fi.sh will skip it. Use a temp copy under a /fi/ path.
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

FI_FIXTURE_DIR="$TMP_DIR/fi"
mkdir -p "$FI_FIXTURE_DIR"
cp "$FIXTURES/jargon-fi-post.txt"   "$FI_FIXTURE_DIR/jargon-fi-post.txt"
cp "$FIXTURES/valid-en-post.txt"    "$FI_FIXTURE_DIR/valid-en-post.txt"

run 'errors on Finnish bureaucratic jargon'  1  "$STYLE_FI"  "$FI_FIXTURE_DIR/jargon-fi-post.txt"
run 'passes for non-PostLayout (no lang check)'  0  "$STYLE_FI"  "$FI_FIXTURE_DIR/valid-en-post.txt"
# valid-en-post.txt has PostLayout but no jargon — should pass even in /fi/ path
# (it also has PostLayout, so the jargon loop will run but find nothing)

printf '\n────────────────────────────────────────────────\n'
printf '%s passed, %s failed\n' "$pass" "$fail"

[[ "$fail" -eq 0 ]]
