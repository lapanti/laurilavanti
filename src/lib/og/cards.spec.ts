import { describe, expect, it } from 'vitest'

import { cleanCardText } from './cards'

describe('cleanCardText', () => {
    it('strips soft hyphens authored for on-page hyphenation', () => {
        expect(cleanCardText('Tieto­suoja­seloste')).toBe('Tietosuojaseloste')
    })

    it('collapses whitespace and trims', () => {
        expect(cleanCardText('  Koska talouden   tulee\npalvella  ')).toBe('Koska talouden tulee palvella')
    })
})
