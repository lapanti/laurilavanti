/**
 * cross-file.mjs
 *
 * Cross-file content integrity checks. Runs against the full src/pages/ and
 * src/content/posts/ trees (no path arguments) on every MDX commit.
 *
 * Checks:
 *   - Translation triplet completeness (every post id has meta.json + fi/sv/en.mdx)
 *   - Slug uniqueness per locale (two posts sharing a slug would collide at the URL)
 *   - pageTitle uniqueness per locale (duplicate <title> tags hurt SEO)
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const pagesRoot = join(__dirname, '..', '..', 'src', 'pages')
const postsRoot = join(__dirname, '..', '..', 'src', 'content', 'posts')
const LANGS = ['fi', 'sv', 'en']

let hasError = false

function err(msg) {
    process.stderr.write(`\x1b[31mERROR\x1b[0m [cross-file] ${msg}\n`)
    hasError = true
}

/** Extract a scalar frontmatter field. */
function fmField(content, field) {
    const re = new RegExp(`^${field}:\\s*(?:'([^']*)'|"([^"]*)"|([^\\n'""][^\\n]*))`, 'm')
    const m = content.match(re)
    if (!m) return null
    return (m[1] ?? m[2] ?? m[3] ?? '').trim()
}

// ── translation triplet + slug-uniqueness check ───────────────────────────────
const postIds = readdirSync(postsRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^\d+$/.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => Number(a) - Number(b))

const slugsByLang = {}
for (const lang of LANGS) slugsByLang[lang] = new Map()

for (const id of postIds) {
    const dir = join(postsRoot, id)
    const files = new Set(readdirSync(dir))
    const missing = ['meta.json', ...LANGS.map((l) => `${l}.mdx`)].filter((f) => !files.has(f))
    if (missing.length > 0) {
        err(`post id ${id} is missing: ${missing.join(', ')}`)
        continue
    }

    for (const lang of LANGS) {
        const content = readFileSync(join(dir, `${lang}.mdx`), 'utf8')
        const slug = fmField(content, 'slug')
        if (!slug) continue
        const map = slugsByLang[lang]
        if (!map.has(slug)) map.set(slug, [])
        map.get(slug).push(id)
    }
}

for (const lang of LANGS) {
    for (const [slug, ids] of slugsByLang[lang]) {
        if (ids.length > 1) {
            err(`duplicate slug "${slug}" in ${lang} locale, used by post ids: ${ids.join(', ')}`)
        }
    }
}

// ── title uniqueness check ────────────────────────────────────────────────────

/** Recursively collect all index.mdx files under dir. */
function collectMdx(dir) {
    const result = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name)
        if (entry.isDirectory()) result.push(...collectMdx(full))
        else if (entry.name === 'index.mdx') result.push(full)
    }
    return result
}

/** Recursively collect all {lang}.mdx post files under dir. */
function collectPostMdx(dir) {
    const result = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name)
        if (entry.isDirectory()) result.push(...collectPostMdx(full))
        else if (/^(fi|sv|en)\.mdx$/.test(entry.name)) result.push(full)
    }
    return result
}

// Map: lang → Map<title, filepath[]>
const titlesByLang = {}
for (const lang of LANGS) titlesByLang[lang] = new Map()

for (const file of [...collectMdx(pagesRoot), ...collectPostMdx(postsRoot)]) {
    const content = readFileSync(file, 'utf8')
    const lang = fmField(content, 'lang')
    const title = fmField(content, 'pageTitle')
    if (!lang || !title) continue
    if (!titlesByLang[lang]) continue
    const map = titlesByLang[lang]
    if (!map.has(title)) map.set(title, [])
    map.get(title).push(file.replace(join(__dirname, '..', '..') + '/', ''))
}

for (const lang of LANGS) {
    for (const [title, files] of titlesByLang[lang]) {
        if (files.length > 1) {
            err(`duplicate title in ${lang} locale: "${title}"\n  ${files.join('\n  ')}`)
        }
    }
}

if (!hasError) {
    const total = postIds.length
    const pages = LANGS.flatMap((l) => [...titlesByLang[l].values()]).flat().length
    console.log(`OK: ${total} post IDs complete in fi/sv/en; no duplicate slugs or titles across ${pages} pages`)
}

process.exit(hasError ? 1 : 0)
