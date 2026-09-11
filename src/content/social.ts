/**
 * The one list of Lauri's social profiles.
 *
 * Four surfaces used to enumerate these independently and had drifted apart:
 * the footer icon row, the schema.org `sameAs` array, the contact-page chips and
 * the about-page chips. Reddit reached only the about pages, so search engines
 * never learned the profile existed. Everything now derives from this array, so
 * adding a profile is one edit and the surfaces cannot disagree again.
 *
 * The site's RSS feed is deliberately absent: it is a feed affordance offered in
 * the footer and on the contact pages, not a profile identifying the person, so
 * it does not belong in `sameAs`. Those pages append their own localised chip.
 */

export interface SocialProfile {
    /**
     * astro-icon name for the footer row, or one of the bare keys Footer.astro
     * maps to a hand-drawn SVG (Instagram's gradient, TikTok's layered glyph).
     * Only read when `footer` is true.
     */
    icon?: string
    /** Shown as the chip label and interpolated into the footer aria-label. */
    title: string
    url: string
    /** Whether the profile earns an icon in the footer row. */
    footer: boolean
}

export const socialProfiles: SocialProfile[] = [
    { footer: true, icon: 'fa7-brands:mastodon', title: 'Mastodon', url: 'https://mastodon.social/@laurilavanti' },
    { footer: true, icon: 'fa7-brands:bluesky', title: 'Bluesky', url: 'https://bsky.app/profile/lauri.lavanti.fi' },
    { footer: true, icon: 'fa7-brands:threads', title: 'Threads', url: 'https://www.threads.com/@laurilavanti' },
    { footer: true, icon: 'fa7-brands:youtube', title: 'YouTube', url: 'https://www.youtube.com/@laurilavanti' },
    { footer: true, icon: 'fa7-brands:linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com/in/laurilavanti/' },
    { footer: true, icon: 'instagram', title: 'Instagram', url: 'https://www.instagram.com/laurilavanti/' },
    { footer: true, icon: 'fa7-brands:facebook', title: 'Facebook', url: 'https://www.facebook.com/laurilavanti' },
    { footer: true, icon: 'tiktok', title: 'TikTok', url: 'https://www.tiktok.com/@laurilavanti' },
    // Kept out of the footer row by choice — the icon row is already nine wide.
    { footer: false, title: 'Reddit', url: 'https://www.reddit.com/user/laurilavanti/' },
]

/** Every profile, as Chips items. Contact pages append their localised RSS chip. */
export const socialChips: Array<{ href: string; label: string }> = socialProfiles.map(({ title, url }) => ({
    href: url,
    label: title,
}))

/** Every profile URL, for the schema.org `sameAs` array. */
export const socialUrls: string[] = socialProfiles.map(({ url }) => url)
