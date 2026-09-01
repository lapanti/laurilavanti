import { describe, expect, it } from 'vitest'

import { stripSoftHyphens } from './text'

describe('stripSoftHyphens', () => {
    it('removes a single soft hyphen', () => {
        expect(stripSoftHyphens('Valtuusto­aloite')).toBe('Valtuustoaloite')
    })

    it('removes every soft hyphen in a string', () => {
        expect(stripSoftHyphens('Yksityisyy­den­suoja')).toBe('Yksityisyydensuoja')
    })

    it('leaves regular hyphens and dashes untouched', () => {
        expect(stripSoftHyphens('Tasa-arvo — ja yhdenvertaisuus')).toBe('Tasa-arvo — ja yhdenvertaisuus')
    })

    it('returns strings without soft hyphens unchanged', () => {
        expect(stripSoftHyphens('Kirkkonummi')).toBe('Kirkkonummi')
    })
})
