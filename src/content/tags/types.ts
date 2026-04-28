export interface LocalTag {
    descriptions: { en: string[]; fi: string[]; sv: string[] }
    faq?: {
        en?: Array<{ a: string; q: string }>
        fi?: Array<{ a: string; q: string }>
        sv?: Array<{ a: string; q: string }>
    }
    heroImage?: string
    heroImageAlt?: { en: string; fi: string; sv: string }
    id: string
    metaDescription: { en: string; fi: string; sv: string }
    names: { en: string; fi: string; sv: string }
    pageTitle: { en: string; fi: string; sv: string }
}
