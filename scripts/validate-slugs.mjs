import { readdirSync, readFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const pagesRoot = join(__dirname, '..', 'src', 'pages')
const repoRoot = join(__dirname, '..')
const SOFT_HYPHEN = '\u00AD'

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

function extractSlug(content) {
    const m = content.match(/^slug:\s*'([^']*)'/m) ?? content.match(/^slug:\s*"([^"]*)"/m)
    return m ? m[1] : null
}

const files = collectMdxFiles(pagesRoot)
let hasError = false

for (const file of files) {
    const content = readFileSync(file, 'utf8')
    const slug = extractSlug(content)
    if (slug === null) continue
    const relFile = file.replace(repoRoot + '/', '')
    if (slug.includes(SOFT_HYPHEN)) {
        console.error(`ERROR: soft hyphen in slug: "${slug}" — ${relFile}`)
        hasError = true
    }
    // Blog posts: path matches .../blog/<id>/<slug>/index.mdx
    // Slug must equal the immediate parent folder name.
    if (/\/blog\/\d+\//.test(file)) {
        const folderName = basename(dirname(file))
        if (folderName !== slug) {
            console.error(
                `ERROR: slug mismatch — folder "${folderName}" !== slug "${slug}" — ${relFile}`
            )
            hasError = true
        }
    }
}

if (hasError) {
    process.exit(1)
} else {
    console.log(`OK: all ${files.length} MDX slugs are valid`)
}
