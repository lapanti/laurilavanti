/**
 * Generate split-hero treated image pairs from Markus Isomeri source photos.
 *
 * Recreates the two baked-in treatments of the front-page hero pair
 * (Lauri-Lavanti-dipolissa-lasijulkisivun-edessa-hero-{pysty,vaaka}.jpg),
 * reverse-engineered from its pixels:
 *
 * Desktop pysty (1170×2240):
 *   1. Subject matted from the background (rembg, isnet-general-use).
 *   2. Background graded to dark low-saturation forest green (grayscale + CLUT
 *      ramp, then a slight blend of the original to keep warm hints) — a quiet
 *      backdrop for the white wordmark rendered over the top-left at ≥769px.
 *   3. Sand band #EAE4D6 painted at x=1060–1170 on the background layer only.
 *   4. Subject recomposited on top, bottom-anchored — it overlaps the band from
 *      the front (the layered depth effect).
 *   Background and subject share the same scale/offset so the subject exactly
 *   covers its own silhouette in the graded background. Headroom for the
 *   wordmark comes from scaling down + mirror-padding the background upward.
 *
 * Mobile vaaka (800×480):
 *   1. Subject matted the same way.
 *   2. Background washed with a top-down #163E35 gradient that is fully opaque
 *      at y=0 — it must blend seamlessly into the solid deepForest header band
 *      above the image on mobile.
 *   3. Subject recomposited on top.
 *
 * Usage:
 *   npx tsx scripts/generate-hero-treatments.mts [photoId ...]
 *
 * With no args, generates every configured photo. Outputs
 * {outBase}-hero-pysty.jpg and {outBase}-hero-vaaka.jpg into
 * src/images/originals/. Mattes are cached in node_modules/.cache/hero-mattes/.
 *
 * Requires ImageMagick 7 (`magick`) and the rembg venv at .venv-matting/
 * (python3 -m venv --without-pip .venv-matting; bootstrap pip via get-pip.py;
 * pip install "rembg[cpu]" pillow coverage — `coverage` works around numba's
 * `coverage.types` import on Python 3.14).
 */

import { spawnSync } from 'node:child_process'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const ORIGINALS_DIR = path.join(REPO_ROOT, 'src', 'images', 'originals')
const MATTE_CACHE_DIR = path.join(REPO_ROOT, 'node_modules', '.cache', 'hero-mattes')
const VENV_PYTHON = path.join(REPO_ROOT, '.venv-matting', 'bin', 'python')

/** Sand band colour — colors.lightSand as it appears in the reference JPG. */
const SAND = '#EAE4D6'
/** Solid deepForest header band colour the mobile top edge must blend into. */
const DEEP_FOREST = '#163E35'
/** Desktop background duotone ramp: shadows → highlights, both dark forest. */
const RAMP_DARK = '#121a15'
const RAMP_LIGHT = '#35443c'
/** How much of the original background shows through the desktop grade (%). */
const ORIGINAL_BLEND_PCT = 10
/**
 * Extra darkening of the desktop background's top area — the wordmark zone
 * needs the reference's ~23% lightness even over bright source backgrounds.
 * Multiply gradient from this gray at y=0 to white at TOP_DARKEN_STOP height.
 */
const TOP_DARKEN_GRAY = 'gray55'
const TOP_DARKEN_STOP = 0.4

const PYSTY_W = 1170
const PYSTY_H = 2240
const VAAKA_W = 800
const VAAKA_H = 480

interface DesktopConfig {
    /** Horizontal shift of the shared bg+subject layer, px (negative = left). */
    dx: number
    /** Shared scale factor for source → canvas (bottom-anchored). */
    scale: number
}

interface MobileConfig {
    /** Crop window offsets into the scaled source, px. */
    cropX: number
    cropY: number
    /** Scale factor for source → crop space (≥ cover scale). */
    scale: number
    /** Wash height as a fraction of canvas height. */
    washStop: number
}

interface PhotoConfig {
    desktop: DesktopConfig
    id: string
    outBase: string
    pystySource: string
    vaakaSource: string
    mobile: MobileConfig
}

/*
 * Per-photo tuning. `scale`/`dx` chosen so the head clears the top-25% wordmark
 * zone and the subject overlaps the sand band; mobile offsets place the face in
 * the 222px-tall display band (object-position: 50% 40%).
 */
