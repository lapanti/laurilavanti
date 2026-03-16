interface NewsletterLocale {
    description: string
    emailPlaceholder: string
    heading: string
    loadingLabel: string
    privacyLinkText: string
    privacyText: string
    privacyTextAfter?: string
    submitButton: string
    successHeading: string
    successMessage: string
}

export const newsletterContent: Record<'en' | 'fi' | 'sv', NewsletterLocale> = {
    en: {
        description:
            'Subscribe to receive digested explanations and analysis of the latest technologies and their impact on society. Straight to your inbox.',
        emailPlaceholder: 'Email',
        heading: 'Newsletter',
        loadingLabel: 'Loading...',
        privacyLinkText: 'privacy policy',
        privacyText: 'You can unsubscribe at any time. For more information, read our ',
        submitButton: 'Subscribe',
        successHeading: 'Thank you!',
        successMessage: 'You have successfully subscribed',
    },
    fi: {
        description:
            'Tilaa ja saat pureskeltuja selityksiä ja analyysejä tuoreimmista teknologioista ja niiden vaikutuksista yhteiskuntaan. Suoraan sähköpostiisi.',
        emailPlaceholder: 'Sähköposti',
        heading: 'Uutiskirje',
        loadingLabel: 'Lataa...',
        privacyLinkText: 'tietosuojaselosteemme',
        privacyText: 'Voit perua uutiskirjeen koska tahansa. Lisätietoja varten lue ',
        privacyTextAfter: '.',
        submitButton: 'Tilaa',
        successHeading: 'Kiitos!',
        successMessage: 'Uutiskirje tilattu onnistuneesti',
    },
    sv: {
        description:
            'Prenumerera och få genomarbetade förklaringar och analyser av de senaste teknologierna och deras påverkan på samhället. Direkt till din inkorg.',
        emailPlaceholder: 'E-post',
        heading: 'Nyhetsbrev',
        loadingLabel: 'Laddar...',
        privacyLinkText: 'integritetspolicy',
        privacyText: 'Du kan avsluta prenumerationen när som helst. För mer information, läs vår ',
        privacyTextAfter: '.',
        submitButton: 'Prenumerera',
        successHeading: 'Tack så mycket!',
        successMessage: 'Du har prenumererat framgångsrikt',
    },
}
