/**
 * check-long-words.mjs
 *
 * Verifies that no single word in H1/H2/H3/blockquote content of MDX files
 * is long enough to cause horizontal scrolling on a narrow mobile viewport.
 *
 * Used as a lint-staged pre-commit hook for *.mdx files.
 * Usage: node scripts/check-long-words.mjs [file1.mdx file2.mdx ...]
 *
 * --- Width derivation (360 px — conservative minimum mobile viewport) ---
 *
 * H1 container (.title-container): viewport − 2 × 0.5 rem padding
 *   = 360 − 2 × 8 = 344 px
 *
 * Content column (gridTemplateColumnsArticle col 3):
 *   min(1200px − 1rem, 100% − 1.125rem) at 360 px
 *   = min(1184, 360 − 18) = 342 px
 *
 * Blockquote: content column − 0.5 rem border-left − 0.5 rem padding-left
 *   = 342 − 16 = 326 px
 *
 * --- Threshold derivation ---
 *
 * threshold = floor(availablePx / (fontSizeRem × baseFontPx × charWidthEm))
 *
 * H1  Krana Fat 1000, 3.75 rem, 0.52 em/char (condensed display):  floor(344 / 31.20) = 11
 * H2  Krana Fat 1000, 2.25 rem, 0.45 em/char:                      floor(342 / 16.20) = 21
 * H3  IBM Plex Sans 500, 1.5 rem, 0.56 em/char (humanist sans):    floor(342 / 13.44) = 25
 * BQ  IBM Plex Mono 400, 1.5 rem, 0.60 em/char (monospace spec):   floor(326 / 14.40) = 22
 *
 * H1 uses 0.47 em/char (vs 0.45 for H2) because Krana Fat at 60px with mixed-case Latin
 * text has narrower average char widths than at 36px with all-lowercase Finnish/Swedish.
 * Threshold 11 accounts for the rendered soft-hyphen glyph: an 11-char segment followed by
 * a visible hyphen (~1 char wide) fits within 344 px; 12 chars + hyphen does not.
 *
 * Calibration: "digitaliseringsdirektör" (24 chars) in H2 caused real overflow
 * → 24 > H2 threshold 21 ✓
 */

import { readFileSync } from 'node:fs'

const VIEWPORT_PX = 360 // conservative minimum mobile viewport
const BASE_FONT_PX = 16

// Content column: min(1200 − 1rem, viewport − 1.125rem)
const CONTENT_COL_PX = Math.min(1200 - BASE_FONT_PX, VIEWPORT_PX - 1.125 * BASE_FONT_PX) // 342

// H1 container: viewport − 2 × 0.5rem padding
const H1_AVAIL_PX = VIEWPORT_PX - 2 * 0.5 * BASE_FONT_PX // 344

// Blockquote: content column − 0.5rem border − 0.5rem padding-left
const BQ_AVAIL_PX = CONTENT_COL_PX - 2 * 0.5 * BASE_FONT_PX // 326

const H1_THRESHOLD = Math.floor(H1_AVAIL_PX / (3.75 * BASE_FONT_PX * 0.52)) // 11
const H2_THRESHOLD = Math.floor(CONTENT_COL_PX / (2.25 * BASE_FONT_PX * 0.45)) // 21
const H3_THRESHOLD = Math.floor(CONTENT_COL_PX / (1.5 * BASE_FONT_PX * 0.56)) // 25
const BQ_THRESHOLD = Math.floor(BQ_AVAIL_PX / (1.5 * BASE_FONT_PX * 0.6)) // 22

/**
 * Strip markdown inline formatting and normalise HTML entities, leaving plain text.
 * The result is used only for word-length checks, not for display.
 */
