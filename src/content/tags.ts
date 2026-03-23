export interface LocalTag {
    id: string
    names: { en: string; fi: string; sv: string }
}

export const tags: LocalTag[] = [
    {
        id: 'regional-elections-2022',
        names: { en: 'Regional elections 2022', fi: 'Aluevaalit 2022', sv: 'Regionval 2022' },
    },
    {
        id: 'regional-elections-2025',
        names: { en: 'Regional elections 2025', fi: 'Aluevaalit 2025', sv: 'Regionval 2025' },
    },
    {
        id: 'digital-independence',
        names: { en: 'Digital independence', fi: 'Digitaalinen itsenäisyys', sv: 'Digital självständighet' },
    },
    {
        id: 'digitalisation',
        names: { en: 'Digitalisation', fi: 'Digitalisaatio', sv: 'Digitalisering' },
    },
    {
        id: 'infrastructure',
        names: { en: 'Infrastructure', fi: 'Infra', sv: 'Infrastruktur' },
    },
    {
        id: 'urban-planning',
        names: { en: 'Urban planning', fi: 'Kaavoitus', sv: 'Planläggning' },
    },
    {
        id: 'kirkkonummi',
        names: { en: 'Kirkkonummi', fi: 'Kirkkonummi', sv: 'Kyrkslätt' },
    },
    {
        id: 'municipal-elections-2025',
        names: { en: 'Municipal elections 2025', fi: 'Kuntavaalit 2025', sv: 'Kommunalval 2025' },
    },
    {
        id: 'west-railway',
        names: { en: 'Western railway', fi: 'Länsirata', sv: 'Västbanan' },
    },
    {
        id: 'western-uusimaa',
        names: { en: 'Western Uusimaa', fi: 'Länsi-Uusimaa', sv: 'Västra Nyland' },
    },
    {
        id: 'transportation',
        names: { en: 'Transport', fi: 'Liikenne', sv: 'Trafik' },
    },
    {
        id: 'immigration',
        names: { en: 'Immigration', fi: 'Maahanmuutto', sv: 'Immigration' },
    },
    {
        id: 'education',
        names: { en: 'Education', fi: 'Opetus', sv: 'Utbildning' },
    },
    {
        id: 'coop-elections',
        names: { en: 'Co-op elections', fi: 'Osuuskauppavaalit', sv: 'Kooperativval' },
    },
    {
        id: 'basic-welfare',
        names: { en: 'Basic welfare', fi: 'Perusturva', sv: 'Grundläggande' },
    },
    {
        id: 'culture-and-education',
        names: { en: 'Culture & education', fi: 'Sivistys', sv: 'Bildning' },
    },
    {
        id: 'social-media',
        names: { en: 'Social media', fi: 'Sosiaalinen media', sv: 'Sociala medier' },
    },
    {
        id: 'health-and-social-reform',
        names: { en: 'Social & health reform', fi: 'Sote-uudistus', sv: 'Vård- och servicereform' },
    },
    {
        id: 'equality-and-non-discrimination',
        names: { en: 'Equality & equity', fi: 'Tasa-arvo ja yhdenvertaisuus', sv: 'Jämlikhet' },
    },
    {
        id: 'technology',
        names: { en: 'Technology', fi: 'Teknologia', sv: 'Teknologi' },
    },
    {
        id: 'artificial-intelligence',
        names: { en: 'Artificial intelligence', fi: 'Tekoäly', sv: 'Artificiell intelligens' },
    },
    {
        id: 'council-motion',
        names: { en: 'Council motion', fi: 'Valtuustoaloite', sv: 'Fullmäktigeinitiativ' },
    },
    {
        id: 'early-childhood-education',
        names: { en: 'Early childhood education', fi: 'Varhaiskasvatus', sv: 'Småbarnspedagogik' },
    },
    {
        id: 'privacy',
        names: { en: 'Privacy', fi: 'Yksityisyydensuoja', sv: 'Integritetsskydd' },
    },
]

export function getTagName(id: string, lang: 'en' | 'fi' | 'sv' = 'fi'): string | undefined {
    return tags.find((t) => t.id === id)?.names[lang]
}
