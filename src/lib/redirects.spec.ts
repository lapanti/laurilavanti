import { describe, expect, it } from 'vitest'

import { redirects } from './redirects'

describe('redirects structural integrity', () => {
    const entries = Object.entries(redirects)
    const keys = Object.keys(redirects)
    const values = Object.values(redirects)

    it('should have at least one redirect', () => {
        expect(entries.length).toBeGreaterThan(0)
    })

    it('all keys must start with /', () => {
        for (const key of keys) {
            expect(key, `key "${key}" must start with /`).toMatch(/^\//)
        }
    })

    it('all values must start with /', () => {
        for (const value of values) {
            expect(value, `value "${value}" must start with /`).toMatch(/^\//)
        }
    })

    it('no key must be empty', () => {
        for (const key of keys) {
            expect(key.trim().length, 'found empty key').toBeGreaterThan(0)
        }
    })

    it('no value must be empty', () => {
        for (const value of values) {
            expect(value.trim().length, 'found empty value').toBeGreaterThan(0)
        }
    })

    it('no chain redirects (a redirect target must not be another redirect source)', () => {
        const keySet = new Set(keys)
        for (const [key, value] of entries) {
            expect(keySet.has(value), `chain detected: "${key}" → "${value}" (target is also a source key)`).toBe(false)
        }
    })

    it('no duplicate keys', () => {
        expect(keys.length).toBe(new Set(keys).size)
    })

    it.each([
        ['/', '/fi/'],
        ['/blogi/', '/fi/blog/'],
        ['/about-me/', '/en/about/'],
        ['/minusta/', '/fi/about/'],
        ['/ota-yhteytta/', '/fi/contact/'],
        ['/om-mig/', '/sv/about/'],
        ['/fi/blog/43/kuka-paattaa-mista-puhumma/', '/fi/blog/43/kuka-paattaa-mista-puhumme/'],
        ['/blogi/kuka-paattaa-mista-puhumma/', '/fi/blog/43/kuka-paattaa-mista-puhumme/'],
        ['/en/category/aluevaalit2022/', '/en/category/regional-elections-2022/'],
        ['/sv/category/aluevaalit2022/', '/sv/category/regional-elections-2022/'],
    ] as [string, string][])('%s → %s', (from, to) => {
        expect(redirects[from]).toBe(to)
    })
})
