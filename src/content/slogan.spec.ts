import { describe, expect, it } from 'vitest'

import { sloganContent } from './slogan'

const LOCALES = ['en', 'fi', 'sv'] as const

describe('slogan data', () => {
    it.each(LOCALES)('%s — is present', (locale) => {
        expect(sloganContent[locale]).toBeDefined()
    })

    it.each(LOCALES)('%s — prefix and candidacy line are non-empty', (locale) => {
        expect(sloganContent[locale].prefix.trim()).toBeTruthy()
        expect(sloganContent[locale].candidacy.trim()).toBeTruthy()
    })

    it.each(LOCALES)('%s — has four non-empty typed words', (locale) => {
        const { words } = sloganContent[locale]

        expect(words).toHaveLength(4)
        for (const word of words) {
            expect(word.trim()).toBeTruthy()
        }
    })

    it.each(LOCALES)('%s — typed words are unique', (locale) => {
        const { words } = sloganContent[locale]

        expect(new Set(words).size).toBe(words.length)
    })
})
