export interface LocalTag {
    id: string
    names: { en: string; fi: string; sv: string }
}

export const tags: LocalTag[] = [
    {
        id: 'aluevaalit2022',
        names: { en: 'Regional elections 2022', fi: 'Aluevaalit 2022', sv: 'Regionval 2022' },
    },
    {
        id: 'aluevaalit2025',
        names: { en: 'Regional elections 2025', fi: 'Aluevaalit 2025', sv: 'Regionval 2025' },
    },
    {
        id: 'digitalisaatio',
        names: { en: 'Digitalisation', fi: 'Digitalisaatio', sv: 'Digitalisering' },
    },
    {
        id: 'infra',
        names: { en: 'Infrastructure', fi: 'Infra', sv: 'Infrastruktur' },
    },
    {
        id: 'kaavoitus',
        names: { en: 'Urban planning', fi: 'Kaavoitus', sv: 'Planläggning' },
    },
    {
        id: 'kirkkonummi',
        names: { en: 'Kirkkonummi', fi: 'Kirkkonummi', sv: 'Kyrkslätt' },
    },
    {
        id: 'kuntavaalit2025',
        names: { en: 'Municipal elections 2025', fi: 'Kuntavaalit 2025', sv: 'Kommunalval 2025' },
    },
    {
        id: 'lansirata',
        names: { en: 'Western railway', fi: 'Länsirata', sv: 'Västbanan' },
    },
    {
        id: 'lansi-uusimaa',
        names: { en: 'Western Uusimaa', fi: 'Länsi-Uusimaa', sv: 'Västra Nyland' },
    },
    {
        id: 'liikenne',
        names: { en: 'Transport', fi: 'Liikenne', sv: 'Trafik' },
    },
    {
        id: 'maahanmuutto',
        names: { en: 'Immigration', fi: 'Maahanmuutto', sv: 'Immigration' },
    },
    {
        id: 'opetus',
        names: { en: 'Education', fi: 'Opetus', sv: 'Utbildning' },
    },
    {
        id: 'osuuskauppavaalit',
        names: { en: 'Co-op elections', fi: 'Osuuskauppavaalit', sv: 'Kooperativval' },
    },
    {
        id: 'perustuva',
        names: { en: 'Basic welfare', fi: 'Perustuva', sv: 'Grundläggande' },
    },
    {
        id: 'sivistys',
        names: { en: 'Culture & education', fi: 'Sivistys', sv: 'Bildning' },
    },
    {
        id: 'sosiaalinen-media',
        names: { en: 'Social media', fi: 'Sosiaalinen media', sv: 'Sociala medier' },
    },
    {
        id: 'soteuudistus',
        names: { en: 'Social & health reform', fi: 'Sote-uudistus', sv: 'Vård- och servicereform' },
    },
    {
        id: 'tasa-arvo-ja-yhdenvertaisuus',
        names: { en: 'Equality & equity', fi: 'Tasa-arvo ja yhdenvertaisuus', sv: 'Jämlikhet' },
    },
    {
        id: 'teknologia',
        names: { en: 'Technology', fi: 'Teknologia', sv: 'Teknologi' },
    },
    {
        id: 'tekoaly',
        names: { en: 'Artificial intelligence', fi: 'Tekoäly', sv: 'Artificiell intelligens' },
    },
    {
        id: 'valtuustoaloite',
        names: { en: 'Council motion', fi: 'Valtuustoaloite', sv: 'Fullmäktigeinitiativ' },
    },
    {
        id: 'varhaiskasvatus',
        names: { en: 'Early childhood education', fi: 'Varhaiskasvatus', sv: 'Småbarnspedagogik' },
    },
    {
        id: 'yksityisyydensuoja',
        names: { en: 'Privacy', fi: 'Yksityisyydensuoja', sv: 'Integritetsskydd' },
    },
]

export function getTagName(id: string, lang: 'en' | 'fi' | 'sv' = 'fi'): string | undefined {
    return tags.find((t) => t.id === id)?.names[lang]
}
