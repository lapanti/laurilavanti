import { describe, expect, it } from 'vitest'

import { BLOGPOSTING, JSON_LD_TYPES, PERSON, WEBPAGE, WEBSITE } from './jsonld'

describe('jsonld', () => {
    it('should export correct JSON-LD types', () => {
        expect(BLOGPOSTING).toBe('BlogPosting')
        expect(PERSON).toBe('Person')
        expect(WEBPAGE).toBe('WebPage')
        expect(WEBSITE).toBe('WebSite')
    })

    it('should include all JSON-LD types in JSON_LD_TYPES', () => {
        expect(JSON_LD_TYPES).toEqual([BLOGPOSTING, PERSON, WEBPAGE, WEBSITE])
    })
})
