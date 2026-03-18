# Workflow: Spec Authoring

> **Pattern**: [The Spec](https://asdlc.io/patterns/the-spec)
> **Practice**: [Living Specs](https://asdlc.io/practices/living-specs)
> This workflow guides the creation of a new Spec or the update of an existing one.

---

## When to Use

- Starting work on a new feature that has no Spec yet
- Updating an existing Spec after implementation revealed gaps or divergence
- Deriving a Spec from existing code (brownfield / Spec Reversing)

---

## Prerequisites

- A clear feature intent (user need, ticket, or conversation) exists
- The feature does not already have an `Active` Spec in `.agents/specs/`
- (For updates) the existing Spec and the divergent implementation are both available

---

## Steps

### Phase 1: Load Spec Writer Persona

Load `.asdlc/personas/spec-writer.md` into the agent session.

### Phase 2: Discovery

Gather inputs. If any are missing, ask before proceeding:

- [ ] What problem does this feature solve? (Intent)
- [ ] Who uses this feature and how? (Users / context)
- [ ] What is the core business constraint? (Non-negotiable requirement)
- [ ] What is explicitly NOT part of this feature? (Out of scope)
- [ ] Are there related features this builds on? (Dependencies)

### Phase 3: Draft the Spec

Create a new file: `.agents/specs/[kebab-case-feature-name].md`

Use the template: `.asdlc/templates/spec.md.template`

Fill sections in this order:
1. **Intent** — 1–3 paragraphs, problem-first
2. **Scope** — In scope and out of scope lists
3. **Contract** — Gherkin scenarios (happy path → edge cases → errors)
4. **Data Model** — Types, schema, or relevant structures
5. **Dependencies** — Links to related Specs
6. **Anti-patterns** — Known pitfalls (may be empty on first draft)

Set status to `Draft`.

### Phase 4: Contract Validation

Review the Contract scenarios:

- [ ] Is every scenario independently testable?
- [ ] Is every scenario unambiguous? (Could two developers interpret it differently?)
- [ ] Does the happy path scenario represent the core value of the feature?
- [ ] Is there a scenario for each significant error state?
- [ ] Do the scenarios collectively prove the Intent is satisfied?

If any answer is "no", refine the scenarios before proceeding.

### Phase 5: Human Review

Present the draft Spec for human review before marking it `Active`.

Key questions to answer together:
- Does the Intent accurately reflect the feature goal?
- Are the Contract scenarios the right success criteria?
- Is anything missing from the Out of scope list that might cause confusion?

### Phase 6: Finalise

After approval:
1. Update status from `Draft` to `Active`
2. Set the `Last updated` date
3. Commit: `docs: add spec for [feature-name]`

Hand off to `@Architect` for PBI decomposition.

---

## Updating an Existing Spec

When implementation diverges from the Spec:

1. Open the existing Spec
2. Identify the divergent section
3. Determine: was the Spec wrong, or was the implementation wrong?
   - If the Spec was wrong → update the Spec, document why in the Changelog
   - If the implementation was wrong → fix the implementation, do not change the Spec
4. Never silently update a Spec during a Builder session — changes must be intentional

---

## Anti-patterns

- **Do not write a Spec after the fact.** A post-hoc Spec describes what was built, not what should be built. This is documentation, not a Spec.
- **Do not put implementation details in the Contract.** Gherkin scenarios describe observable behaviour, not code structure.
- **Do not skip the Out of scope section.** Missing scope boundaries lead to agents implementing features that were not requested.
- **Do not let a Spec grow unbounded.** If a Spec exceeds ~150 lines, it likely covers multiple features. Split it.
