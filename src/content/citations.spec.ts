import { describe, expect, it } from 'vitest'

import { citations } from './citations'

describe('citations data', () => {
    it('should export a non-empty array', () => {
        expect(citations.length).toBeGreaterThan(0)
    })

    it('every entry should have a non-empty image', () => {
        for (const c of citations) {
            expect(c.image).toBeTruthy()
        }
    })

    it('every entry should have a non-empty name', () => {
        for (const c of citations) {
            expect(c.name).toBeTruthy()
        }
    })

    it('every entry should have a string citation field', () => {
        for (const c of citations) {
            expect(typeof c.citation).toBe('string')
        }
    })

    it('every entry should have non-empty alt in all locales', () => {
        for (const c of citations) {
            expect(c.locales.fi.alt).toBeTruthy()
            expect(c.locales.sv.alt).toBeTruthy()
            expect(c.locales.en.alt).toBeTruthy()
        }
    })

    it('every entry should have non-empty title in all locales', () => {
        for (const c of citations) {
            expect(c.locales.fi.title).toBeTruthy()
            expect(c.locales.sv.title).toBeTruthy()
            expect(c.locales.en.title).toBeTruthy()
        }
    })
})
