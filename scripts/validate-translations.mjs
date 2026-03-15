import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const blogRoot = join(__dirname, '..', 'src', 'pages')
const LANGS = ['fi', 'sv', 'en']

const idsByLang = {}
for (const lang of LANGS) {
    const blogDir = join(blogRoot, lang, 'blog')
    const entries = readdirSync(blogDir, { withFileTypes: true })
    idsByLang[lang] = new Set(entries.filter((e) => e.isDirectory() && /^\d+$/.test(e.name)).map((e) => e.name))
}

const allIds = new Set(LANGS.flatMap((l) => [...idsByLang[l]]))

let hasError = false
for (const id of [...allIds].sort((a, b) => Number(a) - Number(b))) {
    const missing = LANGS.filter((l) => !idsByLang[l].has(id))
    if (missing.length > 0) {
        console.error(`ERROR: post id ${id} is missing translations in: ${missing.join(', ')}`)
        hasError = true
    }
}

if (hasError) {
    process.exit(1)
} else {
    console.log(`OK: all ${allIds.size} post IDs have translations in fi, sv, and en`)
}