const PHOTOS: PhotoConfig[] = [
    {
        desktop: { dx: -60, scale: 0.97 },
        id: 'dipoli-mietteliaana',
        outBase: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-mietteliaana',
        pystySource: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-mietteliaana-pysty',
        vaakaSource: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-mietteliaana-vaaka',
        mobile: { cropX: 78, cropY: 140, scale: 0.66, washStop: 0.55 },
    },
    {
        desktop: { dx: 0, scale: 1.0 },
        id: 'dipoli-katse-kameraan',
        outBase: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-katse-kameraan',
        pystySource: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-katse-kameraan-pysty',
        vaakaSource: 'Lauri-Lavanti-dipolissa-kivimuurin-edessa-katse-kameraan-vaaka',
        mobile: { cropX: 0, cropY: 25, scale: 0.4, washStop: 0.45 },
    },
    {
        desktop: { dx: 0, scale: 1.0 },
        id: 'aalto-auditorio',
        outBase: 'Lauri-Lavanti-aalto-yliopiston-paarakennuksen-auditoriossa-hymyilee',
        pystySource: 'Lauri-Lavanti-aalto-yliopiston-paarakennuksen-auditoriossa-hymyilee-pysty',
        vaakaSource: 'Lauri-Lavanti-aalto-yliopiston-paarakennuksen-auditoriossa-hymyilee-vaaka',
        mobile: { cropX: 0, cropY: 25, scale: 0.4, washStop: 0.45 },
    },
    {
        desktop: { dx: 0, scale: 1.0 },
        id: 'portailla',
        outBase: 'Lauri-Lavanti-tyoskentelee-portailla',
        pystySource: 'Lauri-Lavanti-tyoskentelee-portailla-koko-vartalo',
        vaakaSource: 'Lauri-Lavanti-tyoskentelee-portailla-vaaka',
        mobile: { cropX: 0, cropY: 25, scale: 0.4, washStop: 0.45 },
    },
]

function run(cmd: string, args: string[]): void {
    const res = spawnSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    if (res.status !== 0) {
        throw new Error(`${cmd} ${args.join(' ')}\nfailed (${res.status}): ${res.stderr?.toString()}`)
    }
}

function magick(args: string[]): void {
    run('magick', args)
}

function identifySize(file: string): { height: number; width: number } {
    const res = spawnSync('magick', ['identify', '-format', '%w %h', file], { stdio: ['ignore', 'pipe', 'pipe'] })
    if (res.status !== 0) throw new Error(`identify failed for ${file}: ${res.stderr?.toString()}`)
    const [w, h] = res.stdout.toString().trim().split(' ').map(Number)
    return { height: h, width: w }
}

/** Matte the subject out of a source photo via rembg; cached by source slug. */
function matteSubject(sourceSlug: string): string {
    const out = path.join(MATTE_CACHE_DIR, `${sourceSlug}.png`)
    if (fs.existsSync(out)) return out
    fs.mkdirSync(MATTE_CACHE_DIR, { recursive: true })
    const src = path.join(ORIGINALS_DIR, `${sourceSlug}.jpg`)
    console.log(`  matting ${sourceSlug}…`)
    run(VENV_PYTHON, [
        '-c',
        [
            'import sys',
            'from rembg import remove, new_session',
            'from PIL import Image',
            'img = Image.open(sys.argv[1]).convert("RGB")',
            'res = remove(img, session=new_session("isnet-general-use"))',
            'res.save(sys.argv[2])',
        ].join('\n'),
        src,
        out,
    ])
    return out
}

/**
 * Shared transform for the desktop layers: scale, bottom-anchor, x-shift.
 * The background variant mirror-pads the top so scaled-down sources still fill
 * the canvas with plausible texture; the subject variant pads with transparency.
 */
function placePysty(input: string, output: string, cfg: DesktopConfig, transparent: boolean): void {
    const { height, width } = identifySize(input)
    const w = Math.round(width * cfg.scale)
    const h = Math.round(height * cfg.scale)
    const padTop = Math.max(0, PYSTY_H - h)
    const args = [input, '-resize', `${w}x${h}!`]
    if (transparent) {
        args.push('-background', 'none', '-gravity', 'south', '-extent', `${w}x${PYSTY_H}`)
    } else if (padTop > 0) {
        // Mirror the top strip upward so the graded background has no seam.
        args.push(
            '(', '+clone', '-crop', `${w}x${padTop}+0+0`, '-flip', ')',
            '+swap', '-append',
        )
    }
    args.push(
        '(', '-size', `${PYSTY_W}x${PYSTY_H}`, `xc:${transparent ? 'none' : 'black'}`, ')',
        '+swap', '-gravity', 'south', '-geometry', `${cfg.dx >= 0 ? '+' : ''}${cfg.dx}+0`, '-composite',
        output,
    )
    magick(args)
}

/** Shared transform for the mobile layers: scale then crop to the canvas. */
function placeVaaka(input: string, output: string, cfg: MobileConfig, transparent: boolean): void {
    const { height, width } = identifySize(input)
    const w = Math.round(width * cfg.scale)
    const h = Math.round(height * cfg.scale)
    magick([
        input,
        ...(transparent ? ['-background', 'none'] : []),
        '-resize', `${w}x${h}!`,
        '-crop', `${VAAKA_W}x${VAAKA_H}+${cfg.cropX}+${cfg.cropY}`,
        '+repage',
        ...(transparent ? [] : ['-background', 'black']),
        '-extent', `${VAAKA_W}x${VAAKA_H}`,
        output,
    ])
}

