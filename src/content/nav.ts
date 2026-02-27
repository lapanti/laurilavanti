export interface NavLink {
    href: string
    label: string
    title: string
}

export type Lang = 'en' | 'fi' | 'sv'

export const navLinks: Record<Lang, NavLink[]> = {
    en: [
        { href: '/en/about/', label: 'About me', title: 'About me' },
        { href: '/en/blog/', label: 'Blog', title: 'Blog' },
        { href: '/en/contact/', label: 'Contact', title: 'Contact info' },
        { href: '/fi/', label: 'Suomeksi', title: 'Suomeksi' },
        { href: '/sv/', label: 'På svenska', title: 'På svenska' },
    ],
    fi: [
        { href: '/fi/about/', label: 'Minusta', title: 'Minusta' },
        { href: '/fi/blog/', label: 'Blogi', title: 'Blogi' },
        { href: '/fi/contact/', label: 'Ota yhteyttä', title: 'Yhteystiedot' },
        { href: '/sv/', label: 'På svenska', title: 'På svenska' },
        { href: '/en/', label: 'In English', title: 'In English' },
    ],
    sv: [
        { href: '/sv/about/', label: 'Om mig', title: 'Om mig' },
        { href: '/sv/blog/', label: 'Blogg', title: 'Blogg' },
        { href: '/sv/contact/', label: 'Kontakt', title: 'Kontaktuppgifter' },
        { href: '/fi/', label: 'Suomeksi', title: 'Suomeksi' },
        { href: '/en/', label: 'In English', title: 'In English' },
    ],
}
