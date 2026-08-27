import { describe, expect, it } from 'vitest'

import { sloganContent } from './slogan'

const LOCALES = ['en', 'fi', 'sv'] as const

describe('slogan data', () => {
    it.each(LOCALES)('%s — is present', (locale) => {
        expect(sloganContent[locale]).toBeDefined()
    })

    it.each(LOCALES)('%s — prefix and candidacy lines are non-empty', (locale) => {
        expect(sloganContent[locale].prefix.trim()).toBeTruthy()
        expect(sloganContent[locale].candidacy.length).toBeGreaterThan(0)
        for (const line of sloganContent[locale].candidacy) {
            expect(line.trim()).toBeTruthy()
        }
    })

    it.each(LOCALES)('%s — has a non-empty resting word', (locale) => {
        expect(sloganContent[locale].restingWord.trim()).toBeTruthy()
    })
})
