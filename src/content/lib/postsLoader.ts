import type { Loader, LoaderContext, ParseDataOptions } from 'astro/loaders'

import { glob } from 'astro/loaders'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

type Lang = 'en' | 'fi' | 'sv'
type Localized<T> = T | Partial<Record<Lang, T>>

/**
 * authors[].role is the one shared-field sub-value that legitimately differs per
 *  locale (a co-author's translated job title). meta.json may express it as a plain
 *  string (identical everywhere) or as a {fi,sv,en} object; this resolves it down to
 *  a plain string for one language. externalPublications is NOT handled here — its
 *  presence, order, and content vary too much per locale (some locales have no press
 *  mentions at all for a given post) to treat as a shared field, so it lives entirely
 *  in each per-language file's own frontmatter instead, same as title/description/faq.
 */
function resolveLocalized<T>(value: Localized<T> | undefined, lang: Lang): T | undefined {
    if (value === undefined || value === null) return undefined
    if (typeof value === 'object' && !Array.isArray(value)) {
        return (value as Partial<Record<Lang, T>>)[lang]
    }
    return value as T
}

interface RawAuthorEntry {
    name: string
    role?: Localized<string>
    sameAs?: string[]
    url?: string
}

function resolveMeta(meta: Record<string, unknown>, lang: Lang): Record<string, unknown> {
    const authors = meta.authors as Array<'lauri' | RawAuthorEntry> | undefined

    return {
        ...meta,
        authors: authors?.map((author) =>
            typeof author === 'string' ? author : { ...author, role: resolveLocalized(author.role, lang) }
        ),
    }
}

/**
 * Wraps the built-in glob() loader instead of reimplementing MDX parsing/rendering:
 * intercepts parseData to merge each post's sibling meta.json (shared fields) into
 * its per-language frontmatter before schema validation, so file walking, frontmatter
 * parsing, and deferred MDX rendering all stay exactly as glob() already does them.
 */
export function postsLoader(): Loader {
    const inner = glob({ base: './src/content/posts', pattern: '*/{fi,sv,en}.mdx' })
    const metaCache = new Map<string, Record<string, unknown>>()

    return {
        load: async (context: LoaderContext) => {
            const originalParseData = context.parseData.bind(context)

            context.parseData = async <TData extends Record<string, unknown>>(options: ParseDataOptions<TData>) => {
                const { filePath, data } = options
                if (!filePath) return originalParseData(options)

                const dir = dirname(filePath)
                const meta: Record<string, unknown> =
                    metaCache.get(dir) ?? JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf-8'))
                metaCache.set(dir, meta)

                const lang = (data as { lang?: Lang }).lang
                if (!lang) throw new Error(`Post at ${filePath} is missing required "lang" frontmatter`)

                return originalParseData({ ...options, data: { ...resolveMeta(meta, lang), ...data } as TData })
            }

            await inner.load(context)
        },
        name: 'posts-loader',
    }
}
