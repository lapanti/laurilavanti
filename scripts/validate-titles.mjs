import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const pagesRoot = join(__dirname, '..', 'src', 'pages')
const repoRoot = join(__dirname, '..')

const SUFFIX = ' | Lauri Lavanti'
const SOFT_HYPHEN = '\u00AD'
const MIN_LEN = 50
const MAX_LEN = 60

function collectMdxFiles(dir) {
    const entries = readdirSync(dir, { withFileTypes: true })
    const files = []
    for (const entry of entries) {
        const fullPath = join(dir, entry.name)
        if (entry.isDirectory()) {
            files.push(...collectMdxFiles(fullPath))
        } else if (entry.name === 'index.mdx') {
            files.push(fullPath)
        }
    }
    return files
}

function extractTitle(content) {
    const m = content.match(/^title:\s*'([^']*)'/m) ?? content.match(/^title:\s*"([^"]*)"/m)
    return m ? m[1] : null
}

function computeFinalTitle(raw) {
    const stripped = raw.replaceAll(SOFT_HYPHEN, '')
    return stripped.startsWith('Lauri Lavanti') ? stripped : stripped + SUFFIX
}

const files = collectMdxFiles(pagesRoot)
let hasError = false

for (const file of files) {
    const content = readFileSync(file, 'utf8')
    const raw = extractTitle(content)

    if (raw === null) {
        console.error(`ERROR: no title found in frontmatter: ${file}`)
        hasError = true
        continue
    }

    const finalTitle = computeFinalTitle(raw)
    const len = finalTitle.length

    if (len < MIN_LEN || len > MAX_LEN) {
        const relFile = file.replace(repoRoot + '/', '')
        console.error(`ERROR: title length ${len} (expected ${MIN_LEN}–${MAX_LEN}): "${finalTitle}" — ${relFile}`)
        hasError = true
    }
}

if (hasError) {
    process.exit(1)
} else {
    console.log(`OK: all ${files.length} MDX page titles are within ${MIN_LEN}–${MAX_LEN} characters`)
}
