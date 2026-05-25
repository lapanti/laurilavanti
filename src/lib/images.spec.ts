import { describe, expect, it, vi } from 'vitest'

vi.unmock('./images')

import { getImage, getImageSrcset } from './images'

const BASE = 'https://laurilavanti.fi/images'

describe('getImage', () => {
    it('returns correct URL for 1x1 variant', () => {
        const result = getImage('test-slug', '1x1')
        expect(result.src).toBe(`${BASE}/test-slug/w=1680,h=1680,fit=crop,gravity=face`)
        expect(result.width).toBe(1680)
        expect(result.height).toBe(1680)
    })

    it('returns correct URL for og variant', () => {
        const result = getImage('test-slug', 'og')
        expect(result.src).toBe(`${BASE}/test-slug/w=1200,h=630,fit=crop,gravity=face`)
        expect(result.width).toBe(1200)
        expect(result.height).toBe(630)
    })

    it('returns correct URL for hero variant', () => {
        const result = getImage('test-slug', 'hero')
        expect(result.src).toBe(`${BASE}/test-slug/w=1728,h=1320,fit=crop,gravity=face`)
        expect(result.width).toBe(1728)
        expect(result.height).toBe(1320)
    })

    it('encodes slug with special characters', () => {
        const result = getImage('slug with spaces & chars', '1x1')
        expect(result.src).toContain('slug%20with%20spaces%20%26%20chars')
    })

    it('throws on unknown variant', () => {
        expect(() => getImage('test-slug', 'nonexistent')).toThrow('Unknown image variant: nonexistent')
    })
})

describe('getImageSrcset', () => {
    it('returns correct srcset for 1x1 variant', () => {
        const result = getImageSrcset('test-slug', '1x1', [560, 1120, 1680])
        expect(result.srcset).toBe(
            `${BASE}/test-slug/w=560,h=560,fit=crop,gravity=face 560w, ` +
            `${BASE}/test-slug/w=1120,h=1120,fit=crop,gravity=face 1120w, ` +
            `${BASE}/test-slug/w=1680,h=1680,fit=crop,gravity=face 1680w`,
        )
        expect(result.width).toBe(1680)
        expect(result.height).toBe(1680)
        expect(result.src).toBe(`${BASE}/test-slug/w=1680,h=1680,fit=crop,gravity=face`)
    })

    it('computes correct heights for non-square variants', () => {
        const result = getImageSrcset('test-slug', 'hero', [864, 1728])
        expect(result.srcset).toContain('w=864,h=660')
        expect(result.srcset).toContain('w=1728,h=1320')
        expect(result.height).toBe(1320)
        expect(result.width).toBe(1728)
    })

    it('uses auto gravity for background variant', () => {
        const result = getImageSrcset('test-slug', 'background', [960, 1920])
        expect(result.srcset).toContain('gravity=auto')
    })

    it('throws on unknown variant', () => {
        expect(() => getImageSrcset('test-slug', 'nonexistent', [560])).toThrow('Unknown image variant: nonexistent')
    })
})
