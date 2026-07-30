/**
 * redirects.mjs
 *
 * Audit src/lib/redirects.ts for chains and dead-end targets.
 *
 * Chains:  A→B exists AND B→…→C exists — source should point directly to C.
 * Dead-ends: terminal destination does not exist as a page, category, or static route.
 *
 * Run: node --experimental-strip-types scripts/checks/redirects.mjs
 * Exit 0 = clean. Exit 1 = chains or dead-ends found.
 */

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { redirects } from '../../src/lib/redirects.ts'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = join(__dirname, '..', '..')
const postsRoot = join(root, 'src', 'content', 'posts')
const LANGS = ['en', 'fi', 'sv']

/** Extract a scalar frontmatter field (single-quoted, double-quoted, or bare). */
function fmField(content, field) {
    const re = new RegExp(`^${field}:\\s*(?:'([^']*)'|"([^"]*)"|([^\\n'""][^\\n]*))`, 'm')
    const m = content.match(re)
    if (!m) return null
    return (m[1] ?? m[2] ?? m[3] ?? '').trim()
}

// Derive tag IDs from filesystem (src/content/tags/*.ts, excluding types.ts)
const tagIds = readdirSync(join(root, 'src', 'content', 'tags'))
    .filter((f) => f.endsWith('.ts') && f !== 'types.ts')
    .map((f) => f.replace(/\.ts$/, ''))

let hasError = false

function err(msg) {
    process.stderr.write(`\x1b[31mERROR\x1b[0m [redirects] ${msg}\n`)
    hasError = true
}

// ── Build valid-route set ─────────────────────────────────────────────────────

const validRoutes = new Set()

// Static pages
validRoutes.add('/')
const staticPaths = ['', '/about', '/blog', '/contact', '/newsletter', '/privacy-policy', '/recommendations', '/topics']
for (const lang of LANGS) {
    for (const path of staticPaths) {
        validRoutes.add(`/${lang}${path}/`)
    }
}

// Category pages: /{lang}/category/{tag.id}/
for (const tagId of tagIds) {
    for (const lang of LANGS) {
        validRoutes.add(`/${lang}/category/${tagId}/`)
        validRoutes.add(`/${lang}/topics/${tagId}/`)
    }
}

// Blog pages: /{lang}/blog/{id}/{slug}/ — bare /{lang}/blog/{id}/ excluded.
// Posts live at src/content/posts/{id}/{lang}.mdx; slug comes from that file's
// own frontmatter (no longer derivable from the directory name).
const postIdDirs = readdirSync(postsRoot, { withFileTypes: true }).filter(
    (e) => e.isDirectory() && /^\d+$/.test(e.name)
)
for (const idDir of postIdDirs) {
    for (const lang of LANGS) {
        const langPath = join(postsRoot, idDir.name, `${lang}.mdx`)
        let content
        try {
            content = readFileSync(langPath, 'utf-8')
        } catch {
            continue
        }
        const slug = fmField(content, 'slug')
        if (slug) validRoutes.add(`/${lang}/blog/${idDir.name}/${slug}/`)
    }
}

// ── Chain detection ───────────────────────────────────────────────────────────

/**
 * @typedef {{ from: string, via: string[], terminal: string, isCycle: boolean }} ChainFinding
 */

/**
 * Follow hops from `start` through the redirect map.
 * Only traverses intermediate hops that are themselves redirect SOURCES.
 * Returns the first destination that is NOT a redirect source (the terminal),
 * the list of intermediate hops, and whether a cycle was detected.
 */
function followChain(start) {
    const visited = new Set([start])
    const via = []
    let current = redirects[start]

    // Only follow if the current destination is itself a redirect source
    while (current !== undefined && current in redirects) {
        if (visited.has(current)) {
            return { via, terminal: current, isCycle: true }
        }
        visited.add(current)
        via.push(current)
        current = redirects[current]
    }

    // current is now the terminal: either a valid route, a dead-end, or undefined
    const terminal = current ?? redirects[start]
    return { via, terminal, isCycle: false }
}

/** @type {ChainFinding[]} */
const chains = []

for (const source of Object.keys(redirects)) {
    const immediate = redirects[source]
    if (immediate === undefined) continue

    const { via, terminal, isCycle } = followChain(source)

    if (isCycle) {
        chains.push({ from: source, via, terminal, isCycle: true })
    } else if (via.length > 0) {
        // Only report if the intermediate hop is itself a redirect source
        chains.push({ from: source, via, terminal, isCycle: false })
    }
}

// ── Dead-end detection ────────────────────────────────────────────────────────

/**
 * @typedef {{ from: string, terminal: string }} DeadEndFinding
 */

/** @type {DeadEndFinding[]} */
const deadEnds = []

for (const source of Object.keys(redirects)) {
    const { via, terminal, isCycle } = followChain(source)
    if (isCycle) continue // already reported as chain

    const finalDest = via.length > 0 ? terminal : redirects[source]
    if (!validRoutes.has(finalDest)) {
        deadEnds.push({ from: source, terminal: finalDest })
    }
}

// ── Output ────────────────────────────────────────────────────────────────────

const total = Object.keys(redirects).length

if (chains.length > 0) {
    err(`\nChains (${chains.length}):`)
    for (const { from, via, terminal, isCycle } of chains) {
        const hops = [from, ...via, terminal].join('  →  ')
        const label = isCycle ? '[CYCLE]' : '[collapse → terminal]'
        err(`Chain: ${hops}  ${label}`)
    }
}

if (deadEnds.length > 0) {
    err(`\nDead-ends (${deadEnds.length}):`)
    for (const { from, terminal } of deadEnds) {
        err(`Dead-end: ${from}  →  ${terminal}  [no matching route]`)
    }
}

const issueSet = new Set([...chains.map((c) => c.from), ...deadEnds.map((d) => d.from)])
const clean = total - issueSet.size
console.log(
    `\nRedirect audit — ${total} entries\nSummary: ${total} total, ${chains.length} chains, ${deadEnds.length} dead-ends, ${clean} clean.`
)

process.exit(hasError ? 1 : 0)
