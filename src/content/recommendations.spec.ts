import { describe, expect, it } from 'vitest'

import { recommendations } from './recommendations'

describe('recommendations data', () => {
    it('should export a non-empty array', () => {
        expect(recommendations.length).toBeGreaterThan(0)
    })

    it('every entry should have a string image field', () => {
        for (const c of recommendations) {
            expect(typeof c.image).toBe('string')
        }
    })

    it('every entry should have a non-empty name', () => {
        for (const c of recommendations) {
            expect(c.name).toBeTruthy()
        }
    })

    it('every entry should have a string recommendation field', () => {
        for (const c of recommendations) {
            expect(typeof c.recommendation).toBe('string')
        }
    })

    it('every entry with an image should have non-empty alt in all locales', () => {
        for (const c of recommendations.filter((r) => r.image)) {
            expect(c.locales.fi.alt).toBeTruthy()
            expect(c.locales.sv.alt).toBeTruthy()
            expect(c.locales.en.alt).toBeTruthy()
        }
    })

    it('every entry should have non-empty title in all locales', () => {
        for (const c of recommendations) {
            expect(c.locales.fi.title).toBeTruthy()
            expect(c.locales.sv.title).toBeTruthy()
            expect(c.locales.en.title).toBeTruthy()
        }
    })
})
