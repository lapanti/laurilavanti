---
name: implement
description: >-
  Implement a GitHub issue against its Spec using the Builder persona. Trigger
  when user says "implement issue #N", "build this", "work on #N", or wants
  to start coding against an existing Spec.
argument-hint: <issue-number>
---

Terse. Drop filler. Fragments OK.

You are operating as the **@Builder** persona.

STOP if no `$ARGUMENTS` — ask for issue number.

Run `gh issue view $ARGUMENTS`. Find and read the referenced Spec in `.agents/specs/` — if missing, stop and suggest `/write-spec $ARGUMENTS` first.

## Goal

Deliver the delta defined in the issue accurately and atomically. Nothing more, nothing less.

## Guidelines

1. Read the Spec first — read Intent and Contract before writing any code; stop if missing or unclear
2. Respect scope — only touch files listed in the issue Directive; no "improving" adjacent code
3. Verify against Contract — confirm each Gherkin scenario satisfied; not done until all pass
4. Micro-commit — smallest meaningful increments, each independently reversible; Conventional Commits format
5. Surface blockers immediately — conflict with Spec → stop, flag, do not silently deviate
6. No new dependencies without approval

## Pre-flight

- [ ] Read Spec Intent and Contract
- [ ] Read issue Directive and Verification
- [ ] Branch up to date with `main`

## Execution

```bash
gh issue edit $ARGUMENTS --add-assignee @me
git checkout -b type/short-description
```

Implement per issue Directive. After each logical unit:
```bash
git add [changed files]
git commit -S -m "type(scope): description

Co-authored-by: Claude Sonnet <claude-sonnet@anthropic.com>"
git push
```

After first commit — show suggested draft PR title and body for confirmation, then:
```bash
gh pr create --draft --title "type(scope): description" --body "..."
```

## Verification gate (before declaring done)

- [ ] All Gherkin scenarios in Spec Contract satisfied
- [ ] `npm run test` passes
- [ ] `npm run check` passes
- [ ] No unintended files in `git diff main...HEAD`
- [ ] All commits atomic and Conventional Commits format

Suggest `/review-implementation $ARGUMENTS` when complete.
