import { describe, expect, it } from 'vitest'

import { getRobotsTxt } from './robots.txt'

const SITE = new URL('https://laurilavanti.fi')

describe('getRobotsTxt', () => {
    it('allows GPTBot', () => {
        expect(getRobotsTxt(new URL('sitemap-index.xml', SITE))).toContain('User-agent: GPTBot\nAllow: /')
    })

    it('allows ClaudeBot', () => {
        expect(getRobotsTxt(new URL('sitemap-index.xml', SITE))).toContain('User-agent: ClaudeBot\nAllow: /')
    })

    it('allows PerplexityBot', () => {
        expect(getRobotsTxt(new URL('sitemap-index.xml', SITE))).toContain('User-agent: PerplexityBot\nAllow: /')
    })

    it('allows all agents with wildcard', () => {
        expect(getRobotsTxt(new URL('sitemap-index.xml', SITE))).toContain('User-agent: *\nAllow: /')
    })

    it('includes the sitemap URL', () => {
        const sitemapURL = new URL('sitemap-index.xml', SITE)
        expect(getRobotsTxt(sitemapURL)).toContain(`Sitemap: ${sitemapURL.href}`)
    })
})
