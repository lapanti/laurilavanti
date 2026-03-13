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
            "Subscribe to receive Lauri's thoughts—digested and ready to read at your leisure—delivered straight to your inbox.",
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
        description: 'Tilaa Laurin ajatuksia pureksittuna ja rauhassa luettavaksi suoraan sähköpostiisi.',
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
            'Prenumerera för att få Lauris tankar—sammanfattade och redo att läsa när det passar dig—direkt till din inkorg.',
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
