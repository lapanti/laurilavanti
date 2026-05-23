import type { Lang } from '../content/nav'
import type { AuthorEntry } from '../content/person'

import { personJobTitle, personName } from '../content/person'

export type { Lang }

const bylinePrefix: Record<Lang, string> = { en: 'Authors', fi: 'Tekijät', sv: 'Författare' }
const andConjunction: Record<Lang, string> = { en: 'and', fi: 'ja', sv: 'och' }

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
