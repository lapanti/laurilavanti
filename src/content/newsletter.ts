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
            'Subscribe to my newsletter and get analysis on the latest developments in AI and technology, and their impact on society, straight to your inbox.',
        emailPlaceholder: 'Email',
        heading: 'Subscribe to the newsletter',
        loadingLabel: 'Loading...',
        privacyLinkText: 'privacy policy',
        privacyText: 'You can unsubscribe at any time. For more information, read our ',
        submitButton: 'Subscribe',
        successHeading: 'Thank you!',
        successMessage: 'You have successfully subscribed',
    },
    fi: {
        description:
            'Tilaamalla uutiskirjeeni saat sähköpostiisi analyysejä tuoreimmista kehityskuluista tekoälyn ja teknologian saralla sekä arvioita niiden vaikutuksista yhteiskuntaan.',
        emailPlaceholder: 'Sähköposti',
        heading: 'Tilaa uutiskirje',
        loadingLabel: 'Lataa...',
        privacyLinkText: 'tietosuojaseloste',
        privacyText: 'Voit perua uutiskirjeen koska tahansa. Lisätietoja varten lue ',
        privacyTextAfter: '.',
        submitButton: 'Tilaa',
        successHeading: 'Kiitos!',
        successMessage: 'Uutiskirje tilattu onnistuneesti',
    },
    sv: {
        description:
            'Prenumerera på mitt nyhetsbrev och få analyser av den senaste utvecklingen inom AI och teknik, samt dess påverkan på samhället, direkt till din inkorg.',
        emailPlaceholder: 'E-post',
        heading: 'Prenumerera på nyhetsbrevet',
        loadingLabel: 'Laddar...',
        privacyLinkText: 'integritetspolicy',
        privacyText: 'Du kan avsluta prenumerationen när som helst. För mer information, läs vår ',
        privacyTextAfter: '.',
        submitButton: 'Prenumerera',
        successHeading: 'Tack så mycket!',
        successMessage: 'Du har prenumererat framgångsrikt',
    },
}
