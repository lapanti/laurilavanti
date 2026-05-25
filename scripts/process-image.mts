/**
 * Process a single original image into all required crop variants.
 *
 * Usage: npx tsx scripts/process-image.mts <path-to-original>
 *
 * Crops to the correct aspect ratio at maximum available pixels using
 * smartcrop-sharp (skin-tone + edge-detection heuristics). No resize —
 * Astro Sharp handles resizing, WebP/AVIF conversion, and density variants
 * at build time.
 *
 * After cropping, opens a browser preview at http://localhost:4322 showing
 * all variants side-by-side. Press Enter to approve or provide focal-point
 * override coordinates (x% y%) to re-crop.
 */

import { createServer } from 'node:http'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

import { crop as smartcrop } from 'smartcrop-sharp'
import sharp from 'sharp'

// ---------------------------------------------------------------------------
// Variant definitions
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// EXIF orientation normalisation
// ---------------------------------------------------------------------------

// Rewrites the file with EXIF orientation applied to pixels and the
// orientation tag stripped. smartcrop reads raw pixels and ignores EXIF,
// so without this step originals shot in portrait on a phone get cropped
// against their unrotated landscape sensor data.
async function normaliseOrientation(originalPath: string): Promise<void> {
    const meta = await sharp(originalPath).metadata()
    if (!meta.orientation || meta.orientation === 1) return
    const rotated = await sharp(originalPath).rotate().jpeg({ quality: 85, mozjpeg: true }).toBuffer()
    await fs.writeFile(originalPath, rotated)
}

// ---------------------------------------------------------------------------
// Crop a single variant
// ---------------------------------------------------------------------------

async function cropVariant(
    originalPath: string,
    variant: Variant,
    focalPoint?: { x: number; y: number },
): Promise<Buffer> {
    const meta = await sharp(originalPath).metadata()
    const origW = meta.width!
    const origH = meta.height!

    // Determine the largest crop region that fits the target aspect ratio
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
        // Manual focal point: clamp so crop stays within bounds
        cropX = Math.round(origW * focalPoint.x - cropW / 2)
        cropY = Math.round(origH * focalPoint.y - cropH / 2)
        cropX = Math.max(0, Math.min(cropX, origW - cropW))
        cropY = Math.max(0, Math.min(cropY, origH - cropH))
    } else {
        // smartcrop: find best region
        const result = await smartcrop(originalPath, { width: cropW, height: cropH })
        cropX = result.topCrop.x
        cropY = result.topCrop.y
        // Clamp to avoid off-by-one rounding errors
        cropX = Math.max(0, Math.min(cropX, origW - cropW))
        cropY = Math.max(0, Math.min(cropY, origH - cropH))
    }

    return sharp(originalPath)
        .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer()
}

// ---------------------------------------------------------------------------
// HTML preview server
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
    const originalPath = process.argv[2]
    if (!originalPath) {
        console.error('Usage: npx tsx scripts/process-image.mts <path-to-original>')
        process.exit(1)
    }

    const resolved = path.resolve(originalPath)
    const slug = path.basename(resolved, path.extname(resolved))
    const outDir = path.join(path.dirname(resolved), '..', 'processed', slug)
    await fs.mkdir(outDir, { recursive: true })

    console.log(`\nProcessing: ${slug}`)
    await normaliseOrientation(resolved)

    let focalPoint: { x: number; y: number } | undefined

    const rl = readline.createInterface({ input, output })

    while (true) {
        console.log('Cropping variants…')
        const buffers: Record<string, Buffer> = {}
        for (const variant of VARIANTS) {
            process.stdout.write(`  ${variant.key}… `)
            buffers[variant.key] = await cropVariant(resolved, variant, focalPoint)
            console.log('done')
        }

        const stopServer = await servePreview(slug, buffers)
        console.log('\nPreview: http://localhost:4322')
        console.log('Press Enter to approve, or enter focal point as "x% y%" (e.g. "50% 30%") to re-crop:')

        const answer = (await rl.question('> ')).trim()
        stopServer()

        if (answer === '') {
            // Approved — write files
            for (const variant of VARIANTS) {
                const outPath = path.join(outDir, `${variant.key}.jpg`)
                await fs.writeFile(outPath, buffers[variant.key])
            }
            console.log(`\nSaved to ${outDir}`)
            rl.close()
            break
        }

        const match = answer.match(/^(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/)
        if (match) {
            focalPoint = { x: parseFloat(match[1]) / 100, y: parseFloat(match[2]) / 100 }
            console.log(`Re-cropping with focal point (${match[1]}%, ${match[2]}%)…`)
        } else {
            console.log('Unrecognised input — try "45% 30%" or press Enter to approve.')
        }
    }
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
