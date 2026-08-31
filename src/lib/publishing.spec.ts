import { describe, expect, it } from 'vitest'

import { helsinkiDateOf, isPublishedBy } from './publishing'

describe('helsinkiDateOf', () => {
    it('formats as YYYY-MM-DD', () => {
        expect(helsinkiDateOf(new Date('2026-08-31T12:00:00Z'))).toBe('2026-08-31')
    })

    it('rolls to the next day at Helsinki midnight in winter (EET, UTC+2)', () => {
        expect(helsinkiDateOf(new Date('2026-01-15T21:59:59Z'))).toBe('2026-01-15')
        expect(helsinkiDateOf(new Date('2026-01-15T22:00:00Z'))).toBe('2026-01-16')
    })

    it('rolls to the next day at Helsinki midnight in summer (EEST, UTC+3)', () => {
        expect(helsinkiDateOf(new Date('2026-06-15T20:59:59Z'))).toBe('2026-06-15')
        expect(helsinkiDateOf(new Date('2026-06-15T21:00:00Z'))).toBe('2026-06-16')
    })
})

describe('isPublishedBy', () => {
    it('includes past publish dates', () => {
        expect(isPublishedBy('2026-08-30', '2026-08-31')).toBe(true)
    })

    it('includes posts published today', () => {
        expect(isPublishedBy('2026-08-31', '2026-08-31')).toBe(true)
    })

    it('excludes future publish dates', () => {
        expect(isPublishedBy('2026-09-01', '2026-08-31')).toBe(false)
    })

    it('compares across month and year boundaries', () => {
        expect(isPublishedBy('2025-12-31', '2026-01-01')).toBe(true)
        expect(isPublishedBy('2026-10-01', '2026-09-30')).toBe(false)
    })
})
