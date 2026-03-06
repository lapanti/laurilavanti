#!/bin/bash
# Blocks git commit when MDX files are staged and prompts Claude to run
# /seo-check and /lavanti-writing-style checks before committing.

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Only trigger on git commit commands
if ! echo "$COMMAND" | grep -qE "^git commit"; then
    exit 0
fi

# Check if any MDX files are staged
MDX_FILES=$(git diff --cached --name-only | grep '\.mdx$')
if [ -z "$MDX_FILES" ]; then
    exit 0
fi

FILE_LIST=$(echo "$MDX_FILES" | tr '\n' ' ')

cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "MDX files are staged: ${FILE_LIST}— before committing: (1) run /seo-check on each file, (2) check writing style with /lavanti-writing-style, (3) check campaign persona alignment with /campaign-persona-check. Retry the commit once all three checks are done."
  }
}
EOF

exit 0
