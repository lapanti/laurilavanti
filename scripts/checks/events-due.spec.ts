import type { CampaignEvent } from '../../src/content/events'

import { describe, expect, it } from 'vitest'

import { collectExpiredEvents, findStillLive } from './events-due'

const eventOn = (date: string, id: string): CampaignEvent => ({ date, id }) as CampaignEvent

const events = [eventOn('2026-09-19', 'kickoff'), eventOn('2026-11-30', 'fyyri')]

describe('collectExpiredEvents', () => {
    it('returns nothing while every event is still ahead', () => {
        expect(collectExpiredEvents(events, '2026-09-15')).toEqual([])
    })

    it('does not expire an event on its own day', () => {
        expect(collectExpiredEvents(events, '2026-09-19')).toEqual([])
    })

    it('expires an event the day after it happened', () => {
        expect(collectExpiredEvents(events, '2026-09-20').map((e) => e.id)).toEqual(['kickoff'])
    })

    it('expires every past event', () => {
        expect(collectExpiredEvents(events, '2026-12-01').map((e) => e.id)).toEqual(['kickoff', 'fyyri'])
    })
})

describe('findStillLive', () => {
    const expired = [eventOn('2026-09-19', 'kickoff')]

    it('flags an expired event that the live page still renders', () => {
        const html = '<ol><li data-event-id="kickoff">…</li></ol>'

        expect(findStillLive(expired, html).map((e) => e.id)).toEqual(['kickoff'])
    })

    it('returns nothing once the live page no longer renders it', () => {
        const html = '<ol><li data-event-id="fyyri">…</li></ol>'

        expect(findStillLive(expired, html)).toEqual([])
    })

    it('does not match a different id that shares a prefix', () => {
        const html = '<li data-event-id="kickoff-2">…</li>'

        expect(findStillLive(expired, html)).toEqual([])
    })

    it('returns nothing for a page with no calendar at all', () => {
        expect(findStillLive(expired, '<main><p>No events here.</p></main>')).toEqual([])
    })
})
