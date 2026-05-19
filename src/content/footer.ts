import type { Lang } from './nav'

interface FooterLink {
    icon: string
    title: string
    url: string
}

export const footerLinks: FooterLink[] = [
    { icon: 'fa7-brands:mastodon', title: 'Mastodon', url: 'https://mastodon.social/@laurilavanti' },
    { icon: 'fa7-brands:bluesky', title: 'Bluesky', url: 'https://bsky.app/profile/laurilavanti.fi' },
    { icon: 'fa7-brands:threads', title: 'Threads', url: 'https://www.threads.com/@laurilavanti' },
    { icon: 'fa7-brands:linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com/in/laurilavanti/' },
    { icon: 'instagram', title: 'Instagram', url: 'https://www.instagram.com/laurilavanti/' },
    { icon: 'fa7-brands:facebook', title: 'Facebook', url: 'https://www.facebook.com/laurilavanti' },
    { icon: 'tiktok', title: 'TikTok', url: 'https://www.tiktok.com/@laurilavanti' },
]

export const footerRssAriaLabel: Record<Lang, string> = {
    en: "Subscribe to Lauri Lavanti's RSS feed (opens in new tab)",
    fi: 'Tilaa Lauri Lavantin RSS-syöte (linkki aukeaa uudessa välilehdessä)',
    sv: 'Prenumerera på Lauri Lavantis RSS-flöde (öppnas i ny flik)',
}

export const footerAriaLabel: Record<Lang, (title: string) => string> = {
    en: (title) => `Lauri Lavanti on ${title} (opens in new tab)`,
    fi: (title) => `Lauri Lavanti palvelussa ${title} (linkki aukeaa uudessa välilehdessä)`,
    sv: (title) => `Lauri Lavanti på ${title} (öppnas i ny flik)`,
}

export const footerLogoAlt: Record<Lang, string> = {
    en: 'The Greens logo and text',
    fi: 'Vihreiden logo ja teksti',
    sv: 'De Gröna logotyp och text',
}
