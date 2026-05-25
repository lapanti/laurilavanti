/**
 * One-time bulk migration: download all Cloudinary originals and process them.
 *
 * Usage: npx tsx scripts/migrate-images.mts [--auto]
 *
 * Without --auto: pauses for human preview on portrait images (slugs containing "Lauri").
 * With --auto:    auto-approves all images (useful for non-portrait batch runs).
 *
 * Downloads originals from Cloudinary using the public cloud name, then runs
 * the same smartcrop logic as process-image.mts for each image.
 */

import { createServer } from 'node:http'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { fileURLToPath } from 'node:url'

import { crop as smartcrop } from 'smartcrop-sharp'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const ORIGINALS_DIR = path.join(REPO_ROOT, 'src', 'images', 'originals')
const PROCESSED_DIR = path.join(REPO_ROOT, 'src', 'images', 'processed')

const CLOUD_NAME = 'dvqutpcqp'
const AUTO = process.argv.includes('--auto')

// All 56 unique image slugs referenced across MDX frontmatter
const ALL_SLUGS = [
    // Portraits
    'Atte-Harjanne-ja-Lauri-Lavanti',
    'Johanna-FLeming-Lauri-Lavanti-ja-Paula-Oittinen',
    'Lauri-Lavanti-kadet-puuskassa-ulkona',
    'Lauri-Lavanti-aluevaaliehdokas-pellolla',
    'Lauri-Lavanti-arms-in-pockets-in-front-of-a-portrait',
    'Lauri-Lavanti-digitaalinen-itsenaisyys-paidassa',
    'Lauri-Lavanti-hands-in-pockets-in-hallway',
    'Lauri-Lavanti-Helsingin-yliopistolla',
    'Lauri-Lavanti-ja-lapsi-katsovat-puita',
    'Lauri-Lavanti-ja-lapsi-kävelyllä',
    'Lauri-Lavanti-ja-Miisa-Jeremejew',
    'Lauri-Lavanti-next-to-a-table',
    'Lauri-Lavanti-nojaamassa-kasiin',
    'Lauri-Lavanti-nojaamassa-kasiin-sinisella-taustalla',
    'Lauri-Lavanti-nojaa-puuhun',
    'lauri-lavanti-perusturvajaosto',
    'Lauri-Lavanti-seisoo-kukkapaita-päällään-sininen-tausta-vaaka',
    'Lauri-Lavanti-seisoo-kukkapaita-päällään-valkoinen-tausta-vaaka',
    'Lauri-Lavanti-seisoo-suorassa-sinisella-taustalla',
    'Lauri-Lavanti-sitting-in-front-of-a-window',
    // Landscapes / objects
    'duploleikkeja',
    'Havainnekuva-Veikkolan-asemasta',
    'Joukkoliikenne-ei-voi-kallistua-loputtomiin',
    'Kaksi-leijonaa',
    'keijukaispuisto',
    'Kirkkonummen-juna--ja-bussiasema',
    'Kirkkonummen-keskusta',
    'Kirkkonummi-kartanon-piha-syksylla',
    'Kirkkonummi-kartanon-puutarha',
    'punainen-talo-kirkkonummella-syksylla',
    'Kirkkonummi-kartanon-silta-iltavalossa',
    'juoksija-Kirkkonummen-metsassa-jarven-rannalla',
    'Kirkkonummi-jarvimaisema-mantymetsa',
    'Kirkkonummen-wohls-puistokaytava-ja-jarvi',
    'Kirsikkapuisto',
    'kolme-kolikko-pinoa',
    'koodia-tietokoneella',
    'kotihoidossa',
    'laajakallion-koulu',
    'laajakallion-paivakoti',
    'Lapsi-leikkipaikalla',
    'lastenkirjallisuutta',
    'Lyyra-kesken',
    'Muumimaailmassa',
    'onnea-suomi',
    'Poliisiauto',
    'prisman-baana',
    'Sateenkaarilippuja',
    'japanilainen-tilanjakaja-huoneessa',
    'sosiaali-ja-terveyskeskus',
    'Sosiaalinen-media',
    'Suomi-neito-suojaa-Suomea-valkopaamerikotkalta',
    'talvikunnossapito',
    'Tekoaly',
    'verkkohaku',
    'winellska-skolan',
    // Recommendation portraits
    'Atte-Harjanne',
    'Mari-Holopainen',
    'Otso-Kivekas',
    'aki-koikkalainen',
    'Juho-Makkonen',
    'Allu-Pyhalammi',
    'Sofia-Virta',
]

interface Variant {
    key: string
    width: number
    height: number
}

const VARIANTS: Variant[] = [
    { key: '1x1', width: 1680, height: 1680 },
    { key: '191x100', width: 1680, height: 881 },
    { key: 'background', width: 1920, height: 660 },
    { key: 'og', width: 1200, height: 630 },
    { key: 'body', width: 2400, height: 1800 },
]

async function downloadOriginal(slug: string): Promise<string> {
    const destPath = path.join(ORIGINALS_DIR, `${slug}.jpg`)
    try {
        await fs.access(destPath)
        console.log(`  Already downloaded: ${slug}.jpg`)
        return destPath
    } catch {
        // not cached — download
    }

    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${encodeURIComponent(slug)}`
    console.log(`  Downloading ${slug}…`)
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url}`)
    }
    const buf = Buffer.from(await response.arrayBuffer())
    await fs.writeFile(destPath, buf)
    return destPath
}

async function normaliseOrientation(originalPath: string): Promise<void> {
    const meta = await sharp(originalPath).metadata()
    if (!meta.orientation || meta.orientation === 1) return
    const rotated = await sharp(originalPath).rotate().jpeg({ quality: 85, mozjpeg: true }).toBuffer()
    await fs.writeFile(originalPath, rotated)
}

