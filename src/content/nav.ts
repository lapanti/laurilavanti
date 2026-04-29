export type Lang = 'en' | 'fi' | 'sv'

export const skipLinks: Record<Lang, { main: string; footer: string }> = {
    en: { footer: 'Skip to footer &#x27A1;', main: 'Skip to main content &#x27A1;' },
    fi: { footer: 'Siirry alatunnisteeseen &#x27A1;', main: 'Siirry pääsisältöön &#x27A1;' },
    sv: { footer: 'Hoppa till sidfoten &#x27A1;', main: 'Hoppa till huvudinnehållet &#x27A1;' },
}

export interface NavLink {
    href: string
    label: string
    switchToLang?: Lang
    title: string
}

export const navLinks: Record<Lang, NavLink[]> = {
    en: [
        { href: '/en/about/', label: 'About Lauri', title: 'About Lauri' },
        { href: '/en/topics/', label: 'Topics', title: 'Topics' },
        { href: '/en/blog/', label: 'Blog', title: 'Blog' },
        { href: '/en/contact/', label: 'Contact', title: 'Contact info' },
        { href: '/en/newsletter/', label: 'Newsletter', title: 'Newsletter' },
        { href: '/fi/', label: 'FI', switchToLang: 'fi', title: 'Suomeksi' },
        { href: '/sv/', label: 'SV', switchToLang: 'sv', title: 'På svenska' },
    ],
    fi: [
        { href: '/fi/about/', label: 'Laurista', title: 'Laurista' },
        { href: '/fi/topics/', label: 'Aiheet', title: 'Aiheet' },
        { href: '/fi/blog/', label: 'Blogi', title: 'Blogi' },
        { href: '/fi/contact/', label: 'Ota yhteyttä', title: 'Ota yhteyttä' },
        { href: '/fi/newsletter/', label: 'Uutiskirje', title: 'Uutiskirje' },
        { href: '/sv/', label: 'SV', switchToLang: 'sv', title: 'På svenska' },
        { href: '/en/', label: 'EN', switchToLang: 'en', title: 'In English' },
    ],
    sv: [
        { href: '/sv/about/', label: 'Om Lauri', title: 'Om Lauri' },
        { href: '/sv/topics/', label: 'Ämnen', title: 'Ämnen' },
        { href: '/sv/blog/', label: 'Blogg', title: 'Blogg' },
        { href: '/sv/contact/', label: 'Kontakt', title: 'Kontaktuppgifter' },
        { href: '/sv/newsletter/', label: 'Nyhetsbrev', title: 'Nyhetsbrev' },
        { href: '/fi/', label: 'FI', switchToLang: 'fi', title: 'Suomeksi' },
        { href: '/en/', label: 'EN', switchToLang: 'en', title: 'In English' },
    ],
}
