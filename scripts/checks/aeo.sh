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

# ── at least one conversational heading ──────────────────────────────────────
# AI engines generate summaries 60% more often when a heading is a question.
# Covers EN, FI, and SV question-opening words, Finnish -ko/-kö verb forms,
# and any heading ending with a question mark.
question_words_en="How|What|Why|When|Who|Can|Is|Are|Does|Should|Which|Will|Has|Have"
question_words_fi="Miten|Mitä|Miksi|Milloin|Kuka|Voiko|Onko|Pitäisikö|Mikä|Mikäli|Kuinka|Ketkä|Missä"
question_words_sv="Hur|Vad|Varför|När|Vem|Kan|Är|Ska|Vilken|Vilket|Vilka|Bör|Har"

if ! fm_body "$file" | grep -qP "^#{2,3} (${question_words_en}|${question_words_fi}|${question_words_sv})\b" \
   && ! fm_body "$file" | grep -qP "^#{2,3} \S.*\?$" \
   && ! fm_body "$file" | grep -qP "^#{2,3} \w+ko\b" \
   && ! fm_body "$file" | grep -qP "^#{2,3} \w+kö\b"; then
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

# ── AI pillar posts: ≥3 question-form H2s ────────────────────────────────────
# Posts tagged artificial-intelligence are pillar content; one question heading
# is not enough to surface in conversational AI queries.
if awk '/^---$/ { c++; if (c == 2) exit; next } c == 1' "$file" | grep -q "artificial-intelligence" \
   && grep -qP "PostLayout" "$file"; then
    q_count=0
    while IFS= read -r line; do
        if echo "$line" | grep -qP "^#{2,3} (${question_words_en}|${question_words_fi}|${question_words_sv})\b" \
           || echo "$line" | grep -qP "^#{2,3} \S.*\?$" \
           || echo "$line" | grep -qP "^#{2,3} \w+ko\b" \
           || echo "$line" | grep -qP "^#{2,3} \w+kö\b"; then
            q_count=$((q_count + 1))
        fi
    done < <(fm_body "$file")
    if [[ "$q_count" -lt 3 ]]; then
        error "$file" "artificial-intelligence posts require ≥3 question-form H2/H3s; found $q_count"
        failed=1
    fi
fi

exit "$failed"