async function cropVariant(
    originalPath: string,
    variant: Variant,
    focalPoint?: { x: number; y: number },
): Promise<Buffer> {
    const meta = await sharp(originalPath).metadata()
    const origW = meta.width!
    const origH = meta.height!

    const targetRatio = variant.width / variant.height
    let cropW: number
    let cropH: number
    if (origW / origH > targetRatio) {
        cropH = origH
        cropW = Math.round(origH * targetRatio)
    } else {
        cropW = origW
        cropH = Math.round(origW / targetRatio)
    }

    let cropX: number
    let cropY: number

    if (focalPoint) {
        cropX = Math.round(origW * focalPoint.x - cropW / 2)
        cropY = Math.round(origH * focalPoint.y - cropH / 2)
        cropX = Math.max(0, Math.min(cropX, origW - cropW))
        cropY = Math.max(0, Math.min(cropY, origH - cropH))
    } else {
        const result = await smartcrop(originalPath, { width: cropW, height: cropH })
        cropX = result.topCrop.x
        cropY = result.topCrop.y
        cropX = Math.max(0, Math.min(cropX, origW - cropW))
        cropY = Math.max(0, Math.min(cropY, origH - cropH))
    }

    return sharp(originalPath)
        .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer()
}

function buildPreviewHtml(slug: string, variantDataUrls: Record<string, string>): string {
    const cards = VARIANTS.map((v) => {
        const src = variantDataUrls[v.key] ?? ''
        return `<div class="card">
      <h2>${v.key} (${v.width}×${v.height})</h2>
      <img src="${src}" style="max-width:100%;height:auto;" />
    </div>`
    }).join('\n')

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Image preview: ${slug}</title>
<style>
  body { font-family: sans-serif; background: #111; color: #eee; padding: 1rem; }
  .grid { display: flex; flex-wrap: wrap; gap: 1rem; }
  .card { background: #222; border-radius: 8px; padding: 1rem; max-width: 480px; }
  h2 { margin: 0 0 .5rem; font-size: .9rem; color: #aaa; }
</style>
</head>
<body>
<h1>Preview: ${slug}</h1>
<p style="color:#888">Refresh after re-crop. Press Enter in terminal to approve.</p>
<div class="grid">${cards}</div>
</body>
</html>`
}

async function servePreview(slug: string, variantBuffers: Record<string, Buffer>): Promise<() => void> {
    const dataUrls: Record<string, string> = {}
    for (const [key, buf] of Object.entries(variantBuffers)) {
        dataUrls[key] = `data:image/jpeg;base64,${buf.toString('base64')}`
    }
    const html = buildPreviewHtml(slug, dataUrls)
    const server = createServer((_req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(html)
    })
    await new Promise<void>((resolve) => server.listen(4322, resolve))
    return () => server.close()
}

async function processSlug(slug: string, rl: readline.Interface): Promise<void> {
    const outDir = path.join(PROCESSED_DIR, slug)

    // Skip if all variants already exist
    const existing = await Promise.all(VARIANTS.map((v) => fs.access(path.join(outDir, `${v.key}.jpg`)).then(() => true).catch(() => false)))
    if (existing.every(Boolean)) {
        console.log(`  Skipping (already processed): ${slug}`)
        return
    }

    const originalPath = await downloadOriginal(slug)
    await normaliseOrientation(originalPath)
    await fs.mkdir(outDir, { recursive: true })

    const isPortrait = /lauri/i.test(slug)
    const needsReview = isPortrait && !AUTO

    let focalPoint: { x: number; y: number } | undefined

    while (true) {
        console.log(`  Cropping variants for ${slug}…`)
        const buffers: Record<string, Buffer> = {}
        for (const variant of VARIANTS) {
            buffers[variant.key] = await cropVariant(originalPath, variant, focalPoint)
        }

        if (!needsReview) {
            for (const variant of VARIANTS) {
                await fs.writeFile(path.join(outDir, `${variant.key}.jpg`), buffers[variant.key])
            }
            console.log(`  Done: ${slug}`)
            return
        }

        const stopServer = await servePreview(slug, buffers)
        console.log(`\n  Preview: http://localhost:4322`)
        console.log('  Press Enter to approve, or "x% y%" to re-crop:')
        const answer = (await rl.question('  > ')).trim()
        stopServer()

        if (answer === '') {
            for (const variant of VARIANTS) {
                await fs.writeFile(path.join(outDir, `${variant.key}.jpg`), buffers[variant.key])
            }
            console.log(`  Saved: ${slug}`)
            return
        }

        const match = answer.match(/^(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/)
        if (match) {
            focalPoint = { x: parseFloat(match[1]) / 100, y: parseFloat(match[2]) / 100 }
        } else {
            console.log('  Unrecognised — try "45% 30%" or press Enter.')
        }
    }
}

async function main() {
    await fs.mkdir(ORIGINALS_DIR, { recursive: true })
    await fs.mkdir(PROCESSED_DIR, { recursive: true })

    const rl = readline.createInterface({ input, output })

    console.log(`\nMigrating ${ALL_SLUGS.length} images${AUTO ? ' (auto mode)' : ' (portraits require review)'}…\n`)

    for (const slug of ALL_SLUGS) {
        console.log(`\n[${ALL_SLUGS.indexOf(slug) + 1}/${ALL_SLUGS.length}] ${slug}`)
        await processSlug(slug, rl)
    }

    rl.close()
    console.log('\nMigration complete.')
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
