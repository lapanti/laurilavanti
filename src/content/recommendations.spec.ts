import { describe, expect, it } from 'vitest'

import { recommendations } from './recommendations'

describe('recommendations data', () => {
    it('should export a non-empty array', () => {
        expect(recommendations.length).toBeGreaterThan(0)
    })

    it('every entry should have a non-empty image', () => {
        for (const c of recommendations) {
            expect(c.image).toBeTruthy()
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

    it('every entry should have non-empty alt in all locales', () => {
        for (const c of recommendations) {
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
