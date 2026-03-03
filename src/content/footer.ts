import type { Lang } from './nav'

interface FooterLink {
    icon: string
    title: string
    url: string
}

export const footerLinks: FooterLink[] = [
    { icon: 'bluesky', title: 'Bluesky', url: 'https://bsky.app/profile/laurilavanti.fi' },
    { icon: 'facebook', title: 'Facebook', url: 'https://www.facebook.com/laurilavanti' },
    { icon: 'instagram', title: 'Instagram', url: 'https://www.instagram.com/laurilavanti/' },
    { icon: 'linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com/in/laurilavanti/' },
    { icon: 'mastodon', title: 'Mastodon', url: 'https://mastodontti.fi/@laurilavanti' },
    { icon: 'threads', title: 'Threads', url: 'https://www.threads.com/@laurilavanti' },
    { icon: 'tiktok', title: 'TikTok', url: 'https://www.tiktok.com/@laurilavanti' },
]

export const footerAriaLabel: Record<Lang, (title: string) => string> = {
    en: (title) => `Lauri Lavanti on ${title} (opens in new tab)`,
    fi: (title) => `Lauri Lavanti palvelussa ${title} (linkki aukeaa uudessa välilehdessä)`,
    sv: (title) => `Lauri Lavanti på ${title} (öppnas i ny flik)`,
}
