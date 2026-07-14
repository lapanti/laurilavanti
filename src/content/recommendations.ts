interface RecommendationLocale {
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
        image: 'Juhana-Karhula',
        locales: {
            en: {
                alt: 'Photo of Juhana Karhula performing in a wrestling ring, wearing a black tank top and a long fur-trimmed coat under green stage lights. Photo: FCF Wrestling / Akseli Vaheristo.',
                title: 'Agile specialist - Legend of Finnish pro wrestling',
            },
            fi: {
                alt: 'Kuva Juhana Karhulasta painimatolla. Hänellä on päällään musta trikoopaita ja pitkä turkisreunainen takki, taustalla vihreät lavavalot. Kuva: FCF Wrestling / Akseli Vaheristo.',
                title: 'Ketteryyden ammattilainen - Suomalaisen showpainin legenda',
            },
            sv: {
                alt: 'Foto på Juhana Karhula i en brottningsring, iklädd ett svart linne och en lång pälskantad kappa under grönt scenljus. Foto: FCF Wrestling / Akseli Vaheristo.',
                title: 'Smidighetsproffs - Finländsk proffsbrottningslegend',
            },
        },
        name: 'Juhana Karhula',
        recommendation:
            'Lauri on ennen kaikkea hyvä ihminen joka välittää ihmisistä, ympäristöstä ja Suomesta. Teknologisella asiantuntijuudellaan ja empatiakyvyllään Lauri pystyy taistelemaan teknologiajättien aiheuttamia haittavaikutuksia vastaan aidosti ihmislähtöisestä asemasta. Suomi olisi yksinkertaisesti parempi paikka olla ja asua jos Lauri olisi edustamassa sen kansaa.',
    },
    {
        image: 'Lauri-Nevanpera',
        locales: {
            en: {
                alt: 'Photo of Lauri Nevanperä. He has long hair tied back, a beard, and glasses, and is wearing a black jacket over a mauve t-shirt.',
                title: 'Tampere City Councillor, Lead AI Engineer',
            },
            fi: {
                alt: 'Kuva Lauri Nevanperästä. Hänellä on pitkät kammatut hiukset, parta ja silmälasit, päällään musta takki ja vaaleanpunertava t-paita.',
                title: 'Tampereen kaupunginvaltuutettu, johtava tekoälyinsinööri',
            },
            sv: {
                alt: 'Foto på Lauri Nevanperä. Han har långt hår i tofs, skägg och glasögon, och bär en svart jacka över en gammelrosa t-shirt.',
                title: 'Fullmäktigeledamot i Tammerfors, ledande AI-ingenjör',
            },
        },
        name: 'Lauri Nevanperä',
        recommendation:
            'Tietojärjestelmät ovat yhä enemmän yhteiskunnan perusinfraa. Tekoälymurroksessa ja nykyisessä geopoliittisessa tilanteessa tarvitaan osaajia, jotka ymmärtävät järjestelmien mahdollisuudet ja uhat. Lauri on myös valtavan aikaansaava kaveri.',
    },
    {
        image: 'Kalle-Euro',
        locales: {
            en: {
                alt: 'Photo of Kalle Euro. He is wearing glasses, a grey sweater, and a dark jacket.',
                title: 'Executive Director',
            },
            fi: {
                alt: 'Kuva Kalle Eurosta. Hänellä on silmälasit, harmaa neule ja tumma takki.',
                title: 'Toiminnanjohtaja',
            },
            sv: {
                alt: 'Foto på Kalle Euro. Han bär glasögon, en grå tröja och en mörk jacka.',
                title: 'Operativ Chef',
            },
        },
        name: 'Kalle Euro',
        recommendation:
            'Laurin kanssa voi puhua yhtä sujuvasti tekoälyn yhteiskunnallisista vaikutuksista kuin siitä, miten markkinatalous pidetään reiluna kaikille. Tällaista yhdistelmää – uteliaisuutta, asiantuntemusta ja oikeudentajua – tarvitaan eduskunnassa.',
    },
    {
        image: 'Mari-Holopainen',
        locales: {
            en: {
                alt: 'Photo of Mari Holopainen. She is wearing a light-coloured jacket.',
                title: 'Member of Parliament, M.Sc. (Econ.)',
            },
            fi: {
                alt: 'Kuva Mari Holopaisesta. Päällään hänellä on vaalea takki.',
                title: 'Kansanedustaja, kauppatieteiden maisteri',
            },
            sv: {
                alt: 'Foto på Mari Holopainen. Hon bär en ljus jacka.',
                title: 'Riksdagsledamot, ekonomie magister',
            },
        },
        name: 'Mari Holopainen',
        recommendation:
            'Eduskuntaan tarvitaan enemmän ihmisiä, jotka ymmärtävät sekä taloudesta että teknologiasta. Yhtenä Digitaalinen itsenäisyys -kansalaisaloitteen perustajista Lauri tunnistaa, miten Suomen tulisi toimia yhteiskuntaa monin tavoin muokkaavan teknologisen murroksen edessä. Laurilla on vahva analyyttinen ote, kyky hahmottaa laajoja kokonaisuuksia ja taito tehdä monimutkaisistakin asioista ymmärrettäviä. Hän on myös poikkeuksellisen sinnikäs ja työtä pelkäämätön.',
    },
]
