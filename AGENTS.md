# AGENTS.md

> **ASDLC**: This file is the Agent Constitution for this project.
> It follows the [AGENTS.md Specification](https://asdlc.io/practices/agents-md-spec).
> Keep it minimal and precise — unnecessary content actively harms agent performance.
> If a constraint can be enforced by a linter or tool, it must NOT live here.

---

## Mission

Personal homepage of Lauri Lavanti (https://laurilavanti.fi). Built with Astro + TypeScript + MDX — all content is local MDX files, no CMS or external content API.
Core constraint: all-content-local; hosted on Cloudflare Pages (static output only, no SSR).

---

## Toolchain

| Intent | Command | Notes |
|--------|---------|-------|
| **Build** | `npm run build` | |
| **Dev server** | `npm run dev` | |
| **Preview** | `npm run preview` | Preview production build locally |
| **Test (unit)** | `npm run test` | Vitest |
| **Test (E2E)** | `npm run test:e2e` | Playwright — builds + previews automatically |
| **Lint** | `npm run lint` | ESLint + Prettier |
| **Type check** | `npm run check` | Astro TypeScript check |

---

## Git Workflow

All agents and workflows shall follow these rules for every change:

1. **Feature branch** — All changes shall be made on a feature branch created from an up-to-date `main`. Never commit directly to `main`.
2. **Micro-commits** — Each commit shall represent one logical, independently reversible change. Follow [Conventional Commits](https://www.conventionalcommits.org/).
3. **Push immediately** — Every commit shall be pushed to remote immediately after committing.
4. **Co-authored-by trailer** — Every commit made by an AI agent shall include a `Co-authored-by` trailer identifying the agent (e.g. `Co-authored-by: Claude Sonnet <claude-sonnet@anthropic.com>`).
5. **Draft PR on first commit** — After the first commit on a new feature branch is pushed, open a draft PR using `gh pr create --draft`. Suggest the PR title and body to the user for approval before creating.
6. **AI usage note in PR** — Every PR containing AI-generated code shall include the following note as the **first line** of the PR description: `> This PR containes AI-generated code. The author has reviewed and is responsible for all AI-generated content.`
7. **Mark ready after human review** — After all work on a feature branch is complete and the human author has reviewed all AI-generated changes, mark the draft PR as ready for review using `gh pr ready`. Human review is a prerequisite — never mark a PR ready immediately after the final commit without it.

---

## Judgment Boundaries

### NEVER — Hard limits (no exceptions)
- Never commit secrets, tokens, or `.env` files
- Never add external dependencies without explicit discussion
- Never use `_` to ignore errors
- Never guess on ambiguous specs — stop and ask

### ASK — Human-in-the-loop triggers
- Ask before adding external dependencies
- Ask before issue comments or any other shared-state action not covered by the issue workflow below

### PREFER — Architectural defaults
- Prefer local MDX content over external data sources
- Prefer static output; never introduce SSR without discussion

---

## Personas

Invoke on-demand (do not load all at once):

| Persona | File | Purpose |
|---------|------|---------|
| `@Builder` | `.asdlc/personas/builder.md` | Feature implementation |
| `@Critic` | `.asdlc/personas/critic.md` | Adversarial code review |
| `@Architect` | `.asdlc/personas/architect.md` | Design & planning |
| `@SpecWriter` | `.asdlc/personas/spec-writer.md` | Spec authoring |

---

## Context Map

```yaml
project:
  # Living specs — permanent source of truth per feature:
  specs: .agents/specs/
  # Architecture decisions:
  adrs: .agents/adrs/
  # ASDLC base scaffolding (templates, personas, workflows):
  asdlc_base: .asdlc/
  # Global architecture reference:
  architecture: ARCHITECTURE.md

src:
  components: src/components/   # Astro UI components
  layouts: src/layouts/         # Page layouts (BaseLayout, PostLayout, PageLayout, FrontPageLayout)
  lib: src/lib/                 # Build-time helpers (mdxPosts.ts, etc.)
  content: src/content/         # Tags, nav, and other content definitions
  pages: src/pages/             # MDX content and Astro route files (locale-structured)
```

---

<!-- PROJECT-SPECIFIC SECTIONS -->

## Issue workflow

GitHub issues serve as PBIs. When asked to work on an issue:

1. **Assign the issue** — `gh issue edit {number} --add-assignee @me`
2. **Create a branch** — `git checkout -b type/{short-kebab-description}` (no issue number prefix; include type e.g. `fix` or `feat`)
3. **First commit** — after the first commit on the branch:
   - Commit with conventional format: `type(scope): description` — the pre-commit hook runs lint, content validation, and related unit tests automatically
   - Push — `git push -u origin HEAD`
   - Open a **draft PR** — `gh pr create --draft` referencing the issue (`Closes #N`)
4. **Subsequent commits** — for every further commit:
   - Commit with conventional format: `type(scope): description`
   - Push — `git push`
5. **Finalise** — after the last commit and push:
   - **Always** mark PR ready: `gh pr ready` — do this even if you think you may have already done it
   - Update PR description if needed: `gh pr edit`
   - Wait for the PR checks to complete in CI; if the e2e check fails, inspect the Playwright report, identify what broke, and fix it in a follow-up commit
6. **Sign all commits with GPG** — if the key is locked, ask the user to unlock it before committing
