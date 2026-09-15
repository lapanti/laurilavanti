/**
 * The campaign events a build should show, resolved once and shared by the layout
 * (which emits the Event JSON-LD) and the page bodies (which render the section) —
 * so the structured data and the visible list can never disagree.
 *
 * Dev keeps past events so they stay previewable, mirroring how loadAllPosts treats
 * future-dated posts. A static build goes stale, so the nightly scheduled-publish
 * workflow redeploys once an event has passed — see scripts/checks/events-due.ts.
 */

import type { CampaignEvent } from '../content/events'

import { campaignEvents } from '../content/events'
import { filterUpcoming } from './events'
import { helsinkiDateOf } from './publishing'

export const visibleCampaignEvents = (): CampaignEvent[] =>
    import.meta.env.DEV ? campaignEvents : filterUpcoming(campaignEvents, helsinkiDateOf(new Date()))
