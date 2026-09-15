import { afterEach, describe, expect, it, vi } from 'vitest'

import { campaignEvents } from '../content/events'
import { filterUpcoming } from './events'
import { helsinkiDateOf } from './publishing'
import { visibleCampaignEvents } from './visibleEvents'

describe('visibleCampaignEvents', () => {
    afterEach(() => {
        vi.unstubAllEnvs()
        vi.useRealTimers()
    })

    it('keeps every event in dev so a past one stays previewable', () => {
        vi.stubEnv('DEV', true)
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2099-01-01T12:00:00Z'))

        expect(visibleCampaignEvents()).toEqual(campaignEvents)
    })

    it('drops events that have already happened in a production build', () => {
        vi.stubEnv('DEV', false)
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2099-01-01T12:00:00Z'))

        expect(visibleCampaignEvents()).toEqual([])
    })

    it('agrees with filterUpcoming for the current date', () => {
        vi.stubEnv('DEV', false)

        expect(visibleCampaignEvents()).toEqual(filterUpcoming(campaignEvents, helsinkiDateOf(new Date())))
    })
})
