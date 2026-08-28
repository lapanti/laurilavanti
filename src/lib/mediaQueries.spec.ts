import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { breakpoints } from './styles'

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

describe('media query breakpoints', () => {
    it('every @media px value in src/**/*.astro is a sanctioned breakpoint on the right side', () => {
        /*
         * Direction matters: a min-side value in a max-width query (e.g. max-width: 1200px)
         * overlaps the min-width: 1200px rules at exactly that viewport — both apply.
         */
        const minSide = new Set<number>([breakpoints.desktop, breakpoints.tablet, breakpoints.wide])
        const maxSide = new Set<number>([
            breakpoints.desktopMax,
            breakpoints.phoneSmall,
            breakpoints.phoneSmallLegacy,
            breakpoints.tabletMax,
            breakpoints.wideMax,
        ])
        const scanFile = (file: string): string[] => {
            const css = readFileSync(file, 'utf8')
            const found: string[] = []
            for (const media of css.matchAll(/@media[^{]*/g)) {
                for (const px of media[0].matchAll(/\b(min|max)-width:\s*(\d+)px/g)) {
                    const allowed = px[1] === 'min' ? minSide : maxSide
                    if (!allowed.has(Number(px[2]))) found.push(`${file.slice(SRC.length + 1)}: ${media[0].trim()}`)
                }
            }
            return found
        }

        expect(collectAstroFiles(SRC).flatMap(scanFile)).toEqual([])
    })

    it('boundary pairs are adjacent (max side is min side minus one)', () => {
        expect(breakpoints.tabletMax).toBe(breakpoints.tablet - 1)
        expect(breakpoints.wideMax).toBe(breakpoints.wide - 1)
        expect(breakpoints.desktopMax).toBe(breakpoints.desktop - 1)
    })
})
