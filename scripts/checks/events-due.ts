/**
 * events-due.ts
 *
 * The mirror image of publish-due.ts: finds campaign events whose date has passed
 * (Europe/Helsinki) but which are still rendered on the live campaign pages — i.e.
 * a stale deploy that needs rebuilding. The build itself does the hiding (see
 * filterUpcoming in src/lib/events.ts); this only decides whether a build is owed.
 *
 * Self-healing and stateless: it compares intent against the live site rather than
 * against a stored timestamp, so a missed nightly run is caught by the next one and
 * it stops firing as soon as the deploy that removed the event is live.
 *
 * Exit codes (consumed by scheduled-publish.yml):
 *   0 — nothing to do: no event has passed, or the live site is already without them
 *   1 — deploy due: an expired event is still on the live site
 *   2 — fetch error
 */

import { fileURLToPath } from 'node:url'

/* eslint-disable import-x/extensions -- node --experimental-strip-types needs explicit extensions */
import { type CampaignEvent, campaignEvents } from '../../src/content/events.ts'
import { isUpcoming } from '../../src/lib/events.ts'
import { helsinkiDateOf } from '../../src/lib/publishing.ts'
/* eslint-enable import-x/extensions */

/** The campaign page in each language — the only pages that render the calendar. */
export const CAMPAIGN_PATHS = ['/fi/eduskuntavaalit/', '/sv/riksdagsvalet/', '/en/elections/'] as const

export function collectExpiredEvents(events: CampaignEvent[], today: string): CampaignEvent[] {
    return events.filter((event) => !isUpcoming(event.date, today))
}

/**
 * Which expired events a page still renders. The marker is the data-event-id
 * attribute EventCalendar.astro puts on every list item.
 */
export function findStillLive(expired: CampaignEvent[], html: string): CampaignEvent[] {
    return expired.filter((event) => html.includes(`data-event-id="${event.id}"`))
}

const fetchText = async (url: string): Promise<string> => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`)

    return res.text()
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url)
if (isMain) {
    const siteUrl = process.argv[2] ?? 'https://lavanti.fi'
    const today = helsinkiDateOf(new Date())
    const expired = collectExpiredEvents(campaignEvents, today)

    if (expired.length === 0) {
        process.stdout.write('Nothing to expire: every campaign event is still upcoming.\n')
        process.exit(0)
    }

    try {
        const stale = new Map<string, string[]>()
        for (const path of CAMPAIGN_PATHS) {
            const html = await fetchText(new URL(path, siteUrl).href)
            findStillLive(expired, html).forEach(({ id }) => stale.set(id, [...(stale.get(id) ?? []), path]))
        }

        if (stale.size === 0) {
            process.stdout.write(`Nothing to do: ${expired.length} expired event(s) are already off the live site.\n`)
            process.exit(0)
        }

        process.stdout.write(`Expired events still live (${stale.size}):\n`)
        for (const [id, paths] of stale) {
            process.stdout.write(`  ${id}  (${paths.join(', ')})\n`)
        }
        process.exit(1)
    } catch (error) {
        process.stderr.write(`events-due: live-page check failed: ${String(error)}\n`)
        process.exit(2)
    }
}
