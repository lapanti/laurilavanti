import type { Lang } from './nav'

/**
 * Per-locale RSS feed titles — single source for the feed itself
 * ([lang]/rss.xml.ts) and the autodiscovery link (Head.astro), which must match.
 */
export const rssTitles: Record<Lang, string> = {
    en: 'Lauri Lavanti – blog',
    fi: 'Lauri Lavanti – blogi',
    sv: 'Lauri Lavanti – blogg',
}