/** Fill interior holes in the matte's alpha without eating the outer edge. */
function fillMatteHoles(matte: string, output: string): void {
    magick([
        matte,
        '(', '+clone', '-alpha', 'extract', '-morphology', 'Close', 'Disk:12', ')',
        '-compose', 'CopyOpacity', '-composite',
        output,
    ])
}

function generateDesktop(photo: PhotoConfig, tmpDir: string): string {
    const src = path.join(ORIGINALS_DIR, `${photo.pystySource}.jpg`)
    const matte = matteSubject(photo.pystySource)
    const cut = path.join(tmpDir, 'cut.png')
    const bg = path.join(tmpDir, 'bg.png')
    const bgGraded = path.join(tmpDir, 'bg-graded.png')
    const subj = path.join(tmpDir, 'subj.png')
    const out = path.join(ORIGINALS_DIR, `${photo.outBase}-hero-pysty.jpg`)

    fillMatteHoles(matte, cut)
    placePysty(src, bg, photo.desktop, false)
    placePysty(cut, subj, photo.desktop, true)

    // Grade: duotone forest ramp + a hint of the original for warm accents,
    // extra darkening over the wordmark zone at the top, then the sand band —
    // all on the background layer only.
    const darkenH = Math.round(PYSTY_H * TOP_DARKEN_STOP)
    magick([
        bg,
        '(', '+clone', '-colorspace', 'Gray',
        '(', '-size', '1x256', `gradient:${RAMP_DARK}-${RAMP_LIGHT}`, ')',
        '-clut', '-type', 'TrueColor', ')',
        '+swap', '-define', `compose:args=${ORIGINAL_BLEND_PCT}`, '-compose', 'blend', '-composite',
        '(', '-size', `${PYSTY_W}x${darkenH}`, `gradient:${TOP_DARKEN_GRAY}-white`,
        '-background', 'white', '-gravity', 'north', '-extent', `${PYSTY_W}x${PYSTY_H}`, ')',
        '-compose', 'multiply', '-composite',
        '-fill', SAND, '-draw', `rectangle ${PYSTY_W - 110},0 ${PYSTY_W},${PYSTY_H}`,
        bgGraded,
    ])
    magick([bgGraded, subj, '-compose', 'over', '-composite', '-strip', '-quality', '88', out])
    return out
}

function generateMobile(photo: PhotoConfig, tmpDir: string): string {
    const src = path.join(ORIGINALS_DIR, `${photo.vaakaSource}.jpg`)
    const matte = matteSubject(photo.vaakaSource)
    const cut = path.join(tmpDir, 'cut-vaaka.png')
    const bg = path.join(tmpDir, 'bg-vaaka.png')
    const bgWashed = path.join(tmpDir, 'bg-vaaka-washed.png')
    const subj = path.join(tmpDir, 'subj-vaaka.png')
    const out = path.join(ORIGINALS_DIR, `${photo.outBase}-hero-vaaka.jpg`)

    fillMatteHoles(matte, cut)
    placeVaaka(src, bg, photo.mobile, false)
    placeVaaka(cut, subj, photo.mobile, true)

    // Darken and desaturate the background toward the reference's subdued look,
    // then the top-down deepForest wash: fully opaque at y=0 (seamless blend
    // with the solid header band above), fading out by washStop of the height.
    const washH = Math.round(VAAKA_H * photo.mobile.washStop)
    magick([
        bg,
        '-modulate', '78,62,100',
        '(', '-size', `${VAAKA_W}x${washH}`, `gradient:${DEEP_FOREST}-none`,
        '-background', 'none', '-gravity', 'north', '-extent', `${VAAKA_W}x${VAAKA_H}`, ')',
        '-compose', 'over', '-composite',
        bgWashed,
    ])
    magick([bgWashed, subj, '-compose', 'over', '-composite', '-strip', '-quality', '85', out])
    return out
}

function main(): void {
    const requested = process.argv.slice(2)
    const photos = requested.length > 0 ? PHOTOS.filter((p) => requested.includes(p.id)) : PHOTOS
    const unknown = requested.filter((id) => !PHOTOS.some((p) => p.id === id))
    if (unknown.length > 0) {
        console.error(`Unknown photo id(s): ${unknown.join(', ')}. Known: ${PHOTOS.map((p) => p.id).join(', ')}`)
        process.exit(1)
    }
    if (!fs.existsSync(VENV_PYTHON)) {
        console.error(`Missing rembg venv at ${VENV_PYTHON} — see the header comment for setup.`)
        process.exit(1)
    }

    for (const photo of photos) {
        console.log(`\n${photo.id}`)
        const tmpDir = fs.mkdtempSync(path.join(fs.realpathSync(process.env.TMPDIR ?? '/tmp'), 'hero-treatments-'))
        try {
            console.log(`  desktop → ${path.basename(generateDesktop(photo, tmpDir))}`)
            console.log(`  mobile  → ${path.basename(generateMobile(photo, tmpDir))}`)
        } finally {
            fs.rmSync(tmpDir, { force: true, recursive: true })
        }
    }
    console.log('\nDone.')
}

main()
