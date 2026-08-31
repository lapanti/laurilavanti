import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const UPDATED_DATE = /^updatedDate:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m
const SLUG = /^slug:\s*['"]?([^'"\n]+)['"]?/m
const LANGS = ['fi', 'sv', 'en'] as const

export const extractUpdatedDate = (mdxContent: string): string | undefined => UPDATED_DATE.exec(mdxContent)?.[1]

const extractSlug = (mdxContent: string): string | undefined => SLUG.exec(mdxContent)?.[1]

const walkMdx = (dir: string): string[] => {
    const out: string[] = []
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry)
        const stat = statSync(full)
        if (stat.isDirectory()) {
            out.push(...walkMdx(full))
        } else if (entry.endsWith('.mdx')) {
            out.push(full)
        }
    }
    return out
}

const mdxPathToUrl = (pagesDir: string, mdxPath: string): string => {
    const rel = mdxPath.slice(pagesDir.length).replace(/\\/g, '/')

    return rel.replace(/\/index\.mdx$/, '/')
}

interface TagWithDate {
    id: string
    updatedDate: string
}

interface BuildPageDateMapInput {
    pagesDir: string
    postsDir?: string
    tags: readonly TagWithDate[]
}

/**
 * Posts live under postsDir/{id}/{meta.json, fi.mdx, sv.mdx, en.mdx} — updatedDate is
 *  in the shared meta.json (not any .mdx file, so walkMdx/extractUpdatedDate can't see
 *  it), and the URL needs each language file's own slug, not derivable from the path.
 *
 * Future-dated (scheduled) posts are deliberately not filtered here: this map is a
 *  lookup consulted only for pages present in the built sitemap, and unbuilt posts
 *  never appear there — their entries are unreachable keys. Filtering would duplicate
 *  the build clock at config-eval time for no correctness gain.
 */
const buildPostDateEntries = (postsDir: string): Array<[string, string]> => {
    const entries: Array<[string, string]> = []
    const missing: string[] = []

    for (const idDir of readdirSync(postsDir, { withFileTypes: true }).filter((e) => e.isDirectory())) {
        const dir = join(postsDir, idDir.name)
        const metaPath = join(dir, 'meta.json')
        const meta = JSON.parse(readFileSync(metaPath, 'utf-8'))
        const updatedDate: string | undefined = meta.updatedDate
        if (!updatedDate) {
            missing.push(metaPath)
            continue
        }
        for (const lang of LANGS) {
            const langPath = join(dir, `${lang}.mdx`)
            if (!existsSync(langPath)) continue
            const slug = extractSlug(readFileSync(langPath, 'utf-8'))
            if (!slug) {
                missing.push(langPath)
                continue
            }
            entries.push([`/${lang}/blog/${idDir.name}/${slug}/`, updatedDate])
        }
    }

    if (missing.length > 0) {
        throw new Error(
            `sitemapLastmod: missing required updatedDate/slug in:\n${missing.map((p) => `  - ${p}`).join('\n')}`
        )
    }

    return entries
}

export const buildPageDateMap = ({ pagesDir, postsDir, tags }: BuildPageDateMapInput): Map<string, string> => {
    const map = new Map<string, string>()
    const missing: string[] = []

    for (const mdxPath of walkMdx(pagesDir)) {
        const content = readFileSync(mdxPath, 'utf-8')
        const date = extractUpdatedDate(content)
        if (!date) {
            missing.push(mdxPath)
            continue
        }
        map.set(mdxPathToUrl(pagesDir, mdxPath), date)
    }

    if (missing.length > 0) {
        throw new Error(
            `sitemapLastmod: missing required updatedDate frontmatter in:\n${missing.map((p) => `  - ${p}`).join('\n')}`
        )
    }

    if (postsDir) {
        for (const [url, date] of buildPostDateEntries(postsDir)) {
            map.set(url, date)
        }
    }

    for (const lang of LANGS) {
        for (const tag of tags) {
            map.set(`/${lang}/category/${tag.id}/`, tag.updatedDate)
        }
    }

    return map
}
