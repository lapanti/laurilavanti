# Agents.md

## Project overview

Personal homepage of Lauri Lavanti (https://laurilavanti.fi). Built with Astro + TypeScript + MDX. All content is local — no CMS or external content API. Hosted on Cloudflare Pages.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full architecture reference: content structure, layouts, images, tags, i18n, redirects, code style constraints, and testing patterns.

## Commands

```bash
npm run dev          # dev server
npm run build        # production build
npm run preview      # preview build locally
npm run test         # Vitest unit tests
npm run test:e2e     # Playwright e2e tests
npm run lint         # ESLint + Prettier check
npm run check        # Astro TypeScript type check
```

## Issue workflow

When asked to work on a GitHub issue, follow these steps in order:

1. **Assign the issue** — `gh issue edit {number} --add-assignee @me`
2. **Create a branch** — `git checkout -b type/{short-kebab-description}` (no issue number prefix needed, include type of branch e.g. fix or feat)
3. **Implement the changes** in small, focused commits:
   - Run `npm run lint` before each commit and fix any errors
   - Run `npm run check` to verify TypeScript types
   - Commit with `git commit -m "type(scope): description"` (conventional commits)
4. **Verify all checks pass** locally before pushing:
   - `npm run lint`
   - `npm run check`
   - `npm run test`
   - `npm run build`
   - `npm run test:e2e`
   - If the change affects DOM structure or visuals, update snapshots first:
     `npm run test:e2e -- --update-snapshots`
5. **Push and open a PR** — `git push -u origin HEAD` then `gh pr create` with a clear title and body referencing the issue (`Closes #N`)

## Judgment Boundaries

**NEVER**
- Commit secrets, tokens, or `.env` files
- Add external dependencies without discussion
- Use `_` to ignore errors

**ASK**
- Before adding external dependencies
- Before running database migrations

**ALWAYS**
- Explain your plan before writing code
- Commit changes in small minimal commits, using conventional commits format
- Sign commits with gpg. If the key is locked, ask user to open it
