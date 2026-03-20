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
| **Lint** | `npm run lint` | ESLint + Prettier — run before every commit |
| **Type check** | `npm run check` | Astro TypeScript check |

---

## Judgment Boundaries

### NEVER — Hard limits (no exceptions)
- Never commit secrets, tokens, or `.env` files
- Never add external dependencies without explicit discussion
- Never use `_` to ignore errors
- Never guess on ambiguous specs — stop and ask

### ASK — Human-in-the-loop triggers
- Ask before adding external dependencies
- Ask before any action that affects shared state (push, PR, issue comments, etc.)

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
3. **Implement** in small, focused commits:
   - Run `npm run lint` before each commit and fix any errors
   - Run `npm run check` to verify TypeScript types
   - Commit with conventional format: `type(scope): description`
4. **Verify all checks pass** before pushing:
   - `npm run lint && npm run check && npm run test && npm run build && npm run test:e2e`
   - If DOM structure or visuals changed, update snapshots first: `npm run test:e2e -- --update-snapshots`
5. **Push and open a PR** — `git push -u origin HEAD` then `gh pr create` referencing the issue (`Closes #N`)
6. **Sign all commits with GPG** — if the key is locked, ask the user to unlock it before committing