function stripMarkdown(text) {
    return (
        text
            // links: [label](url) → label
            .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
            // bold **text** or __text__
            .replace(/\*\*([^*]*)\*\*/g, '$1')
            .replace(/__([^_]*)__/g, '$1')
            // italic *text* or _text_
            .replace(/\*([^*]*)\*/g, '$1')
            .replace(/_([^_]*)_/g, '$1')
            // inline code `text`
            .replace(/`([^`]*)`/g, '$1')
            // soft hyphen entity → Unicode soft hyphen
            .replace(/&shy;/g, '\u00AD')
            // other common entities
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            // check ampersand last to avoid double unescaping
            .replace(/&amp;/g, '&')
    )
}

/**
 * Split text into word segments that would be rendered without a line-break opportunity.
 * Spaces, hyphens, soft hyphens (U+00AD), en/em dashes, and common punctuation that
 * cannot appear mid-word are all treated as break points. Apostrophes are kept as part
 * of the word (e.g. "municipality's").
 */
function wordSegments(text) {
    return text.split(/[\s\u00AD\u2013\u2014\-,.:;!?()\[\]{}|/"«»„""]+/).filter((s) => s.length > 0)
}

/**
 * Parse all pageTitle locale string values from tags.ts.
 * Returns an array of { value, line } objects for error reporting.
 */
function extractPageTitles(tsContent) {
    const lines = tsContent.split('\n')
    const results = []
    let inPageTitle = false
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (/pageTitle\s*:\s*\{/.test(line)) {
            inPageTitle = true
            continue
        }
        if (inPageTitle && /^\s*\},?$/.test(line)) {
            inPageTitle = false
            continue
        }
        if (inPageTitle) {
            const m = line.match(/(?:en|fi|sv)\s*:\s*(?:'([^']*)'|"([^"]*)")/)
            if (m) {
                // Unescape \uXXXX sequences so soft hyphens (\u00AD) act as break points
                const raw = (m[1] ?? m[2]).replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
                    String.fromCodePoint(parseInt(hex, 16))
                )
                results.push({ value: raw, line: i + 1 })
            }
        }
    }
    return results
}

const files = process.argv.slice(2)
const mdxFiles = files.filter((f) => f.endsWith('.mdx'))
const tagFiles = files.filter((f) => f.endsWith('tags.ts'))
let hasError = false

for (const file of tagFiles) {
    const content = readFileSync(file, 'utf8')
    for (const { value, line } of extractPageTitles(content)) {
        const plain = stripMarkdown(value)
        for (const seg of wordSegments(plain)) {
            if (seg.length > H1_THRESHOLD) {
                console.error(
                    `${file}:${line}: pageTitle segment "${seg}" is ${seg.length} chars (max ${H1_THRESHOLD})`
                )
                hasError = true
            }
        }
    }
}

for (const file of mdxFiles) {
    const content = readFileSync(file, 'utf8')
    const lines = content.split('\n')

    // --- frontmatter → H1 ---
    // Use heroTitle if present (FrontPageLayout renders heroTitle as the visible H1,
    // while title is only used for the HTML <title> tag). Fall back to title otherwise.
    let inFrontmatter = false
    let frontmatterDone = false
    let frontmatterLineCount = 0
    let h1Text = null
    let h1Line = 0

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (i === 0 && line.trim() === '---') {
            inFrontmatter = true
            continue
        }
        if (inFrontmatter && line.trim() === '---') {
            frontmatterDone = true
            frontmatterLineCount = i
            break
        }
        if (inFrontmatter) {
            const heroM = line.match(/^heroTitle:\s*['"]?(.*?)['"]?\s*$/)
            if (heroM) {
                // heroTitle overrides title for visible H1
                h1Text = heroM[1]
                h1Line = i + 1
                continue
            }
            const titleM = line.match(/^title:\s*['"]?(.*?)['"]?\s*$/)
            if (titleM && h1Text === null) {
                h1Text = titleM[1]
                h1Line = i + 1
            }
        }
    }

    if (h1Text !== null) {
        const plain = stripMarkdown(h1Text)
        for (const seg of wordSegments(plain)) {
            if (seg.length > H1_THRESHOLD) {
                console.error(`${file}:${h1Line}: H1 word "${seg}" is ${seg.length} chars (max ${H1_THRESHOLD})`)
                hasError = true
            }
        }
    }

    // --- body: H2, H3, blockquote ---
    const bodyStart = frontmatterDone ? frontmatterLineCount + 1 : 0

    for (let i = bodyStart; i < lines.length; i++) {
        const line = lines[i]
        const lineNum = i + 1

        let text = null
        let tag = null
        let threshold = null

        if (line.startsWith('### ')) {
            text = line.slice(4)
            tag = 'H3'
            threshold = H3_THRESHOLD
        } else if (line.startsWith('## ')) {
            text = line.slice(3)
            tag = 'H2'
            threshold = H2_THRESHOLD
        } else if (line.startsWith('> ')) {
            text = line.slice(2)
            tag = 'blockquote'
            threshold = BQ_THRESHOLD
        }

        if (text === null) continue

        const plain = stripMarkdown(text)
        for (const seg of wordSegments(plain)) {
            if (seg.length > threshold) {
                console.error(`${file}:${lineNum}: ${tag} word "${seg}" is ${seg.length} chars (max ${threshold})`)
                hasError = true
            }
        }
    }
}

if (hasError) {
    console.error('\nAdd a soft hyphen (­ or \\u00AD) or a regular hyphen inside long words to fix the above.')
    process.exit(1)
}
