#!/usr/bin/env bash
# SEO bash checks for a single MDX file.
# Usage: seo.sh FILE
# Exit 0 = all pass. Exit 1 = at least one error.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=../lib/bash-helpers.sh
source "$SCRIPT_DIR/../lib/bash-helpers.sh"

file="$1"
failed=0

# ── required frontmatter fields ─────────────────────────────────────────────
for field in pageTitle title description lang slug layout; do
    if ! grep -qP "^${field}:" "$file"; then
        error "$file" "missing required frontmatter field: ${field}"
        failed=1
    fi
done

# publishDate required for blog posts (PostLayout)
if grep -qP '^layout:' "$file"; then
    if grep -qP "PostLayout" "$file"; then
        if ! grep -qP '^publishDate:' "$file"; then
            error "$file" "missing required frontmatter field: publishDate (required for blog posts)"
            failed=1
        fi
    fi
fi

# ── lang must match path locale ──────────────────────────────────────────────
lang_val="$(fm_field "$file" lang)"
if [[ "$file" =~ /fi/ ]]; then   path_locale=fi
elif [[ "$file" =~ /sv/ ]]; then path_locale=sv
elif [[ "$file" =~ /en/ ]]; then path_locale=en
else path_locale=""
fi

if [[ -n "$path_locale" && "$lang_val" != "$path_locale" ]]; then
    error "$file" "lang '${lang_val}' does not match path locale '${path_locale}' — hreflang will be wrong"
    failed=1
fi

# ── slug format ──────────────────────────────────────────────────────────────
slug_val="$(fm_field "$file" slug)"
if [[ -n "$slug_val" ]]; then
    # No uppercase letters
    if echo "$slug_val" | grep -qP '[A-Z]'; then
        error "$file" "slug contains uppercase letters: '${slug_val}'"
        failed=1
    fi
    # No underscores
    if echo "$slug_val" | grep -qP '_'; then
        error "$file" "slug contains underscores (use hyphens): '${slug_val}'"
        failed=1
    fi
    # No soft hyphens (U+00AD)
    if echo "$slug_val" | grep -qP '\x{00AD}'; then
        error "$file" "slug contains a soft hyphen (U+00AD): '${slug_val}'"
        failed=1
    fi
    # No 4-digit years — except posts 20 and 47 where the year is part of the proper name
    # (election cycle posts and year-in-review posts with established URLs must not be renamed)
    blog_id="$(echo "$file" | grep -oP '/blog/\K\d+' || true)"
    if [[ "$blog_id" != "20" && "$blog_id" != "47" ]]; then
        if echo "$slug_val" | grep -qP '(19|20)\d{2}'; then
            error "$file" "slug contains a 4-digit year (makes content appear stale): '${slug_val}'"
            failed=1
        fi
    fi
fi

# ── slug must equal folder name for blog posts ───────────────────────────────
if echo "$file" | grep -qP '/blog/\d+/'; then
    folder_name="$(basename "$(dirname "$file")")"
    if [[ -n "$slug_val" && "$folder_name" != "$slug_val" ]]; then
        error "$file" "slug '${slug_val}' does not match folder name '${folder_name}'"
        failed=1
    fi
fi

# ── no bare H1 in body ───────────────────────────────────────────────────────
# Layout renders the <h1>; a second one in the body creates a duplicate H1.
h1_lines="$(fm_body "$file" | grep -nP '^# [^#]' | head -1 || true)"
if [[ -n "$h1_lines" ]]; then
    error "$file" "H1 (# heading) found in body — layout already renders the title as H1"
    failed=1
fi

exit "$failed"
