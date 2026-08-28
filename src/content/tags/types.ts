import type { FaqItem } from '../../lib/jsonld'

export interface LocalTag {
    descriptions: { en: string[]; fi: string[]; sv: string[] }
    faq?: {
        en?: Array<FaqItem>
        fi?: Array<FaqItem>
        sv?: Array<FaqItem>
    }
    heroImage?: string
    heroImageAlt?: { en: string; fi: string; sv: string }
    id: string
    metaDescription: { en: string; fi: string; sv: string }
    names: { en: string; fi: string; sv: string }
    pageTitle: { en: string; fi: string; sv: string }
    updatedDate: string
}
