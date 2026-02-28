export type Lang = 'en' | 'fi' | 'sv'

export interface NavLink {
    href: string
    label: string
    switchToLang?: Lang
    title: string
}

export const navLinks: Record<Lang, NavLink[]> = {
    en: [
        { href: '/en/about/', label: 'About me', title: 'About me' },
        { href: '/en/blog/', label: 'Blog', title: 'Blog' },
        { href: '/en/contact/', label: 'Contact', title: 'Contact info' },
        { href: '/fi/', label: 'Suomeksi', switchToLang: 'fi', title: 'Suomeksi' },
        { href: '/sv/', label: 'På svenska', switchToLang: 'sv', title: 'På svenska' },
    ],
    fi: [
        { href: '/fi/about/', label: 'Minusta', title: 'Minusta' },
        { href: '/fi/blog/', label: 'Blogi', title: 'Blogi' },
        { href: '/fi/contact/', label: 'Ota yhteyttä', title: 'Yhteystiedot' },
        { href: '/sv/', label: 'På svenska', switchToLang: 'sv', title: 'På svenska' },
        { href: '/en/', label: 'In English', switchToLang: 'en', title: 'In English' },
    ],
    sv: [
        { href: '/sv/about/', label: 'Om mig', title: 'Om mig' },
        { href: '/sv/blog/', label: 'Blogg', title: 'Blogg' },
        { href: '/sv/contact/', label: 'Kontakt', title: 'Kontaktuppgifter' },
        { href: '/fi/', label: 'Suomeksi', switchToLang: 'fi', title: 'Suomeksi' },
        { href: '/en/', label: 'In English', switchToLang: 'en', title: 'In English' },
    ],
}
