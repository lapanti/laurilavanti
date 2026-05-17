import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const PUBLISH_DATE = /^publishDate:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m
const UPDATED_DATE = /^updatedDate:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m

export const extractPostDate = (mdxContent: string): string | undefined => {
    const updated = UPDATED_DATE.exec(mdxContent)?.[1]
    if (updated) return updated
    return PUBLISH_DATE.exec(mdxContent)?.[1]
}

const tryReaddir = (dir: string): string[] => {
    try {
        return readdirSync(dir)
    } catch {
        return []
    }
}

const readSlugDate = (mdxPath: string): string | undefined => {
    let content: string
    try {
        content = readFileSync(mdxPath, 'utf-8')
    } catch {
        return undefined
    }
    return extractPostDate(content)
}

const collectLangDates = (blogDir: string, lang: string): Array<{ date: string; path: string }> => {
    const entries: Array<{ date: string; path: string }> = []
    for (const id of tryReaddir(blogDir)) {
        for (const slug of tryReaddir(join(blogDir, id))) {
            const date = readSlugDate(join(blogDir, id, slug, 'index.mdx'))
            if (date) entries.push({ date, path: `/${lang}/blog/${id}/${slug}/` })
        }
    }
    return entries
}

export const buildPostDateMap = (pagesDir: string): Map<string, string> => {
    const map = new Map<string, string>()
    for (const lang of ['fi', 'sv', 'en']) {
        const blogDir = join(pagesDir, lang, 'blog')
        for (const { path, date } of collectLangDates(blogDir, lang)) {
            map.set(path, date)
        }
    }
    return map
}
