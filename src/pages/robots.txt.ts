import type { APIRoute } from 'astro'

const getRobotsTxt = (sitemapURL: URL) => `\
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`

export const GET: APIRoute = ({ site }) => {
    const sitemapURL = new URL('sitemap-index.xml', site)

    return new Response(getRobotsTxt(sitemapURL))
}
