export interface LocalTag {
    descriptions: { en: string | string[]; fi: string | string[]; sv: string | string[] }
    faq?: {
        en?: Array<{ a: string; q: string }>
        fi?: Array<{ a: string; q: string }>
        sv?: Array<{ a: string; q: string }>
    }
    heroImage?: string
    heroImageAlt?: { en: string; fi: string; sv: string }
    id: string
    names: { en: string; fi: string; sv: string }
    pageTitle: { en: string; fi: string; sv: string }
}
