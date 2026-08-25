import { describe, expect, it } from 'vitest'

import { auditRedirectMap, normalizeRedirectPath } from './redirects.mjs'

describe('normalizeRedirectPath', () => {
    it('normalizes local paths and rejects non-local URL features', () => {
        expect(normalizeRedirectPath('/old')).toBe('/old/')
        expect(normalizeRedirectPath('/old//path/')).toBe('/old/path/')
        expect(normalizeRedirectPath('//example.com/old/')).toBeNull()
        expect(normalizeRedirectPath('/old/?campaign=test')).toBeNull()
        expect(normalizeRedirectPath('/old/#section')).toBeNull()
    })
})

describe('auditRedirectMap', () => {
    it('reports non-normalized sources and destinations', () => {
        const result = auditRedirectMap({ '/old': '/new?campaign=test' })

        expect(result.normalization).toEqual([
            { expected: '/old/', from: '/old', kind: 'source', value: '/old' },
            { expected: null, from: '/old', kind: 'destination', value: '/new?campaign=test' },
        ])
    })

    it('reports every source participating in a transitive chain', () => {
        const result = auditRedirectMap({ '/a/': '/b/', '/b/': '/c/', '/c/': '/terminal/' })

        expect(result.chains).toEqual([
            { from: '/a/', isCycle: false, terminal: '/terminal/', via: ['/b/', '/c/'] },
            { from: '/b/', isCycle: false, terminal: '/terminal/', via: ['/c/'] },
        ])
        expect(result.cycles).toEqual([])
    })

    it('reports cycles without following them indefinitely', () => {
        const result = auditRedirectMap({ '/a/': '/b/', '/b/': '/a/' })

        expect(result.chains).toEqual([])
        expect(result.cycles).toHaveLength(2)
        expect(result.cycles[0]).toEqual({ from: '/a/', isCycle: true, terminal: '/a/', via: ['/b/'] })
    })
})
