export interface RecommendationLocale {
    alt: string
    title: string
}

export interface Recommendation {
    image: string
    locales: Record<'en' | 'fi' | 'sv', RecommendationLocale>
    name: string
    recommendation: string
}

export const recommendations: Recommendation[] = [
    {
        image: 'Atte-Harjanne',
        locales: {
            en: {
                alt: 'Photo of Atte Harjanne. He is wearing a white dress shirt and a dark blazer.',
                title: 'Member of Parliament',
            },
            fi: {
                alt: 'Kuva Atte Harjanteesta. Hänellä on päällään valkoinen kauluspaita ja tumma pikkutakki.',
                title: 'Kansanedustaja',
            },
            sv: {
                alt: 'Foto på Atte Harjanne. Han bär en vit skjorta och en mörk kavaj.',
                title: 'Riksdagsledamot',
            },
        },
        name: 'Atte Harjanne',
        recommendation:
            'Eduskunnassa on iso vaje teknologian ja tietopolitiikan asiantuntijoista. Lauri paikkaisi tätä vajetta isosti!',
    },
    {
        image: 'Mari-Holopainen',
        locales: {
            en: {
                alt: 'Photo of Mari Holopainen. She is wearing a light-coloured jacket.',
                title: 'Member of Parliament',
            },
            fi: {
                alt: 'Kuva Mari Holopaisesta. Päällään hänellä on vaalea takki.',
                title: 'Kansanedustaja',
            },
            sv: {
                alt: 'Foto på Mari Holopainen. Hon bär en ljus jacka.',
                title: 'Riksdagsledamot',
            },
        },
        name: 'Mari Holopainen',
        recommendation: '',
    },
    {
        image: 'Otso-Kivekas',
        locales: {
            en: {
                alt: 'Photo of Otso Kivekäs. He is wearing a t-shirt reading Helsinki and a blazer, and a hat.',
                title: 'CEO, city councillor',
            },
            fi: {
                alt: 'Kuva Otso Kivekkäästä. Päällään hänellä on t-paita, jossa lukee Helsinki, sekä pikkutakki. Päässä hattu.',
                title: 'Toimitusjohtaja, kaupunginvaltuutettu',
            },
            sv: {
                alt: 'Foto på Otso Kivekäs. Han bär en t-shirt med texten Helsinki och en kavaj, samt en hatt.',
                title: 'VD, stadsfullmäktigeledamot',
            },
        },
        name: 'Otso Kivekäs',
        recommendation: '',
    },
    {
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
        recommendation:
            'Jos kuitenkin äänestät vihreitä, anna äänesi Laurille. Älystä ja osaamisesta on hyötyä ihan joka puolueessa!',
    },
    {
        image: 'Juho-Makkonen',
        locales: {
            en: {
                alt: 'Photo of Juho Makkonen. He is wearing a tan sweater.',
                title: 'CEO, Sharetribe Oy',
            },
            fi: {
                alt: 'Kuva Juho Makkosesta. Hänellä on päällään beige neule.',
                title: 'Toimitusjohtaja, Sharetribe Oy',
            },
            sv: {
                alt: 'Foto på Juho Makkonen. Han bär en beige tröja.',
                title: 'VD, Sharetribe Oy',
            },
        },
        name: 'Juho Makkonen',
        recommendation:
            'Laurissa vankka osaaminen teknologiasta ja taloudesta yhdistyy vahvaan visioon siitä, miten yhteiskunnasta rakennetaan oikeudenmukaisempi ja parempi paikka kaikille, samalla ympäristöstä huolehtien.',
    },
    {
        image: 'Allu-Pyhalammi',
        locales: {
            en: {
                alt: 'Photo of Allu Pyhälammi. He is wearing a dark blazer and a large scarf.',
                title: 'Deputy Chair of the Greens',
            },
            fi: {
                alt: 'Kuva Allu Pyhälammista. Hänellä on päällään tumma pikkutakki ja iso kaulahuivi.',
                title: 'Vihreiden varapuheenjohtaja',
            },
            sv: {
                alt: 'Foto på Allu Pyhälammi. Han bär en mörk kavaj och en stor halsduk.',
                title: 'Grönas vice ordförande',
            },
        },
        name: 'Allu Pyhälammi',
        recommendation:
            'Lauri on hyvin nopeasti osoittanut suurta omistautumista ja aktiivisuutta maailman muuttamiselle ja Vihreän politiikan teolle! Häneltä hoituu niin järjestön pyörittäminen, poliittisten teemojen syväosaaminen, vahva ja kestävä sosiaalisen median näkyvyys ja hienot verkostotaidot. Hän on mm. kunnostautunut Suomen digitaalista itsenäisyyttä ajavana moottorina, jolla on aina ihmisen hyvinvointi ja järkevät talousratkaisut toimintansa keskiössä.',
    },
    {
        image: 'Sofia-Virta',
        locales: {
            en: {
                alt: 'Photo of Sofia Virta. She is wearing a blue shirt and a leather jacket.',
                title: 'Member of Parliament',
            },
            fi: {
                alt: 'Kuva Sofia Virrasta. Päällään hänellä on sininen paita ja nahkatakki.',
                title: 'Kansanedustaja',
            },
            sv: {
                alt: 'Foto på Sofia Virta. Hon bär en blå skjorta och en skinnjacka.',
                title: 'Riksdagsledamot',
            },
        },
        name: 'Sofia Virta',
        recommendation: '',
    },
]
