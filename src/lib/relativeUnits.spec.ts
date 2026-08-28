import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const SRC = join(__dirname, '..')

function collectAstroFiles(dir: string): string[] {
    const files: string[] = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name)
        if (entry.isDirectory()) files.push(...collectAstroFiles(full))
        else if (entry.name.endsWith('.astro')) files.push(full)
    }
    return files
}

describe('relative units (WCAG 1.4.8 — SiteImprove sia-r74/sia-r80)', () => {
    it('no px font-size or line-height in src/**/*.astro', () => {
        const scanFile = (file: string): string[] =>
            [...readFileSync(file, 'utf8').matchAll(/\b(font-size|line-height):\s*[0-9.]+px/g)].map(
                (m) => `${file.slice(SRC.length + 1)}: ${m[0]}`
            )

        expect(collectAstroFiles(SRC).flatMap(scanFile)).toEqual([])
    })
})
