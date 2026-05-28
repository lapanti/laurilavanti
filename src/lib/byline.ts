import type { Lang } from '../content/nav'
import type { AuthorEntry } from '../content/person'

import { personJobTitle, personName } from '../content/person'

export type { Lang }

export interface ExternalPublication {
    name: string
    date: string // YYYY-MM-DD
    url?: string
}

const bylinePrefix: Record<Lang, string> = { en: 'Authors', fi: 'Tekijät', sv: 'Författare' }
const andConjunction: Record<Lang, string> = { en: 'and', fi: 'ja', sv: 'och' }

const publicationPrefix: Record<Lang, string> = {
    en: 'Also published in',
    fi: 'Julkaistu myös',
    sv: 'Publicerat även i',
}

const localeMap: Record<Lang, string> = { en: 'en-GB', fi: 'fi-FI', sv: 'sv-SE' }

export const formatPublicationDate = (date: string, lang: Lang): string =>
    new Intl.DateTimeFormat(localeMap[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))

export const buildPublicationBylineText = (pub: ExternalPublication, lang: Lang): string =>
    `${publicationPrefix[lang]}: ${pub.name}, ${formatPublicationDate(pub.date, lang)}.`

const joinParts = (parts: string[], lang: Lang): string => {
    if (parts.length === 1) return parts[0]
    if (parts.length === 2) return `${parts[0]} ${andConjunction[lang]} ${parts[1]}`
    return `${parts.slice(0, -1).join(', ')}, ${andConjunction[lang]} ${parts[parts.length - 1]}`
}

export const buildBylineText = (authors: AuthorEntry[], lang: Lang): string => {
    if (authors.length < 2) return ''

    const anyCoAuthorHasRole = authors.some((e) => e !== 'lauri' && typeof e === 'object' && !!e.role)

    const parts = authors.map((entry) => {
        if (entry === 'lauri') {
            const role = anyCoAuthorHasRole ? personJobTitle[lang] : undefined

            return role ? `${personName} (${role})` : personName
        }
        return entry.role ? `${entry.name} (${entry.role})` : entry.name
    })

    return `${bylinePrefix[lang]}: ${joinParts(parts, lang)}.`
}
