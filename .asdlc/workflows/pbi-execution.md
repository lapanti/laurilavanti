# Workflow: PBI Execution

> **Pattern**: [The PBI](https://asdlc.io/patterns/the-pbi) | [Ralph Loop](https://asdlc.io/patterns/ralph-loop)
> **Practice**: [PBI Authoring](https://asdlc.io/practices/pbi-authoring) | [Micro-Commits](https://asdlc.io/practices/micro-commits)
> This workflow covers the full lifecycle of a PBI: authoring → execution → verification → close.

---

## When to Use

When there is an `Active` Spec and a unit of work needs to be defined and executed against it.

---

## Prerequisites

- An `Active` Spec exists in `.agents/specs/` for the relevant feature
- The work to be done is bounded (can be completed in one session and one pull request)
- A feature branch has been created

---

## Phase 1: PBI Authoring

Load `.asdlc/personas/architect.md`.

### 1.1 Create the PBI file

```
.agents/pbis/[YYYY-MM-DD]-[kebab-case-title].md
```

Use template: `.asdlc/templates/pbi.md.template`

### 1.2 Fill in the PBI

- **Directive**: State exactly what to build. Use "Implement X in Y" format. List in-scope deliverables and explicit out-of-scope items.
- **Context**: Link to the Spec, relevant ADRs, and specific files — do NOT copy content.
- **Verification**: List the specific Gherkin scenario names from the Spec that must pass.
- **Refinement Rule**: Choose the appropriate rule for this PBI (stop/flag, update+continue, or open question).

### 1.3 Decompose if needed

If the PBI is too large (estimated >1 day of work or touches too many systems), split it.

A PBI must be:
- **Atomic** — results in a single, coherent pull request
- **Verifiable** — has clear pass/fail criteria from the Spec
- **Independent** — does not depend on an unmerged sibling PBI

Set status to `Open`.

---

## Phase 2: Implementation

Load `.asdlc/personas/builder.md`.

### 2.1 Pre-flight check

Before writing any code:
- [ ] Read the Spec Intent and Contract sections
- [ ] Read the PBI Directive and Verification sections
- [ ] Confirm the feature branch is up to date with `main`

### 2.2 Implement

Work through the PBI Directive items in order. After each logical unit:

```bash
git add [changed files]
git commit -m "[type]: [short description]"
```

Commit types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`

**Micro-commit rules:**
- Each commit must be independently buildable
- Each commit must represent one logical change
- Never commit multiple unrelated changes together
- Commit messages must be in present tense imperative: "add ...", not "added ..."

### 2.3 Ralph Loop (for autonomous iteration)

When using the Ralph Loop pattern for autonomous agent execution:

```
while verification fails:
  1. Read the failing scenario from the Spec Contract
  2. Identify the root cause
  3. Implement a fix
  4. Run verification
  5. Micro-commit if passing; continue loop if not
```

Stop the loop and escalate to human if:
- The same scenario fails 3+ times with different fixes
- A fix requires deviating from the Spec
- A new dependency is needed

### 2.4 Verification gate

Before declaring implementation complete:
- [ ] Run tests (lint and type-check are enforced by pre-commit hooks and CI)
- [ ] Manually verify each Gherkin scenario in the PBI Verification section
- [ ] Confirm no unintended files were changed (`git diff main`)
- [ ] Confirm all commits are atomic and follow Conventional Commits

---

## Phase 3: Adversarial Review

Run `.asdlc/workflows/adversarial-review.md`.

---

## Phase 4: Pull Request & Close

### 4.1 Open pull request

```bash
git push -u origin [branch-name]
gh pr create --title "[type]: [short description]" \
  --body "Closes PBI: .agents/pbis/[pbi-file].md\nSpec: .agents/specs/[spec-file].md"
```

### 4.2 After merge

1. Update PBI status to `Done`
2. PBIs are transient — they can be deleted or archived after merge
3. Update the Spec Changelog if the implementation produced any Spec amendments

---

## Anti-patterns

- **Do not start implementation without a Spec.** A PBI without a Spec is a guess. Write the Spec first.
- **Do not batch multiple PBIs into one PR.** Each PBI = one PR. This maintains atomicity and makes rollback clean.
- **Do not update the Spec silently during implementation.** Any Spec amendment must be intentional and committed separately.
- **Do not leave PBIs open after merge.** Stale open PBIs pollute the context of future sessions.
