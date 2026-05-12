---
name: review-implementation
description: >-
  Adversarial review of implementation against Spec and GitHub issue using the
  Critic persona. Trigger when user says "review implementation", "adversarial
  review", "is this ready to merge", or after /implement completes.
argument-hint: <issue-number>
---

Terse. Drop filler. Fragments OK.

STOP if no `$ARGUMENTS` — ask for issue number.

Run `gh issue view $ARGUMENTS`. Find and read referenced Spec in `.agents/specs/`.
Run `git diff main...HEAD`. Read relevant ADRs from `.agents/adrs/`.

---

## Phase 1: Builder self-check

Before Critic review — verify:
- [ ] All issue acceptance criteria addressed?
- [ ] All Spec Contract scenarios satisfied?
- [ ] No unintended files in diff?
- [ ] All commits atomic and Conventional Commits format?
- [ ] `npm run test` and `npm run check` pass?

If any fail: fix before Phase 2.

---

## Phase 2: Critic review

You are now operating as the **@Critic** persona.

Goal: find what is wrong. Challenge the implementation, not approve it.

Guidelines:
1. Verdict based on Spec Contract — not personal preference
2. Check `AGENTS.md` Judgment Boundaries and referenced ADRs
3. Every finding must include: file:line, what is wrong, why it violates contract
4. Do not fix — produce findings only

Checklist:
- [ ] All Spec Contract scenarios addressed by implementation?
- [ ] No scope creep beyond issue Directive?
- [ ] No new linter/type errors?
- [ ] No secrets or credentials?
- [ ] No unapproved external dependencies?
- [ ] Each commit independently meaningful and reversible?
- [ ] Code consistent with `.agents/adrs/`?

Output:
```
## Review: [issue title]

### Verdict: PASS | FAIL | PASS WITH NOTES

### Findings
- [CRITICAL|MAJOR|MINOR] `path/to/file:line` — [what is wrong and why]

### Spec Coverage
- [PASS|FAIL] Scenario: [name]

### Notes
[Non-blocking observations]
```

---

## Phase 3: Resolution

| Verdict | Action |
|---|---|
| PASS | Confirm with user → `gh pr ready` (CLAUDE.md rule 7: human review required first) |
| PASS WITH NOTES | Present notes → decide together → `gh pr ready` |
| FAIL | Present findings → suggest `/implement $ARGUMENTS` to resolve |

After 3 FAIL cycles on same issue: escalate to human — Spec or issue may be wrong.
