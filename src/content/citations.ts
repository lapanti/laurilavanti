export interface CitationLocale {
    alt: string
    title: string
}

export interface Citation {
    image: string
    locales: Record<'en' | 'fi' | 'sv', CitationLocale>
    name: string
    citation: string
}

export const citations: Citation[] = [
    {
        citation:
            'Jos kuitenkin äänestät vihreitä, anna äänesi Laurille. Älystä ja osaamisesta on hyötyä ihan joka puolueessa!',
        image: 'aki-koikkalainen',
        locales: {
            en: {
                alt: 'Photo of Aki Koikkalainen. Wearing a white dress shirt and a dark blazer.',
                title: 'CEO',
            },
            fi: {
                alt: 'Kuva Aki Koikkalaisesta. Päällä valkoinen kauluspaita ja tumma pikkutakki.',
                title: 'Toimitusjohtaja',
            },
            sv: {
                alt: 'Foto på Aki Koikkalainen. Iklädd en vit skjorta och en mörk kavaj.',
                title: 'Verkställande direktör',
            },
        },
        name: 'Aki Koikkalainen',
    },
]
