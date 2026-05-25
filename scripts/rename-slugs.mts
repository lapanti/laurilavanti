/**
 * One-time rename of 10 image slugs for SEO.
 * Renames: originals files, processed dirs, MDX frontmatter references.
 *
 * Usage: npx tsx scripts/rename-slugs.mts
 */

import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const ORIGINALS_DIR = path.join(REPO_ROOT, 'src', 'images', 'originals')
const PROCESSED_DIR = path.join(REPO_ROOT, 'src', 'images', 'processed')
const PAGES_DIR = path.join(REPO_ROOT, 'src', 'pages')

const RENAMES: Record<string, string> = {
    'Kirkkonummi_051': 'Kirkkonummi-kartanon-piha-syksylla',
    'Kirkkonummi_061': 'Kirkkonummi-kartanon-puutarha',
    'Kirkkonummi_062': 'punainen-talo-kirkkonummella-syksylla',
    'Kirkkonummi_092': 'Kirkkonummi-kartanon-silta-iltavalossa',
    'Kirkkonummi_128': 'juoksija-Kirkkonummen-metsassa-jarven-rannalla',
    'Kirkkonummi_130': 'Kirkkonummi-jarvimaisema-mantymetsa',
    'Kirkkonummi-wohls': 'Kirkkonummen-wohls-puistokaytava-ja-jarvi',
    'Lauri-Lavanti-21-9': 'Lauri-Lavanti-kadet-puuskassa-ulkona',
    'Lauri-Lavanti-aluevaaliehdokas-16-9': 'Lauri-Lavanti-aluevaaliehdokas-pellolla',
    'sermi-jonka-takana-huone': 'japanilainen-tilanjakaja-huoneessa',
}

async function renameOriginal(oldSlug: string, newSlug: string) {
    for (const ext of ['.jpg', '.jpeg', '.png', '.webp']) {
        const src = path.join(ORIGINALS_DIR, `${oldSlug}${ext}`)
        try {
            await fs.access(src)
            const dest = path.join(ORIGINALS_DIR, `${newSlug}${ext}`)
            await fs.rename(src, dest)
            console.log(`  original: ${oldSlug}${ext} → ${newSlug}${ext}`)
            return
        } catch {
            // try next extension
        }
    }
    console.log(`  original: ${oldSlug} — not found locally (skipped)`)
}

async function renameProcessed(oldSlug: string, newSlug: string) {
    const src = path.join(PROCESSED_DIR, oldSlug)
    const dest = path.join(PROCESSED_DIR, newSlug)
    try {
        await fs.access(src)
        await fs.rename(src, dest)
        console.log(`  processed: ${oldSlug}/ → ${newSlug}/`)
    } catch {
        console.log(`  processed: ${oldSlug}/ — not found (skipped)`)
    }
}

async function renameMdxRefs(oldSlug: string, newSlug: string): Promise<number> {
    let count = 0
    const walk = async (dir: string) => {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        for (const entry of entries) {
            const full = path.join(dir, entry.name)
            if (entry.isDirectory()) {
                await walk(full)
            } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.ts') || entry.name.endsWith('.astro')) {
                const content = await fs.readFile(full, 'utf8')
                // Match slug as a whole word in frontmatter values and TS string literals
                // e.g. heroImage: Kirkkonummi_051 or heroImage: 'Kirkkonummi_051'
                const escaped = oldSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                const re = new RegExp(`(:\\s*'?)${escaped}('?)`, 'g')
                if (re.test(content)) {
                    const updated = content.replace(re, `$1${newSlug}$2`)
                    await fs.writeFile(full, updated)
                    console.log(`  mdx/ts: ${path.relative(REPO_ROOT, full)}`)
                    count++
                }
            }
        }
    }
    await walk(PAGES_DIR)
    // Also check src/content and src/lib for TS files referencing slugs
    for (const dir of ['src/content', 'src/lib', 'scripts']) {
        const d = path.join(REPO_ROOT, dir)
        try { await walk(d) } catch { /* dir may not exist */ }
    }
    return count
}

async function main() {
    for (const [oldSlug, newSlug] of Object.entries(RENAMES)) {
        console.log(`\n${oldSlug} → ${newSlug}`)
        await renameOriginal(oldSlug, newSlug)
        await renameProcessed(oldSlug, newSlug)
        await renameMdxRefs(oldSlug, newSlug)
    }
    console.log('\nDone.')
}

main().catch(err => { console.error(err); process.exit(1) })
