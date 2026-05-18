import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const UPDATED_DATE = /^updatedDate:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m

export const extractUpdatedDate = (mdxContent: string): string | undefined =>
    UPDATED_DATE.exec(mdxContent)?.[1]

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
    tags: readonly TagWithDate[]
}

export const buildPageDateMap = ({ pagesDir, tags }: BuildPageDateMapInput): Map<string, string> => {
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
            `sitemapLastmod: missing required updatedDate frontmatter in:\n${missing.map((p) => `  - ${p}`).join('\n')}`,
        )
    }

    for (const lang of ['fi', 'sv', 'en'] as const) {
        for (const tag of tags) {
            map.set(`/${lang}/category/${tag.id}/`, tag.updatedDate)
        }
    }

    return map
}
