#!/usr/bin/env bash
# AEO bash checks for a single MDX file.
# Usage: aeo.sh FILE
# Exit 0 = all pass. Exit 1 = at least one error.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=../lib/bash-helpers.sh
source "$SCRIPT_DIR/../lib/bash-helpers.sh"

file="$1"
failed=0

# Only run these checks on blog posts (PostLayout) — skip indexes and regular pages.
if ! grep -qP "PostLayout" "$file"; then
    exit 0
fi

# ── at least one conversational heading ──────────────────────────────────────
# AI engines generate summaries 60% more often when a heading is a question.
# Covers EN, FI, and SV question-opening words.
question_words_en="How|What|Why|When|Who|Can|Is|Are|Does|Should|Which|Will|Has|Have"
question_words_fi="Miten|Mitä|Miksi|Milloin|Kuka|Voiko|Onko|Pitäisikö|Mikä|Mikäli|Kuinka|Ketkä|Missä"
question_words_sv="Hur|Vad|Varför|När|Vem|Kan|Är|Ska|Vilken|Vilket|Vilka|Bör|Har"

if ! fm_body "$file" | grep -qP "^#{2,3} (${question_words_en}|${question_words_fi}|${question_words_sv})\b"; then
    error "$file" "no conversational (question-format) H2/H3 heading found — at least one required for AEO"
    failed=1
fi

# ── no vague quantifiers ──────────────────────────────────────────────────────
# Vague quantifiers reduce AI citation likelihood. Check body only.
# Kept narrow: only words that are almost always replaceable with specific data.
# Common words like "some", "many", "several" are excluded — too many legitimate uses.
vague_en="affordable|quickly|recently|a lot of|various kinds|very quickly|quite quickly"
vague_fi="nopeasti|edullinen|edulliset|edullista|äskettäin|viime aikoina"
vague_sv="snabbt|prisvärd|prisvärda|prisvärt|nyligen"

hits="$(fm_body "$file" | grep -niwE "(${vague_en}|${vague_fi}|${vague_sv})" || true)"
if [[ -n "$hits" ]]; then
    error "$file" "vague quantifier(s) found — replace with specific data or figures:"
    echo "$hits" | while IFS= read -r line; do
        printf '  line %s\n' "$line" >&2
    done
    failed=1
fi

exit "$failed"
