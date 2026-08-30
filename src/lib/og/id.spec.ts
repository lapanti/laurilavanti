import { describe, expect, it } from 'vitest'

import { ogId } from './id'

describe('ogId', () => {
    it('keeps a single-segment slug as-is', () => {
        expect(ogId('fi')).toBe('fi')
    })

    it('replaces path separators with a filesystem-safe token', () => {
        expect(ogId('fi/about')).toBe('fi__about')
        expect(ogId('fi/blog/58/talous-korjataan')).toBe('fi__blog__58__talous-korjataan')
        expect(ogId('en/category/economy')).toBe('en__category__economy')
    })

    it('strips leading and trailing slashes before mapping', () => {
        expect(ogId('/fi/about/')).toBe('fi__about')
    })
})
