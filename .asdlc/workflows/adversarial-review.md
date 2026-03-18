# Workflow: Adversarial Code Review

> **Pattern**: [Adversarial Code Review](https://asdlc.io/patterns/adversarial-code-review)
> **Practice**: [Adversarial Code Review](https://asdlc.io/practices/adversarial-code-review)
> This workflow implements the Builder → Critic → Builder loop for validated implementation.

---

## When to Use

Run this workflow after completing a PBI implementation and before opening a pull request. The goal is consensus verification: a secondary Critic Agent validates Builder output against the Spec Contract.

---

## Prerequisites

- PBI has been implemented by `@Builder`
- The Spec referenced in the PBI exists and is up to date
- All automated checks (lint, type-check, tests) pass

---

## Steps

### Phase 1: Builder Self-Check

Before handing off to the Critic, the Builder verifies:

1. Re-read the PBI Directive — confirm every item in scope was addressed
2. Re-read the Spec Contract — confirm every Gherkin scenario is satisfied
3. Run all automated checks: lint, type-check, tests
4. Review the diff: no unintended files were modified
5. Verify all commits follow Conventional Commits format and are atomic

If anything fails, fix it before proceeding to Phase 2.

### Phase 2: Load Critic Persona

Load `.asdlc/personas/critic.md` into the agent session.

Provide the Critic with:
- The PBI file (`.agents/pbis/[pbi-file].md`)
- The referenced Spec file (`.agents/specs/[spec-file].md`)
- The `git diff` of the implementation (or a summary)
- Any relevant ADRs from `.agents/adrs/`

### Phase 3: Critic Review

The Critic performs an independent review using the checklist in `.asdlc/personas/critic.md`.

The Critic produces a structured review report:

```
## Review: [PBI Title]

### Verdict: PASS | FAIL | PASS WITH NOTES

### Findings
- [CRITICAL|MAJOR|MINOR] `path/to/file:line` — [finding]

### Spec Coverage
- [PASS|FAIL] Scenario: [name]

### Notes
[Non-blocking observations]
```

### Phase 4: Resolution

| Verdict | Action |
|---------|--------|
| **PASS** | Proceed to open a pull request |
| **PASS WITH NOTES** | Decide which notes to address; proceed when satisfied |
| **FAIL** | Return findings to `@Builder`; repeat from Phase 1 after fixes |

### Phase 5: Pull Request

Open a pull request with:
- Title following Conventional Commits format
- Body linking to the PBI and Spec
- Review report attached as a comment (if PASS WITH NOTES)

---

## Anti-patterns

- **Do not skip self-check.** The Critic is not a substitute for the Builder's own verification.
- **Do not let the Critic fix the code.** The Critic produces findings; the Builder implements fixes.
- **Do not loop indefinitely.** After three FAIL cycles on the same PBI, escalate to a human — the Spec or PBI may be the problem.
