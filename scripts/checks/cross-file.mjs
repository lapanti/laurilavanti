/**
 * cross-file.mjs
 *
 * Cross-file content integrity checks. Runs against the full src/pages/ tree
 * (no path arguments) on every MDX commit.
 *
 * Checks:
 *   - Translation triplet completeness (every blog id exists in fi, sv, en)
 *   - Title uniqueness per locale (duplicate <title> tags hurt SEO)
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const pagesRoot = join(__dirname, '..', '..', 'src', 'pages')
const LANGS = ['fi', 'sv', 'en']

let hasError = false

function err(msg) {
    process.stderr.write(`\x1b[31mERROR\x1b[0m [cross-file] ${msg}\n`)
    hasError = true
}

// ── translation triplet check ─────────────────────────────────────────────────
const idsByLang = {}
for (const lang of LANGS) {
    const blogDir = join(pagesRoot, lang, 'blog')
    const entries = readdirSync(blogDir, { withFileTypes: true })
    idsByLang[lang] = new Set(
        entries.filter((e) => e.isDirectory() && /^\d+$/.test(e.name)).map((e) => e.name)
    )
}

const allIds = new Set(LANGS.flatMap((l) => [...idsByLang[l]]))
for (const id of [...allIds].sort((a, b) => Number(a) - Number(b))) {
    const missing = LANGS.filter((l) => !idsByLang[l].has(id))
    if (missing.length > 0) {
        err(`post id ${id} is missing translations in: ${missing.join(', ')}`)
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

/** Extract a scalar frontmatter field. */
function fmField(content, field) {
    const re = new RegExp(`^${field}:\\s*(?:'([^']*)'|"([^"]*)"|([^\\n'""][^\\n]*))`, 'm')
    const m = content.match(re)
    if (!m) return null
    return (m[1] ?? m[2] ?? m[3] ?? '').trim()
}

// Map: lang → Map<title, filepath[]>
const titlesByLang = {}
for (const lang of LANGS) titlesByLang[lang] = new Map()

for (const file of collectMdx(pagesRoot)) {
    const content = readFileSync(file, 'utf8')
    const lang = fmField(content, 'lang')
    const title = fmField(content, 'title')
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
    const total = allIds.size
    const pages = LANGS.flatMap((l) => [...titlesByLang[l].values()]).flat().length
    console.log(`OK: ${total} post IDs complete in fi/sv/en; no duplicate titles across ${pages} pages`)
}

process.exit(hasError ? 1 : 0)
