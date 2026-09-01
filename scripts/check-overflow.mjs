#!/usr/bin/env node
// Checks that no unbreakable word segment in a post/page `title`, tag
// `pageTitle` or tag `names` exceeds the width of the column it renders in.
//
// Widths are estimated from real Big Shoulders Display glyph metrics
// (scripts/font-metrics.json: per-glyph advances + kern pairs, weight 900;
// regenerate with `npm run generate:font-metrics`). Both checked surfaces
// render uppercase with letter-spacing −0.02em:
//
//   Hero H1 (SplitHero.astro) — mdx `title`, tag `pageTitle`:
//     52px in 328px (≤768px: 360 − 2×16)
//     72px in 453px (769px: 769 − 260 − 16 − 40)   ← tightest ratio
//     88px in 614px (1000px: 1000 − 330 − 16 − 40)
//     120px in 757px (≥1200px: 1200 − 331 − 2×56, h1 max-width 760px)
//   Topic heading (TopicPlate.astro) — tag `names`:
//     88px in 464px (29rem column, binding at ≥1200px)
//
// A segment is any run of chars between break points (space, hyphen, en/em
// dash, soft hyphen, colon). Visible break glyphs stay on the line they end:
// a segment that breaks at a soft hyphen is measured with a trailing "-"
// (the browser paints one), and hyphen/dash/colon breaks keep their glyph.
//
// Usage:
//   node scripts/check-overflow.mjs src/pages/**/*.mdx
//   node scripts/check-overflow.mjs src/content/tags/*.ts
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const metrics = JSON.parse(readFileSync(new URL('./font-metrics.json', import.meta.url), 'utf8'))

const LETTER_SPACING_EM = -0.02
const WIDEST_EM = Math.max(...Object.values(metrics.advances))

const warnedChars = new Set()

function advanceEm(ch) {
    const adv = metrics.advances[ch]
    if (adv === undefined) {
        if (!warnedChars.has(ch)) {
            warnedChars.add(ch)
            console.warn(
                `warning: no font metrics for ${JSON.stringify(ch)} — assuming widest glyph; ` +
                    'add it to CHARSET in scripts/generate-font-metrics.mjs and run npm run generate:font-metrics'
            )
        }
        return WIDEST_EM
    }
    return adv
}

// Estimated rendered width of an unbreakable segment, in px. Matches browser
// rendering (uppercase, kerning, letter-spacing after every char) within ~0.5%
// — see scripts/checks/fixtures/font-metrics-validation.json.
export function segmentWidthPx(segment, fontPx) {
    const chars = [...segment.toUpperCase()]
    let em = 0
    for (let i = 0; i < chars.length; i++) {
        em += advanceEm(chars[i])
        if (i > 0) em += metrics.kerning[chars[i - 1] + chars[i]] ?? 0
    }
    return em * fontPx + LETTER_SPACING_EM * fontPx * chars.length
}

// Break chars whose glyph stays at the end of the broken line
const VISIBLE_BREAKS = new Set(['-', '–', '—', ':'])
const SOFT_HYPHEN = '­'

// Split a value into renderable segments, keeping the visible break glyph (or
// the "-" a soft hyphen paints) attached to the segment it ends.
export function toSegments(value) {
    const segments = []
    let current = ''
    for (const ch of value) {
        if (ch === SOFT_HYPHEN) {
            if (current) segments.push(current + '-')
            current = ''
        } else if (VISIBLE_BREAKS.has(ch)) {
            if (current) segments.push(current + ch)
            current = ''
        } else if (/\s/.test(ch)) {
            if (current) segments.push(current)
            current = ''
        } else {
            current += ch
        }
    }
    if (current) segments.push(current)
    return segments
}

// --- geometries ---

export const HERO_GEOMETRIES = [
    { availPx: 328, fontPx: 52, label: 'hero H1 ≤768px' },
    { availPx: 453, fontPx: 72, label: 'hero H1 at 769px' },
    { availPx: 614, fontPx: 88, label: 'hero H1 at 1000px' },
    { availPx: 757, fontPx: 120, label: 'hero H1 ≥1200px' },
]

export const TOPIC_GEOMETRIES = [{ availPx: 464, fontPx: 88, label: 'topic heading ≥1200px' }]

// Worst overflow across geometries for each segment of a value, or [] if fine.
export function findOverflows(value, geometries) {
    const failures = []
    for (const segment of toSegments(value)) {
        let worst = null
        for (const geometry of geometries) {
            const widthPx = segmentWidthPx(segment, geometry.fontPx)
            const overshoot = widthPx - geometry.availPx
            if (overshoot > 0 && (worst === null || overshoot > worst.overshoot)) {
                worst = { ...geometry, overshoot, widthPx }
            }
        }
        if (worst) failures.push({ segment, ...worst })
    }
    return failures
}

// --- extractors ---

export function extractMdxFields(src) {
    // Extract frontmatter block
    const fm = src.match(/^---\n([\s\S]*?)\n---/)
    if (!fm) return []
    const block = fm[1]
    const results = []

    const titleM = block.match(/^title:\s*['"](.+?)['"]\s*$/m)
    if (titleM) results.push({ field: 'title', geometries: HERO_GEOMETRIES, value: titleM[1] })

    return results
}

function resolveJsEscapes(str) {
    // Resolve \uXXXX escapes that appear literally in source strings
    return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
}

export function extractTagFields(src) {
    const results = []
    for (const { geometries, key } of [
        { geometries: HERO_GEOMETRIES, key: 'pageTitle' },
        { geometries: TOPIC_GEOMETRIES, key: 'names' },
    ]) {
        const block = src.match(new RegExp(`${key}:\\s*\\{([^}]+)\\}`))
        if (!block) continue
        const localeRe = /(\w{2}):\s*['"](.+?)['"]/g
        let m
        while ((m = localeRe.exec(block[1])) !== null) {
            results.push({ field: `${key}.${m[1]}`, geometries, value: resolveJsEscapes(m[2]) })
        }
    }
    return results
}

// --- main ---

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isMain) {
    let failed = 0
    const files = process.argv.slice(2)

    for (const rawPath of files) {
        const path = resolve(rawPath)
        const src = readFileSync(path, 'utf8')

        const isMdx = path.endsWith('.mdx')
        const isTagTs = path.endsWith('.ts') && path.includes('/content/tags/')

        if (!isMdx && !isTagTs) continue

        const fields = isMdx ? extractMdxFields(src) : extractTagFields(src)

        for (const { field, geometries, value } of fields) {
            for (const { availPx, fontPx, label, segment, widthPx } of findOverflows(value, geometries)) {
                console.error(
                    `${path}: ${field}: segment "${segment}" estimated ${Math.round(widthPx)}px > ${availPx}px (${label}, ${fontPx}px) — add soft hyphen (­)`
                )
                failed++
            }
        }
    }

    process.exit(failed > 0 ? 1 : 0)
}
