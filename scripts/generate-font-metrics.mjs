#!/usr/bin/env node
// Measures Big Shoulders Display glyph metrics in headless Chromium (Playwright)
// and writes them as a JSON table for scripts/check-overflow.mjs.
//
// Measured at weight 900 for the characters that can appear in a rendered
// title/name segment. Both checked surfaces (topic heading, hero H1) render
// text-transform: uppercase, so only uppercase forms, digits and punctuation
// are tabulated. Two tables:
//   advances — per-glyph advance width in em (canvas measureText)
//   kerning  — per-pair adjustment in em (measureText(ab) − a − b), nonzero only;
//              kerning is significant here (e.g. DIGITALISATION kerns 8px
//              narrower than its advance sum at 88px)
//
// Also measures a set of real content segments end-to-end (DOM spans with
// letter-spacing −0.02em, the spacing both surfaces use) into a validation
// fixture used by scripts/check-overflow.spec.ts to pin the estimator against
// browser-rendered widths.
//
// Outputs (both committed):
//   scripts/font-metrics.json
//   scripts/checks/fixtures/font-metrics-validation.json
//
// Regenerate with: npm run generate:font-metrics
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// Same subsets and unicode-ranges as GlobalStyle.astro — without the ranges the
// two faces shadow each other and the wrong file serves basic latin.
const FONT_FACES = [
    {
        file: 'public/fonts/big-shoulders-display-v24-latin.woff2',
        unicodeRange:
            'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
    {
        file: 'public/fonts/big-shoulders-display-v24-latin-ext.woff2',
        unicodeRange:
            'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
]

// Every character that may appear in an uppercase-rendered segment. The plain
// hyphen is included because check-overflow appends its advance to segments
// that break at a soft hyphen (the browser paints "-" at the break).
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '0123456789' + 'ÅÄÖÉÜ' + "!?.,:;'’”()&%€+/|…-"

// Real segments from src/content/tags and post titles, measured at the topic
// heading size (88px) and the mobile hero size (52px). Mix of the tightest
// currently-passing names (KIRKKONUMMI ≈460px in the 464px column),
// known #1419 offenders without their soft hyphens, and diacritics.
const SAMPLES = [
    { fontPx: 88, text: 'KIRKKONUMMI' },
    { fontPx: 88, text: 'DIGITALISATION' },
    { fontPx: 88, text: 'TURVALLISUUS' },
    { fontPx: 88, text: 'KYRKSLÄTT' },
    { fontPx: 88, text: 'INFRASTRUKTUR' },
    { fontPx: 88, text: 'YKSITYISYYDENSUOJA' },
    { fontPx: 88, text: 'GRUNDLÄGGANDE' },
    { fontPx: 88, text: 'SJÄLVSTÄNDIGHET' },
    { fontPx: 88, text: 'MARKKINAVIHREÄ' },
    { fontPx: 88, text: 'KOMMUNALVAL' },
    { fontPx: 88, text: 'ARTIFICIELL' },
    { fontPx: 88, text: 'INTELLIGENS' },
    { fontPx: 88, text: 'DIGITAALINEN' },
    { fontPx: 88, text: 'ITSENÄISYYS' },
    { fontPx: 88, text: 'TEKOÄLY' },
    { fontPx: 88, text: 'VÄSTBANAN' },
    { fontPx: 88, text: 'IMMIGRATION' },
    { fontPx: 88, text: 'LUONTO' },
    // Trailing hyphen as rendered when a word breaks at a soft hyphen
    { fontPx: 88, text: 'KOMMU-' },
    { fontPx: 88, text: 'YKSITYI-' },
    // Mobile hero size — confirms the estimator scales linearly with fontPx
    { fontPx: 52, text: 'KIRKKONUMMI' },
    { fontPx: 52, text: 'YKSITYISYYDENSUOJA' },
]

const LETTER_SPACING_EM = -0.02
const MEASURE_PX = 100

const fontFaces = FONT_FACES.map(({ file, unicodeRange }) => {
    const base64 = readFileSync(join(root, file)).toString('base64')
    return `@font-face {
        font-family: 'Big Shoulders Display';
        font-style: normal;
        font-weight: 100 900;
        src: url(data:font/woff2;base64,${base64}) format('woff2');
        unicode-range: ${unicodeRange};
    }`
}).join('\n')

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setContent(`<!doctype html><html><head><style>${fontFaces}</style></head><body></body></html>`)

const { advances, kerning, samples } = await page.evaluate(
    async ({ charset, letterSpacingEm, measurePx, sampleList }) => {
        const font = `900 ${measurePx}px 'Big Shoulders Display'`
        await document.fonts.load(font, charset)
        await document.fonts.ready

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        ctx.font = font

        const em = (px) => Math.round((px / measurePx) * 10000) / 10000

        const advances = {}
        for (const ch of charset) {
            advances[ch] = em(ctx.measureText(ch).width)
        }

        const kerning = {}
        for (const a of charset) {
            for (const b of charset) {
                const adj = em(ctx.measureText(a + b).width - ctx.measureText(a).width - ctx.measureText(b).width)
                if (adj !== 0) kerning[a + b] = adj
            }
        }

        const samples = []
        for (const { fontPx, text } of sampleList) {
            const span = document.createElement('span')
            span.style.fontFamily = "'Big Shoulders Display'"
            span.style.fontWeight = '900'
            span.style.fontSize = `${fontPx}px`
            span.style.letterSpacing = `${letterSpacingEm}em`
            span.style.whiteSpace = 'pre'
            span.style.position = 'absolute'
            span.textContent = text
            document.body.appendChild(span)
            const widthPx = Math.round(span.getBoundingClientRect().width * 100) / 100
            samples.push({ fontPx, text, widthPx })
            span.remove()
        }

        return { advances, kerning, samples }
    },
    { charset: CHARSET, letterSpacingEm: LETTER_SPACING_EM, measurePx: MEASURE_PX, sampleList: SAMPLES }
)

await browser.close()

const metrics = {
    command: 'npm run generate:font-metrics',
    font: 'Big Shoulders Display',
    fontWeight: 900,
    source: FONT_FACES.map(({ file }) => file),
    advances,
    kerning,
}

const fixture = {
    command: 'npm run generate:font-metrics',
    letterSpacingEm: LETTER_SPACING_EM,
    samples,
}

writeFileSync(join(root, 'scripts/font-metrics.json'), JSON.stringify(metrics, null, 4) + '\n')
writeFileSync(
    join(root, 'scripts/checks/fixtures/font-metrics-validation.json'),
    JSON.stringify(fixture, null, 4) + '\n'
)

console.log(
    `Measured ${Object.keys(advances).length} glyphs, ${Object.keys(kerning).length} kern pairs, ${samples.length} sample segments.`
)
