import type { CampaignEvent } from '../content/events'

import { describe, expect, it } from 'vitest'

import { filterUpcoming, isUpcoming } from './events'

const eventOn = (date: string): CampaignEvent => ({ date, id: date }) as CampaignEvent

describe('isUpcoming', () => {
    it('keeps a future event', () => {
        expect(isUpcoming('2026-11-30', '2026-09-15')).toBe(true)
    })

    it('keeps an event happening today', () => {
        expect(isUpcoming('2026-09-19', '2026-09-19')).toBe(true)
    })

    it('drops an event that happened yesterday', () => {
        expect(isUpcoming('2026-09-19', '2026-09-20')).toBe(false)
    })

    it('compares correctly across a month boundary', () => {
        expect(isUpcoming('2026-09-30', '2026-10-01')).toBe(false)
        expect(isUpcoming('2026-10-01', '2026-09-30')).toBe(true)
    })

    it('compares correctly across a year boundary', () => {
        expect(isUpcoming('2026-12-31', '2027-01-01')).toBe(false)
        expect(isUpcoming('2027-01-01', '2026-12-31')).toBe(true)
    })
})

describe('filterUpcoming', () => {
    const events = [eventOn('2026-09-19'), eventOn('2026-11-30')]

    it('keeps both events before either has happened', () => {
        expect(filterUpcoming(events, '2026-09-15').map((e) => e.date)).toEqual(['2026-09-19', '2026-11-30'])
    })

    it('keeps an event on its own day', () => {
        expect(filterUpcoming(events, '2026-09-19').map((e) => e.date)).toEqual(['2026-09-19', '2026-11-30'])
    })

    it('drops an event the day after it happened', () => {
        expect(filterUpcoming(events, '2026-09-20').map((e) => e.date)).toEqual(['2026-11-30'])
    })

    it('returns an empty list once every event has passed', () => {
        expect(filterUpcoming(events, '2026-12-01')).toEqual([])
    })

    it('returns an empty list for an empty input', () => {
        expect(filterUpcoming([], '2026-09-15')).toEqual([])
    })
})
