import type { CampaignEvent } from '../content/events'

import { describe, expect, it } from 'vitest'

import { eventDateTimeAttribute, formatEventDate, formatEventTime, toHelsinkiIso } from './eventDate'

const timed = { date: '2026-09-19', endTime: '17:00', startTime: '15:00' } as CampaignEvent
const startOnly = { date: '2026-09-19', startTime: '15:00' } as CampaignEvent
const undated = { date: '2026-11-30' } as CampaignEvent

describe('formatEventDate', () => {
    it('names the weekday in Finnish', () => {
        expect(formatEventDate('2026-09-19', 'fi')).toBe('lauantaina 19. syyskuuta 2026')
    })

    it('names the weekday in Swedish', () => {
        expect(formatEventDate('2026-09-19', 'sv')).toBe('lördag 19 september 2026')
    })

    it('names the weekday in English', () => {
        expect(formatEventDate('2026-09-19', 'en')).toBe('Saturday, 19 September 2026')
    })

    it('formats a winter date', () => {
        expect(formatEventDate('2026-11-30', 'fi')).toBe('maanantaina 30. marraskuuta 2026')
        expect(formatEventDate('2026-11-30', 'en')).toBe('Monday, 30 November 2026')
    })

    it('keeps the calendar date whatever the runtime zone is', () => {
        /*
         * Without timeZone: 'UTC' this renders the previous day west of Greenwich —
         * the date string parses as UTC midnight but formats in the runtime's zone.
         */
        const original = process.env.TZ

        process.env.TZ = 'America/New_York'
        expect(formatEventDate('2026-09-19', 'fi')).toBe('lauantaina 19. syyskuuta 2026')

        process.env.TZ = 'Pacific/Kiritimati'
        expect(formatEventDate('2026-11-30', 'fi')).toBe('maanantaina 30. marraskuuta 2026')

        process.env.TZ = original
    })
})

describe('formatEventTime', () => {
    it('renders a Finnish time range', () => {
        expect(formatEventTime(timed, 'fi')).toBe('klo 15–17')
    })

    it('renders a Swedish time range', () => {
        expect(formatEventTime(timed, 'sv')).toBe('kl. 15–17')
    })

    it('keeps the full clock time in English', () => {
        expect(formatEventTime(timed, 'en')).toBe('15:00–17:00')
    })

    it('renders a start time alone when there is no end time', () => {
        expect(formatEventTime(startOnly, 'fi')).toBe('klo 15')
        expect(formatEventTime(startOnly, 'en')).toBe('15:00')
    })

    it('keeps minutes that are not on the hour', () => {
        expect(
            formatEventTime({ date: '2026-09-19', endTime: '19:00', startTime: '17:30' } as CampaignEvent, 'fi')
        ).toBe('klo 17.30–19')
    })

    it('returns undefined while the schedule is still open', () => {
        expect(formatEventTime(undated, 'fi')).toBeUndefined()
    })
})

describe('eventDateTimeAttribute', () => {
    it('includes the start time when the event has one', () => {
        expect(eventDateTimeAttribute(timed)).toBe('2026-09-19T15:00')
    })

    it('falls back to the calendar date while the schedule is open', () => {
        expect(eventDateTimeAttribute(undated)).toBe('2026-11-30')
    })
})

describe('toHelsinkiIso', () => {
    it('uses the summer offset during EEST', () => {
        expect(toHelsinkiIso('2026-09-19', '15:00')).toBe('2026-09-19T15:00:00+03:00')
    })

    it('uses the winter offset during EET', () => {
        expect(toHelsinkiIso('2026-11-30', '15:00')).toBe('2026-11-30T15:00:00+02:00')
    })

    it('switches offset across the autumn DST boundary', () => {
        expect(toHelsinkiIso('2026-10-24', '15:00')).toBe('2026-10-24T15:00:00+03:00')
        expect(toHelsinkiIso('2026-10-26', '15:00')).toBe('2026-10-26T15:00:00+02:00')
    })

    it('returns the plain calendar date when there is no time', () => {
        expect(toHelsinkiIso('2026-11-30')).toBe('2026-11-30')
    })
})
