import { existsSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { describe, expect, it } from 'vitest'

import { cleanCardText, HERO_PORTRAITS } from './cards'

describe('cleanCardText', () => {
    it('strips soft hyphens authored for on-page hyphenation', () => {
        expect(cleanCardText('Tieto­suoja­seloste')).toBe('Tietosuojaseloste')
    })

    it('collapses whitespace and trims', () => {
        expect(cleanCardText('  Koska talouden   tulee\npalvella  ')).toBe('Koska talouden tulee palvella')
    })
})

describe('HERO_PORTRAITS', () => {
    /*
     * render.ts readFileSync's these by name at build time, so a map entry pointing at a
     * missing file fails the whole OG endpoint rather than falling back to the default
     * portrait. Nothing else checks the two sides stay in step.
     */
    it('points every hero slug at a committed asset', () => {
        const assets = join(process.cwd(), 'src/lib/og/assets')
        const missing = Object.values(HERO_PORTRAITS).filter((photo) => !existsSync(join(assets, photo)))

        expect(missing).toEqual([])
    })

    it('gives each hero slug its own portrait', () => {
        const photos = Object.values(HERO_PORTRAITS)

        expect(new Set(photos).size).toBe(photos.length)
    })
})
