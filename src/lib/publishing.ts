/**
 * Publish-date helpers for scheduled publishing.
 *
 * Posts merged with a future publishDate are excluded from non-dev builds
 * until their date arrives in Europe/Helsinki (see loadAllPosts in posts.ts);
 * the nightly scheduled-publish workflow then triggers the deploy.
 *
 * Kept free of astro:content so both Vite-processed code (posts.ts) and
 * plain-Node check scripts (scripts/checks/publish-due.ts) can import it.
 */

export const helsinkiDateOf = (date: Date): string =>
    // en-CA formats as YYYY-MM-DD, matching the publishDate schema.
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Helsinki' }).format(date)

// Plain string comparison is correct: publishDate is regex-enforced YYYY-MM-DD.
export const isPublishedBy = (publishDate: string, today: string): boolean => publishDate <= today
