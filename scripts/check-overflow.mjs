#!/usr/bin/env node
// Checks that no unbreakable word segment in title/pageTitle exceeds the
// available container width on mobile (360 px viewport, Galaxy S24).
//
// H1 on post/tag pages: Krana Fat 60 px, container ≈ 344 px (360 − 2×8)
// H2 in excerpt cards:  Krana Fat 36 px, container ≈ 328 px (360 − 2×16)
//
// Character-width buckets for Krana Fat (condensed display font), in em:
//   narrow  i j l f r t | !  → 0.38
//   normal  a-z (rest) digits → 0.52
//   wide    m w                → 0.75
//   upper   A-Z (rest)        → 0.62
//   upper-w M W                → 0.85
//
// A segment is any run of chars between: space, hyphen, en-dash, em-dash,
// soft-hyphen (U+00AD), or the colon that follows a subtitle prefix.
// Soft hyphens are valid break points — split there.
//
// Usage:
//   node scripts/check-overflow.mjs src/pages/**/*.mdx
//   node scripts/check-overflow.mjs src/content/tags/*.ts
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const NARROW = new Set('ijlrftIJLRFT1|!')
const WIDE = new Set('mw')
const UPPER_WIDE = new Set('MW')

function charWidth(ch) {
    const lo = ch.toLowerCase()
    if (WIDE.has(lo)) return 0.75
    if (NARROW.has(lo)) return 0.38
    if (UPPER_WIDE.has(ch)) return 0.85
    if (ch >= 'A' && ch <= 'Z') return 0.62
    if (ch >= '0' && ch <= '9') return 0.52
    // accented/special: treat as normal
    return 0.52
}

function segmentWidth(seg, fontPx) {
    let w = 0
    for (const ch of seg) w += charWidth(ch)
    return w * fontPx
}

// Break on spaces, hyphens, en/em dashes, soft hyphens, colons
const BREAK_RE = /[\s­–—:-]/

// --- extractors ---

function extractMdxFields(src) {
    // Extract frontmatter block
    const fm = src.match(/^---\n([\s\S]*?)\n---/)
    if (!fm) return []
    const block = fm[1]
    const results = []

    const titleM = block.match(/^title:\s*['"](.+?)['"]\s*$/m)
    if (titleM) results.push({ field: 'title', value: titleM[1] })

    return results
}

function resolveJsEscapes(str) {
    // Resolve \uXXXX escapes that appear literally in source strings
    return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
}

function extractTagFields(src) {
    // Match pageTitle object locale values
    const results = []
    const pageTitleBlock = src.match(/pageTitle:\s*\{([^}]+)\}/)
    if (!pageTitleBlock) return results
    const block = pageTitleBlock[1]
    const localeRe = /(\w{2}):\s*['"](.+?)['"]/g
    let m
    while ((m = localeRe.exec(block)) !== null) {
        results.push({ field: `pageTitle.${m[1]}`, value: resolveJsEscapes(m[2]) })
    }
    return results
}

// --- main ---

const H1_PX = 60
const H2_PX = 36
// Galaxy S24 viewport: 360px; padding 8px each side for H1 container
const H1_AVAIL = 344
// Excerpt H2 container: slightly narrower due to larger padding (16px each side)
const H2_AVAIL = 328

let failed = 0
const files = process.argv.slice(2)

for (const rawPath of files) {
    const path = resolve(rawPath)
    const src = readFileSync(path, 'utf8')

    const isMdx = path.endsWith('.mdx')
    const isTagTs = path.endsWith('.ts') && path.includes('/content/tags/')

    if (!isMdx && !isTagTs) continue

    const fields = isMdx ? extractMdxFields(src) : extractTagFields(src)

    for (const { field, value } of fields) {
        // Split on break characters (including soft hyphens) to get renderable segments
        const segments = value.split(BREAK_RE).filter(Boolean)

        const h1w = Math.max(0, ...segments.map((s) => segmentWidth(s, H1_PX)))
        if (h1w > H1_AVAIL) {
            const longestSeg = segments.reduce((a, b) => (segmentWidth(b, H1_PX) > segmentWidth(a, H1_PX) ? b : a), '')
            console.error(
                `${path}: ${field}: segment "${longestSeg}" estimated ${Math.round(h1w)}px > ${H1_AVAIL}px (H1 at ${H1_PX}px) — add soft hyphen (­)`
            )
            failed++
        }

        // For MDX title: also check as H2 in excerpt cards (same field, smaller font)
        if (isMdx && field === 'title') {
            const h2w = Math.max(0, ...segments.map((s) => segmentWidth(s, H2_PX)))
            if (h2w > H2_AVAIL) {
                const longestSeg = segments.reduce(
                    (a, b) => (segmentWidth(b, H2_PX) > segmentWidth(a, H2_PX) ? b : a),
                    ''
                )
                console.error(
                    `${path}: ${field}: segment "${longestSeg}" estimated ${Math.round(h2w)}px > ${H2_AVAIL}px (H2 at ${H2_PX}px) — add soft hyphen (­)`
                )
                failed++
            }
        }
    }
}

process.exit(failed > 0 ? 1 : 0)
