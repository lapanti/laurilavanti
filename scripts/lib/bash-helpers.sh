#!/usr/bin/env bash
# Shared helpers for MDX pre-commit bash checks.

# fm_field FILE FIELD
# Extracts a top-level scalar YAML frontmatter field from FILE.
# Handles single-quoted, double-quoted, and unquoted values.
# Prints nothing when the field is absent.
fm_field() {
    local file="$1" field="$2"
    awk -v f="$field" '
        /^---$/ { c++; if (c == 2) exit; next }
        c == 1 {
            n = index($0, ": ")
            if (n > 0) {
                key = substr($0, 1, n - 1)
                if (key == f) {
                    val = substr($0, n + 2)
                    gsub(/^'"'"'|'"'"'$/, "", val)
                    gsub(/^"|"$/, "", val)
                    print val
                    exit
                }
            }
        }
    ' "$file"
}

# fm_body FILE
# Prints all content after the closing --- of the YAML frontmatter.
fm_body() {
    awk '/^---$/ { c++; next } c >= 2' "$1"
}

# error FILE MSG
# Prints a red error line. Caller is responsible for tracking failure.
error() {
    printf '\033[31mERROR\033[0m [%s] %s\n' "$1" "$2" >&2
}
